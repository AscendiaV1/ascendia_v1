<?php

namespace App\Http\Controllers;

use App\Models\LearningSessions;
use App\Models\Mentor;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class MentorController extends Controller
{

    public function show($id)
    {
        $mentor = Mentor::findOrFail($id);
        $mentor->load('expertise', 'languages', 'experience', 'education', 'mentorshipAreas', 'achievements');

        return response()->json($mentor);
    }

    public function search(Request $request)
    {
        // Filtrele primite (opțional)
        $searchQuery = $request->query('searchQuery', '');
        $expertise = $request->query('expertise', '');
        $priceRange = $request->query('priceRange', [0, 200]);
        $availableNow = $request->query('availableNow', false);

        // Începem construirea interogării
        $query = Mentor::query();

        // Filtrul de căutare (numele și titlul mentorului)
        if ($searchQuery) {
            $query->where(function ($q) use ($searchQuery) {
                $q->where('name', 'like', "%$searchQuery%")
                    ->orWhere('title', 'like', "%$searchQuery%");
            });
        }

        // Filtrul pentru expertiză
        if ($expertise) {
            $query->whereHas('expertise', function ($q) use ($expertise) {
                $q->where('expertise', 'like', "%$expertise%");
            });
        }
        // Filtrul pentru gama de preț
        $query->whereBetween('hourly_rate', $priceRange);

        // Filtrul pentru disponibilitate
        if (!empty($availableNow) && $availableNow != 'false') {
            $availableNow = 1;
            $query->where('available_now', $availableNow);
        }

        // Executăm interogarea și obținem mentorii care corespund filtrelor
        $mentors = $query->get(['id', 'name', 'title', 'rating', 'review_count', 'hourly_rate', 'available_now', 'years_of_experience']);

        // Pregătim datele pentru fiecare mentor
        $filteredMentors = $mentors->map(function ($mentor) {
            // Extragem expertiza și limbile vorbite
            $expertise = $mentor->expertise->pluck('expertise');
            $languages = $mentor->languages->pluck('language');

            return [
                'id' => $mentor->id,
                'name' => $mentor->name,
                'title' => $mentor->title,
                'rating' => $mentor->rating,
                'ratingCount' => $mentor->review_count,
                'hourlyRate' => $mentor->hourly_rate,
                'expertise' => $expertise,
                'languages' => $languages,
                'yearsOfExperience' => $mentor->years_of_experience,
                'availableNow' => $mentor->available_now ? true : false,
            ];
        });

        // Returnarea datelor ca JSON
        return response()->json($filteredMentors);
    }

    public function getMyMentors()
    {
        $user = Auth::user();

        $sessions = LearningSessions::where('user_id', $user->id)->get();

        $mentors = Mentor::whereIn('id', $sessions->pluck('mentor_id'))->get();

        return response()->json($mentors);
    }

    public function getActiveClients()
    {
        $user = Auth::user();
        $mentor = Mentor::where('user_id', $user->id)->first();

        $sessions = LearningSessions::where('mentor_id', $mentor->id)->where('status', '!=', 'Completed')->get();
        $sessions->load('user');
        return response()->json($sessions);
    }

    public function getPastClients()
    {
        $user = Auth::user();
        $mentor = Mentor::where('user_id', $user->id)->first();

        $sessions = LearningSessions::where('mentor_id', $mentor->id)->where('status', 'Completed')->get();
        $sessions->load('user');
        return response()->json($sessions);
    }

    public function updateProfile(Request $request, $id)
{
    $user = User::findOrFail($id);
    $mentor = $user->mentor;

    if (!$mentor) {
        return response()->json(['error' => 'Mentor profile not found.'], 404);
    }

    \DB::transaction(function () use ($request, $user, $mentor) {
        // Actualizăm datele de bază
        $mentor->update([
            'title' => $request->input('title'),
            'location' => $request->input('location'),
            'about' => $request->input('about'),
        ]);

        // Ștergem vechile date și le înlocuim cu cele noi
        $mentor->expertise()->delete();
        $mentor->languages()->delete();
        $mentor->experience()->delete();
        $mentor->education()->delete();
        $mentor->mentorshipAreas()->delete();
        $mentor->achievements()->delete();

        // Cream noi relații din array-uri
        $mentor->expertise()->createMany(
            collect($request->input('expertise', []))->map(fn($e) => ['expertise' => $e])->toArray()
        );

        $mentor->languages()->createMany(
            collect($request->input('languages', []))->map(fn($l) => ['language' => $l])->toArray()
        );

        $mentor->experience()->createMany($request->input('experience', []));
        $mentor->education()->createMany($request->input('education', []));
        $mentor->mentorshipAreas()->createMany(
            collect($request->input('mentorship_areas', []))->map(fn($m) => ['mentorship_area' => $m])->toArray()
        );

        $mentor->achievements()->createMany(
            collect($request->input('achievements', []))->map(fn($a) => ['achievement' => $a])->toArray()
        );
    });

    return response()->json(['message' => 'Mentor profile updated successfully.']);
}

}

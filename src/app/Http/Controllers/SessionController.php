<?php

namespace App\Http\Controllers;

use App\Models\LearningSessions;
use App\Models\Mentor;
use App\Models\Message;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class SessionController extends Controller
{
    public function getActiveSessions()
    {
        $user = Auth::user();

        $sessions = LearningSessions::where('user_id', $user->id)->where('status', '!=', 'Completed')->get();
        $sessions->load('mentor');
        return response()->json($sessions);
    }

    public function getConcludedSessions()
    {
        $user = Auth::user();

        $sessions = LearningSessions::where('user_id', $user->id)->where('status', 'Completed')->get();
        $sessions->load('mentor');
        return response()->json($sessions);
    }

    public function getSessionData($sessionId)
    {
        $user = Auth::user();

        $isMentor = false;
        $mentor = Mentor::where('user_id', $user->id)->first();
        $session = LearningSessions::findOrFail($sessionId);
        if($mentor && $session->mentor_id === $mentor->id){
            $isMentor = true;
        }
        $session->load('user','mentor.expertise', 'messages', 'resources');
        $session->isFromMentor = $isMentor;
        return response()->json($session);
    }

    public function bookASession(Request $request) {
        $user = Auth::user();

        if(empty($user)){
            abort('401', "Unauthorized");
        }
    
        $validatedData = $request->validate([
            'mentor_id' => 'required|exists:mentors,id',
        ]);

        $mentor = Mentor::findOrFail($validatedData['mentor_id']);
    
        $session = LearningSessions::create([
            'mentor_id' => $mentor->id,
            'user_id' => $user->id,
            'topic' => $mentor->title,
            'date' => now(),
            'duration' => 60,
            'status' => 'Upcoming',
        ]);
    
        return response()->json($session);
    }

    public function saveMessage(Request $request)
    {
        $user = Auth::user();

        $validatedData = $request->validate([
            'sessionId' => 'required|exists:learning_sessions,id',
            'message' => 'required',
        ]);

        $session = LearningSessions::findOrFail($validatedData['sessionId']);
        $mentor = Mentor::findOrFail($session->mentor_id);

        $sender = null;
        if($user->id === $session->user_id){
            $sender = 'mentee';
        }

        if($mentor->user_id == $user->id){
            $sender = 'mentor';

        }

        if(empty($sender)){
            abort(401, 'Unauthorized');
        }

        $message = Message::create([
            'learning_sessions_id' => $session->id,
            'sender' => $sender,
            'content' => $validatedData['message'],
        ]);

        return $message;
    }
}

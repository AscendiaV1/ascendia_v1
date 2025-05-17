<?php

namespace Tests\Feature;

use App\Models\Mentor;
use App\Models\MentorExpertise;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class MentorSearchTest extends TestCase
{
    use RefreshDatabase;

    /** @test */
    public function it_returns_mentors_matching_search_query_and_filters()
    {
        // Creăm un user + mentor
        $user = User::factory()->create(['name' => 'Alex Johnson']);
        $mentor = Mentor::factory()->create([
            'user_id' => $user->id,
            'name' => 'Alex Johnson',
            'title' => 'Cloud Architect',
            'hourly_rate' => '150.00',
            'available_now' => true,
        ]);

        // Asociem expertiză
        $mentor->expertise()->create(['expertise' => 'Cloud Computing']);

        // Facem request cu filtrele active
        $response = $this->getJson('/api/v1/mentors/search?searchQuery=Alex&expertise=Cloud&priceRange[]=100&priceRange[]=200&availableNow=true');

        $response->assertOk();
        $response->assertJsonFragment([
            'name' => 'Alex Johnson',
            'title' => 'Cloud Architect',
            'availableNow' => true,
        ]);
    }

    /** @test */
    public function it_returns_empty_when_no_match()
    {
        $response = $this->getJson('/api/v1/mentors/search?searchQuery=Nonexistent');

        $response->assertOk();
        $response->assertExactJson([]);
    }
}

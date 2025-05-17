<?php

namespace Tests\Feature;

use App\Models\User;
use App\Models\Mentor;
use App\Models\LearningSessions;
use App\Models\Message;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class BookSessionTest extends TestCase
{
    use RefreshDatabase;

    public function test_user_can_book_a_session_with_mentor()
    {
        $user = User::factory()->create();
        $this->actingAs($user);

        $mentorUser = User::factory()->create();
        $mentor = Mentor::factory()->create([
            'user_id' => $mentorUser->id,
            'title' => 'Cloud Architect'
        ]);

        $response = $this->postJson('/api/v1/sessions/book', [
            'mentor_id' => $mentor->id,
        ]);

        $response->assertStatus(200);
        $response->assertJsonFragment([
            'mentor_id' => $mentor->id,
            'user_id' => $user->id,
            'topic' => 'Cloud Architect',
            'status' => 'Upcoming',
        ]);

        $this->assertDatabaseHas('learning_sessions', [
            'mentor_id' => $mentor->id,
            'user_id' => $user->id,
            'status' => 'Upcoming',
        ]);
    }

    public function test_unauthenticated_user_cannot_book()
    {
        $mentorUser = User::factory()->create();
        $mentor = Mentor::factory()->create([
            'user_id' => $mentorUser->id
        ]);

        $response = $this->postJson('/api/v1/sessions/book', [
            'mentor_id' => $mentor->id,
        ]);

        $response->assertStatus(401);
    }

    public function test_user_can_retrieve_active_sessions()
    {
        $user = User::factory()->create();
        $this->actingAs($user);

        $mentor = Mentor::factory()->create();

        LearningSessions::factory()->create([
            'user_id' => $user->id,
            'mentor_id' => $mentor->id,
            'status' => 'Upcoming'
        ]);

        $response = $this->getJson('/api/v1/active-sessions');

        $response->assertStatus(200);
        $response->assertJsonFragment([
            'user_id' => $user->id,
            'mentor_id' => $mentor->id,
            'status' => 'Upcoming'
        ]);
    }

    public function test_user_can_retrieve_concluded_sessions()
    {
        $user = User::factory()->create();
        $this->actingAs($user);

        $mentor = Mentor::factory()->create();

        LearningSessions::factory()->create([
            'user_id' => $user->id,
            'mentor_id' => $mentor->id,
            'status' => 'Completed'
        ]);

        $response = $this->getJson('/api/v1/concluded-sessions');

        $response->assertStatus(200);
        $response->assertJsonFragment([
            'user_id' => $user->id,
            'mentor_id' => $mentor->id,
            'status' => 'Completed'
        ]);
    }

    public function test_user_can_access_session_data()
    {
        $user = User::factory()->create();
        $this->actingAs($user);

        $mentor = Mentor::factory()->create();
        $session = LearningSessions::factory()->create([
            'user_id' => $user->id,
            'mentor_id' => $mentor->id,
        ]);

        $response = $this->getJson('/api/v1/sessions/' . $session->id);

        $response->assertStatus(200);
        $response->assertJsonFragment([
            'id' => $session->id,
            'mentor_id' => $mentor->id,
            'user_id' => $user->id,
        ]);
    }

    public function test_user_can_send_message_as_mentee()
    {
        $user = User::factory()->create();
        $this->actingAs($user);

        $mentor = Mentor::factory()->create();
        $session = LearningSessions::factory()->create([
            'user_id' => $user->id,
            'mentor_id' => $mentor->id,
        ]);

        $response = $this->postJson('/api/v1/sessions/message', [
            'sessionId' => $session->id,
            'message' => 'Hello mentor!'
        ]);

        $response->assertStatus(201);
        $this->assertDatabaseHas('messages', [
            'learning_sessions_id' => $session->id,
            'sender' => 'mentee',
            'content' => 'Hello mentor!'
        ]);
    }

    public function test_user_cannot_send_message_to_other_session()
    {
        $user = User::factory()->create();
        $this->actingAs($user);

        $mentor = Mentor::factory()->create();
        $otherUser = User::factory()->create();

        $session = LearningSessions::factory()->create([
            'user_id' => $otherUser->id,
            'mentor_id' => $mentor->id,
        ]);

        $response = $this->postJson('/api/v1/sessions/message', [
            'sessionId' => $session->id,
            'message' => 'Should not be allowed'
        ]);

        $response->assertStatus(401);
    }
}
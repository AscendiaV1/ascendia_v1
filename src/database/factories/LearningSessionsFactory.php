<?php

namespace Database\Factories;

use App\Models\LearningSessions;
use App\Models\Mentor;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

class LearningSessionsFactory extends Factory
{
    protected $model = LearningSessions::class;

    public function definition()
    {
        return [
            'user_id' => User::factory(),
            'mentor_id' => Mentor::factory(),
            'topic' => 'Sample Topic',
            'date' => now()->addDays(1),
            'duration' => 60,
            'status' => 'Upcoming',
        ];
    }
}

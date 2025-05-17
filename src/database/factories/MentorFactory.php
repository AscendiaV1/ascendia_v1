<?php

namespace Database\Factories;

use App\Models\Mentor;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

class MentorFactory extends Factory
{
    protected $model = Mentor::class;

    public function definition()
    {
        return [
            'user_id' => User::factory(),
            'name' => $this->faker->name(),
            'title' => $this->faker->jobTitle(),
            'location' => $this->faker->city(),
            'about' => $this->faker->paragraph(),
            'rating' => $this->faker->randomFloat(1, 4, 5),
            'review_count' => $this->faker->numberBetween(0, 100),
            'hourly_rate' => $this->faker->numberBetween(50, 200),
            'years_of_experience' => $this->faker->numberBetween(1, 20),
            'available_now' => $this->faker->boolean(),
        ];
    }
}

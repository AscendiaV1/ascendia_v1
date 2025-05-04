<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Mentor extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id', 
        'name', 
        'title', 
        'location', 
        'rating', 
        'review_count', 
        'hourly_rate', 
        'about',
        'years_of_experience',
        'available_now'
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function expertise()
    {
        return $this->hasMany(MentorExpertise::class);
    }

    public function languages()
    {
        return $this->hasMany(MentorLanguage::class);
    }

    public function experience()
    {
        return $this->hasMany(MentorExperience::class);
    }

    public function education()
    {
        return $this->hasMany(MentorEducation::class);
    }

    public function mentorshipAreas()
    {
        return $this->hasMany(MentorMentorshipArea::class);
    }

    public function achievements()
    {
        return $this->hasMany(MentorAchievement::class);
    }
}

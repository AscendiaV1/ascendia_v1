<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class MentorMentorshipArea extends Model
{
    use HasFactory;

    protected $fillable = ['mentor_id', 'mentorship_area'];

    public function mentor()
    {
        return $this->belongsTo(Mentor::class);
    }
}
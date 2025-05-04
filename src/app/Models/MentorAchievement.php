<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class MentorAchievement extends Model
{
    use HasFactory;

    protected $fillable = ['mentor_id', 'achievement'];

    public function mentor()
    {
        return $this->belongsTo(Mentor::class);
    }
}
<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Resource extends Model
{
    use HasFactory;

    protected $fillable = [
        'learning_sessions_id', 'title', 'url'
    ];

    // Relația cu sesiunea
    public function learningSession()
    {
        return $this->belongsTo(LearningSessions::class);
    }
}
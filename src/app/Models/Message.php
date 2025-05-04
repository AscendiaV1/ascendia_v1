<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Message extends Model
{
    use HasFactory;

    protected $fillable = [
        'learning_sessions_id', 'sender', 'content'
    ];

    public function session()
    {
        return $this->belongsTo(LearningSessions::class);
    }
}
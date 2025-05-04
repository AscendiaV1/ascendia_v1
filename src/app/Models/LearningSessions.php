<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class LearningSessions extends Model
{
    use HasFactory;

    protected $fillable = [
        'mentor_id', 'user_id', 'topic', 'date', 'duration', 'status'
    ];

    // Relația cu mentorul
    public function mentor()
    {
        return $this->belongsTo(Mentor::class);
    }

    // Relația cu utilizatorul
    public function user()
    {
        return $this->belongsTo(User::class);
    }

    // Relația cu mesajele
    public function messages()
    {
        return $this->hasMany(Message::class);
    }

    // Relația cu resursele
    public function resources()
    {
        return $this->hasMany(Resource::class);
    }
}

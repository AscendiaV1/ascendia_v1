<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class MentorLanguage extends Model
{
    use HasFactory;

    protected $fillable = ['mentor_id', 'language'];

    public function mentor()
    {
        return $this->belongsTo(Mentor::class);
    }
}
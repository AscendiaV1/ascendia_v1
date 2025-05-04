<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class MentorExpertise extends Model
{
    use HasFactory;

    protected $fillable = ['mentor_id', 'expertise'];

    public function mentor()
    {
        return $this->belongsTo(Mentor::class);
    }
}
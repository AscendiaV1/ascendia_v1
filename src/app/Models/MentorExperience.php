<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class MentorExperience extends Model
{
    use HasFactory;

    protected $fillable = ['mentor_id', 'title', 'company', 'period', 'description'];

    public function mentor()
    {
        return $this->belongsTo(Mentor::class);
    }
}
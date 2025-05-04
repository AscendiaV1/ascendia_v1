<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class MentorEducation extends Model
{
    use HasFactory;

    protected $fillable = ['mentor_id', 'degree', 'institution', 'year'];

    public function mentor()
    {
        return $this->belongsTo(Mentor::class);
    }
}
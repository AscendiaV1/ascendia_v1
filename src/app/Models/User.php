<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Spatie\Permission\Traits\HasRoles;

class User extends Authenticatable
{
    use HasFactory, Notifiable, HasRoles;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = ["name", "email", "password"];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array<int, string>
     */
    protected $hidden = ["password", "remember_token"];

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            "email_verified_at" => "datetime",
            "password" => "hashed",
        ];
    }

    protected $appends = ['is_mentor', 'is_administrator'];

    public function getIsMentorAttribute()
    {
        return $this->hasRole('mentor') ? true : false;
    }

    public function getIsAdministratorAttribute()
    {
        return $this->hasRole('administrator') ? true : false;
    }

    public function mentor()
    {
        return $this->hasOne(Mentor::class);
    }

    public function learningSessions()
    {
        return $this->hasMany(LearningSessions::class);
    }
}

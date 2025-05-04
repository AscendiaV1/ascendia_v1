<?php

use App\Http\Controllers\MentorController;
use App\Http\Controllers\SessionController;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;

Route::get('/api/v1/user', function () {
    return response()->json(Auth::user());
})->middleware('auth');

Route::get('/api/v1/mentors/search', [MentorController::class, 'search']);
Route::get('/api/v1/mentor/{id}', [MentorController::class, 'show']);
Route::get('/api/v1/active-sessions', [SessionController::class, 'getActiveSessions']);
Route::get('/api/v1/concluded-sessions', [SessionController::class, 'getConcludedSessions']);
Route::get('/api/v1/my-mentors', [MentorController::class, 'getMyMentors']);
Route::get('/api/v1/sessions/{sessionId}', [SessionController::class, 'getSessionData']);
Route::post('/api/v1/sessions/book', [SessionController::class, 'bookASession']);
Route::get('/api/v1/clients/active', [MentorController::class, 'getActiveClients']);
Route::get('/api/v1/clients/past', [MentorController::class, 'getPastClients']);
Route::post('/api/v1/sessions/message', [SessionController::class, 'saveMessage']);

Route::get('/{any}', function () {
    return view('app');
})->where('any', '.*');

Auth::routes();

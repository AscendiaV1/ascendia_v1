<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up()
    {
        Schema::create('messages', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('learning_sessions_id');
            $table->enum('sender', ['mentor', 'mentee']);
            $table->text('content');
            $table->timestamps();

            $table->foreign('learning_sessions_id')->references('id')->on('learning_sessions')->onDelete('cascade');
        });
    }

    public function down()
    {
        Schema::dropIfExists('messages');
    }
};

<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('users', function (Blueprint $table) {
            $table->id();
            $table->string('Nome');
            $table->string('Prenom');
            $table->string('CIN');
            $table->string('Vill');
            $table->string('Date_naissance');
            $table->string('Adresse');
            $table->string('email');
            $table->string('Telephone');
            $table->string('service'); 
            // $table->unsignedBigInteger('service_id');
            // $table->foreign('service_id')->references('id')->on('service');
            $table->timestamp('email_verified_at')->nullable();
            $table->string('password');
            $table->rememberToken();
            $table->timestamps();
        });

    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('users');
    }
};

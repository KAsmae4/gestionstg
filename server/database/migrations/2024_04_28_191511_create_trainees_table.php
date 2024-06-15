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
        Schema::create('trainees', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('surname');
            $table->string('email');
            $table->string('Telephone');
            $table->string('etablissement'); // Changed from 'etablissement'
            $table->string('CIN');
            $table->string('Vill');
            $table->string('date_debut'); // Changed from 'date_debut'
            $table->string('date_fin');
            $table->string('service'); 
            $table->string('pdf_path')->nullable();
            $table->timestamps();
        });
    }
    

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('trainees');
    }
};

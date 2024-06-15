<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Database\Seeders\RoleSeeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // \App\Models\User::factory(10)->create();

        // \App\Models\User::factory()->create([
        //     'name' => 'Test User',
        //     'email' => 'test@example.com',
        // ]);

        $this->call(RoleSeeder::class);
        // user 1 
        // \App\Models\User::factory()->create([
        //     'FristName' => 'Super admin ',
        //     'LastName'=> 'ocp',
        //     'email' => 'hamza@gmail.com',
        //     'password'=> bcrypt('hamza'),
        // ])->assignRole('superAdmin');
        // // user 2
        // \App\Models\User::factory()->create([
        //     'FristName' => 'admin user',
        //     'LastName'=> 'ocp',
        //     'email' => 'admin@gmail.com',
        //     'password'=> bcrypt('hamza'),
        // ])->assignRole('admin');
        // // user 3
        // \App\Models\User::factory()->create([
        //     'FristName' => 'user',
        //     'LastName'=> 'ocp',
        //     'email' => 'user@gmail.com',
        //     'password'=> bcrypt('hamza'),
        // ])->assignRole('manager');

    }
}

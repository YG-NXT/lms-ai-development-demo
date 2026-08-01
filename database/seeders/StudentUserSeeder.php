<?php

namespace Database\Seeders;

use App\Enums\UserType;
use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class StudentUserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $students = [
            [
                'name' => 'John Doe (Student 1)',
                'email' => 'student1@gmail.com',
            ],
            [
                'name' => 'Jane Smith (Student 2)',
                'email' => 'student2@gmail.com',
            ],
            [
                'name' => 'Alice Johnson (Student 3)',
                'email' => 'student3@gmail.com',
            ],
        ];

        foreach ($students as $studentData) {
            $user = User::firstOrCreate(
                ['email' => $studentData['email']],
                [
                    'name' => $studentData['name'],
                    'password' => Hash::make('12345678'),
                    'type' => UserType::CUSTOMER,
                    'email_verified_at' => now(),
                ]
            );

            if (! $user->customerProfile) {
                $user->customerProfile()->create();
            }
        }
    }
}

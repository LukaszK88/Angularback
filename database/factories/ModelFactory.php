<?php

use \App\Models\User;
use \App\Models\Message;

/*
|--------------------------------------------------------------------------
| Model Factories
|--------------------------------------------------------------------------
|
| Here you may define all of your model factories. Model factories give
| you a convenient way to create models for testing and seeding your
| database. Just tell the factory how a default model should look.
|
*/

/** @var \Illuminate\Database\Eloquent\Factory $factory */
$factory->define(User::class, function (Faker\Generator $faker) {
    static $password;

    return [
        'name' => $faker->name,
        'username' => $faker->unique()->safeEmail,
        'password' => $password ?: $password = bcrypt('secret'),
        'user_role_id' => 1,
        'club_admin_id' => 0,
        'club_id' => 1,
        'status' => 0,
    ];
});

$factory->define(\App\Models\Conversation::class, function (Faker\Generator $faker) use ($factory) {

    return [
        'from' => function () {
            return factory(User::class)->create()->id;
        },
        'to' => function () {
            return factory(User::class)->create()->id;
        },
    ];
});

$factory->define(Message::class, function (Faker\Generator $faker) use ($factory) {

    return [
        'body' => $faker->paragraph,
        'read' => false,
        'conversation_id' => function () {
            return factory(\App\Models\Conversation::class)->create()->id;
        },
    ];
});

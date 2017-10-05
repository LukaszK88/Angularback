<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateUsersTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('users', function (Blueprint $table) {
            $table->engine = 'InnoDB';
            $table->increments('id');
            $table->string('name');
            $table->string('username');
            $table->string('about')->nullable();
            $table->dateTime('age')->nullable();
            $table->integer('club_admin_id')->default(0);
            $table->integer('user_role_id')->default(1);
            $table->integer('club_id')->default(0);
            $table->string('coa')->nullable();
            $table->string('facebook')->nullable();
            $table->string('facebook_picture')->nullable();
            $table->string('image')->nullable();
            $table->string('password');
            $table->string('temp_password')->nullable();
            $table->string('quote')->nullable();
            $table->integer('status')->default(0);
            $table->integer('total_points')->default(0);
            $table->integer('weight')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::drop('users');
    }
}

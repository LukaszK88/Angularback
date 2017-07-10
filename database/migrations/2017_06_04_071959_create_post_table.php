<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreatePostTable extends Migration
{
    public function up()
    {
        Schema::create('post', function (Blueprint $table) {
            $table->increments('id');
            $table->integer('user_id')->nullable();
            $table->string('title');
            $table->string('body')->nullable();
            $table->integer('post_type')->unsigned();
            $table->timestamps();
            $table->foreign('user_id')->references('id')->on('users');

        });

        Schema::table('post', function(Blueprint $table) {
            $table->foreign('post_type')->references('id')->on('post_types');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::drop('post');
    }
}

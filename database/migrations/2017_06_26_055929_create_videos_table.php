<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateVideosTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('videos', function (Blueprint $table) {
            $table->engine = 'InnoDB';
            $table->increments('id');
            $table->integer('user_id')->nullable();
            $table->integer('post_id')->unsigned();
            $table->integer('video_type_id')->unsigned();
            $table->string('url')->nullable();
            $table->timestamps();
            $table->foreign('user_id')->references('id')->on('users');
        });

        Schema::table('videos', function(Blueprint $table) {
            $table->foreign('post_id')->references('id')->on('post');
            $table->foreign('video_type_id')->references('id')->on('video_types');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::drop('videos');
    }
}

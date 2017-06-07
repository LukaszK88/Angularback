<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateImagesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('images', function (Blueprint $table) {
            $table->engine = 'InnoDB';
            $table->increments('id');
            $table->integer('user_id')->nullable();
            $table->integer('post_id')->unsigned();
            $table->integer('image_type_id')->unsigned();
            $table->string('url')->nullable();
            $table->string('link')->nullable();
            $table->string('thumbnail')->nullable();
            $table->string('medium')->nullable();
            $table->timestamps();
            $table->foreign('user_id')->references('id')->on('users');
        });

        Schema::table('images', function(Blueprint $table) {

            $table->foreign('post_id')->references('id')->on('post');
            $table->foreign('image_type_id')->references('id')->on('image_types');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::drop('images');
    }
}

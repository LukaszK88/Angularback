<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateEventsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('events', function (Blueprint $table) {
            $table->increments('id');
            $table->integer('user_id')->nullable();
            $table->string('title');
            $table->string('body')->nullable();
            $table->string('location')->nullable();
            $table->dateTime('date')->nullable();
            $table->integer('event_type_id')->unsigned();
            $table->timestamps();
            $table->foreign('user_id')->references('id')->on('users');

        });

        Schema::table('events', function(Blueprint $table) {
            $table->foreign('event_type_id')->references('id')->on('event_types');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::drop('events');
    }
}

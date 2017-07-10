<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateEventAttendenceCategories extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('event_attend_categories', function (Blueprint $table) {
            $table->increments('id');
            $table->integer('event_attend_id')->unsigned();
            $table->string('name');
            $table->timestamps();
        });

        Schema::table('event_attend_categories', function(Blueprint $table) {
            $table->foreign('event_attend_id')->references('id')->on('event_attend');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::drop('event_attend_categories');
    }
}

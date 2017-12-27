<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateFeedTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('feed', function (Blueprint $table) {
            $table->engine = 'InnoDB';
            $table->increments('id');
            $table->string('body');
            $table->integer('user_id');
            $table->integer('club_id')->nullable();
            $table->integer('event_id')->nullable();
            $table->integer('achievement_id')->nullable();
            $table->integer('event_attendance_id')->nullable();
            $table->integer('bohurt_id')->nullable();
            $table->integer('polearm_id')->nullable();
            $table->integer('sword_shield_id')->nullable();
            $table->integer('sword_buckler_id')->nullable();
            $table->integer('triathlon_id')->nullable();
            $table->integer('profight_id')->nullable();
            $table->integer('longsword_id')->nullable();
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
        Schema::drop('feed');
    }
}

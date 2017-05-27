<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateSwordBucklerTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('sword_buckler', function (Blueprint $table) {
            $table->increments('id');
            $table->integer('user_id');
            $table->integer('fights')->nullable();
            $table->integer('win')->nullable();
            $table->integer('loss')->nullable();
            $table->integer('points')->nullable();
            $table->timestamps();
            $table->foreign('user_id')->references('id')->on('users');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::drop('sword_buckler');
    }
}

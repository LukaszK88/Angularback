<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class MakeEventAttendCategoriesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
//        Schema::create('event_attend_categories', function (Blueprint $table) {
//            $table->engine = 'InnoDB';
//            $table->increments('id');
//            $table->string('name');
//            $table->integer('event_attend_id')->unsigned();
//            $table->timestamps();
//            $table->foreign('event_attend_id')
//                ->references('id')
//                ->on('event_attend')
//                ->onDelete('cascade');
//        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
      //  Schema::drop('event_attend_categories');

    }
}

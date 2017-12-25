<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class AddCascadeOnEventDeleteToAttendance extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('event_attend', function (Blueprint $table) {
            $table->integer('event_id')->unsigned()->change();
            $table->foreign('event_id')
                ->references('id')
                ->on('events')
                ->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('event_attend', function (Blueprint $table) {
            $table->integer('event_id')->change();
            $table->dropForeign(['event_id']);
        });
    }
}

<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class AddFieldsToClubsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('clubs', function (Blueprint $table) {
            $table->string('motto')->nullable();
            $table->string('description')->nullable();
            $table->string('fb')->nullable();
            $table->dateTime('foundation')->nullable();
            $table->integer('active')->default(0)->nullable();
            $table->string('founder');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('clubs', function (Blueprint $table) {
            $table->dropColumn('motto');
            $table->dropColumn('description');
            $table->dropColumn('fb');
            $table->dropColumn('foundation');
            $table->dropColumn('active');
            $table->dropColumn('founder');
        });
    }
}

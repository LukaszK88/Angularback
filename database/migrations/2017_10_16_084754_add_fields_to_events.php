<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class AddFieldsToEvents extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('events', function (Blueprint $table) {
            $table->boolean('make_page')->default(false);
            $table->dateTime('end')->nullable();
            $table->mediumText('lat')->nullable();
            $table->mediumText('lng')->nullable();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('events', function (Blueprint $table) {
            $table->dropColumn('make_page');
            $table->dropColumn('end');
            $table->dropColumn('lat');
            $table->dropColumn('lng');
        });
    }
}

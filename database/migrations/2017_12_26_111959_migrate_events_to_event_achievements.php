<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class MigrateEventsToEventAchievements extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        $eventAchievementService = new \App\Services\EventAchievementService();
        $events = \App\Models\Event::all();

        foreach ($events as $event){
            if($event->event_type_id === 1) {
                $eventAchievementService->createEntry($event);
            }
        }
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        $events = \App\Models\Event::all();

        foreach ($events as $event){
          $event->delete();
        }
    }
}

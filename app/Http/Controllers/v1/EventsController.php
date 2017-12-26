<?php

namespace App\Http\Controllers\v1;

use App\Contracts\Repositories\CategoryRepositoryInterface;
use App\Contracts\Repositories\EventAchievementInterface;
use App\Contracts\Repositories\EventRepositoryInterface;
use App\Models\Event;
use App\Models\EventAchievement;
use App\Models\EventAttendCategory;
use App\Models\EventAttendence;
use App\Models\EventCategories;
use App\Models\EventType;
use App\Models\Image;
use App\Models\User;
use App\Services\EventAchievementService;
use Carbon\Carbon;
use Illuminate\Http\Request;

class EventsController extends ApiController
{
    protected $event,
        $eventAchievementService,
        $category;

    public function __construct(
        EventRepositoryInterface $event,
        CategoryRepositoryInterface $category,
        EventAchievementService $eventAchievementService
    )
    {
        $this->event = $event;
        $this->category = $category;
        $this->eventAchievementService = $eventAchievementService;
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {  //TODO transform
        //event admin table
       $events = Event::with('user')
            ->with('eventType')
            ->with('category')
            ->with('attendance')
            ->with(['note','note.user','club'])
            ->get();

        return $this->respond($events);

    }

    public function getFutureEvents()
    {
        $events = Event::
            join(EventType::TABLE,EventType::TABLE.'.'.EventType::COL_ID,'=',Event::TCOL_EVENT_TYPE_ID)
            ->select('events.*',EventType::TCOL_TYPE)
            ->whereDate(Event::COL_DATE,'>=',Carbon::now())
            ->with(['category','user','attendance.user','club'])
            ->get();

        foreach ($events as $event) {
            $event['countdown'] = ((Carbon::parse($event['date'])->timestamp) - Carbon::now()->timestamp);
        }

        return $this->respond($events);
    }

    //TODO event list
    public function getEventsByType($type)
    {
        $events = Event::
            join(EventType::TABLE,EventType::TABLE.'.'.EventType::COL_ID,'=',Event::TCOL_EVENT_TYPE_ID)
            ->select('events.*',EventType::TCOL_TYPE)
            ->where(Event::TCOL_EVENT_TYPE_ID,$type)
            ->with(['category','user','attendance'])
            ->get();

        foreach ($events as $event){
            $event['countdown'] = ((Carbon::parse($event['date'])->timestamp) - Carbon::now()->timestamp);
            (Carbon::parse($event['date']) >= Carbon::now()) ? $event['future'] = true : $event['future'] = false;

        }
        return $this->respond($events);
    }

    public function getEventTypes()
    {
        $types = EventType::all();

        return $this->respond($types);
    }

    public function getEventsAttendedByUser($userId, Event $event)
    {
        $events = $event->getAttendingEvents($userId);

        return $this->respond($events);
    }

    public function getUserHostedEvents($userId)
    {
        $events = $this->event->getUserHosted($userId);

        return $this->respond($events);
    }

    public function store(Request $request)
    {
        $data = $request->all();
        //remove categories before event save
        // todo validation on unique event identifier
        $categories = $data['categories'];
        unset($data['categories']);
        $event = $this->event->create($data);
        if(!$event) return $this->respondWithError('Event did not save');
        //store event Achievement location
        if($event->event_type_id === 1) {
            $this->eventAchievementService->createEntry($event);
        }
        // if cat is here we can save it
        foreach ($categories as $categoryName => $value){
            $this->category->create($categoryName,$event->id);
        }
        return $this->respond('Event and categories saved');
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $event = Event::where(Event::COL_ID,$id)
            ->with('user')
            ->with('eventType')
            ->with('category')
            ->with('attendance.user')
            ->with('attendance.eventAttendCategory')
            ->first();

        return $this->respond($event);
    }

    public function getEventAttendees($eventId, EventAttendence $eventAttendence)
    {
        $eventAttendees = $eventAttendence->getEventAttendees($eventId);

        return $this->respond($eventAttendees);
    }

    public function update(Request $request, $id)
    {
        $event = Event::where(Event::COL_ID,$id);

        $data = $request->all();

        if(!$event) return $this->respondWithError('Event not found');

        $event->update($data);

        return $this->respond('Event Updated');
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        Event::find($id)->delete();

        return $this->responseDeleted('Event Deleted');
    }

    public function attendEvent($eventId, $userId, Request $request)
    {
        //todo seperate controller??
        $data = $request->all();

        $attendance = EventAttendence::updateOrCreate([
            EventAttendence::COL_EVENT_ID => $eventId,
            EventAttendence::COL_USER_ID => $userId
        ],[
            EventAttendence::COL_GOING => 1
        ]);

        foreach ($data as $category => $status){
            if($status === true) {
                EventAttendCategory::updateOrCreate([
                    EventAttendCategory::COL_EVENT_ATTEND_ID => $attendance->id,
                    EventAttendCategory::COL_NAME => $category
                ]);
            }elseif ($status === false){
                EventAttendCategory::where(EventAttendCategory::COL_EVENT_ATTEND_ID,$attendance->id)
                    ->where(EventAttendCategory::COL_NAME, $category)
                    ->delete();
            }
        }

        return $this->respond($attendance);
    }

    public function notGoing($eventId, $userId)
    {
        EventAttendence::where(EventAttendence::COL_EVENT_ID,$eventId)->where(EventAttendence::COL_USER_ID,$userId)->delete();
    }

}

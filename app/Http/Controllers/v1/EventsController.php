<?php

namespace App\Http\Controllers\v1;

use App\Contracts\Repositories\CategoryRepositoryInterface;
use App\Contracts\Repositories\EventRepositoryInterface;
use App\Models\Event;
use App\Models\EventAttendCategory;
use App\Models\EventAttendence;
use App\Models\EventCategories;
use App\Models\EventType;
use App\Models\Image;
use App\Models\User;
use Carbon\Carbon;
use Illuminate\Http\Request;

class EventsController extends ApiController
{
    protected $event,
        $category;

    public function __construct(EventRepositoryInterface $event, CategoryRepositoryInterface $category)
    {
        $this->event = $event;
        $this->category = $category;
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
        // todo add to separate table just for achievements and data gathering
        $categories = $data['categories'];
        unset($data['categories']);
        $event = $this->event->create($data);

        if(!$event) return $this->respondWithError('Event did not save');
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

    // todo this is by club
    public function showUserEvents($userClubId)
    {
        $events = Event::where(User::COL_CLUB_ID,$userClubId)
            ->orWhere(Event::COL_GLOBAL,'=',true)
            ->with('user')
            ->with('eventType')
            ->with('category')
            ->has('category')
            ->get();

        return $this->respond($events);
    }

    public function getEventAttendees($eventId, EventAttendence $eventAttendence)
    {
        $eventAttendees = $eventAttendence->getEventAttendees($eventId);

        return $this->respond($eventAttendees);
    }


    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        $event = Event::where(Event::COL_ID,$id);
        $data = $request->all();
        if($event){
            $event->update($data);
//TODO delete on false
//        foreach ($data['categories'] as $category => $key){
//
//            EventCategories::updateOrCreate([EventCategories::COL_EVENT_ID => $id,EventCategories::COL_NAME => $category],
//                [
//                    EventCategories::COL_EVENT_ID => $event->id,
//                    EventCategories::COL_NAME => $category
//                ]);
//        }
        return $this->respond($data);
        }
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

//    public function storeEventAttendedCategories($eventAttendId,Request $request)
//    {
//        foreach ($request->all() as $category => $key){
//            if($key === true) {
//                EventAttendCategory::updateOrCreate([
//                    EventAttendCategory::COL_EVENT_ATTEND_ID => $eventAttendId,
//                    EventAttendCategory::COL_NAME => $category
//                ]);
//            }elseif ($key === false){
//                EventAttendCategory::where(EventAttendCategory::COL_EVENT_ATTEND_ID,$eventAttendId)
//                    ->where(EventAttendCategory::COL_NAME, $category)
//                    ->delete();
//            }
//        }
//        return $this->responseCreated('Categories attended');
//    }

}

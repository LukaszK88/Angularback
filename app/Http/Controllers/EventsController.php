<?php

namespace App\Http\Controllers;

use App\Models\Event;
use App\Models\EventCategories;
use App\Models\EventType;
use App\Models\Image;
use Illuminate\Http\Request;

class EventsController extends ApiController
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //
    }

    public function getEventsByType($type)
    {
        $events = Event::leftJoin(Image::TABLE, function ($join) {
            $join->on(Event::TCOL_ID,'=',Image::TCOL_EVENT_ID)
                ->where(Image::TCOL_IMAGE_TYPE_ID, '=', 1);})
            ->join(EventType::TABLE,EventType::TABLE.'.'.EventType::COL_ID,'=',Event::TCOL_EVENT_TYPE_ID)
            ->select('events.*',EventType::TCOL_TYPE, Image::TCOL_URL)
            ->where(Event::TCOL_EVENT_TYPE_ID,$type)
            //->groupBy(EventType::TCOL_ID)
            ->with('user')
            ->get();

        return $this->respond($events);
    }

    public function getEventTypes()
    {
        $types = EventType::all();

        return $this->respond($types);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $data = $request->all();

        $event = Event::create([
            'user_id' => $data['user_id'],
            'title' => $data['title'],
            'body' => $data['body'],
            'location' => $data['location'],
            'date' => $data['date'],
            'event_type_id' => $data['event_type_id'],
        ]);

           foreach ($data['categories'] as $category){

               EventCategories::create([
                   'event_id' => $event->id,
                   'name' => $category['name']
               ]);
           }

        return $this->respond($event);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        //
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
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
    }
}

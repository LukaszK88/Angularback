<?php

namespace App\Http\Controllers\v1;

use App\Models\EventCategories;
use Illuminate\Http\Request;

class EventCategoriesController extends ApiController
{

    public function store(Request $request)
    {
        $data = $request->all();
        $eventId = $data['event_id'];
        unset($data['event_id']);

        foreach ($data as $category => $value){
            $eventCategory = EventCategories::where(EventCategories::COL_NAME,$category)->where(EventCategories::COL_EVENT_ID,$eventId)->first();

            if(($data[$category] === false && $eventCategory)){
                // delete
                $eventCategory->delete();
            }
            if(($data[$category] === true && !$eventCategory)){
                //insert
                EventCategories::create([
                    EventCategories::COL_EVENT_ID => $eventId,
                    EventCategories::COL_NAME => $category
                ]);
            }
        }
        return $this->responseCreated('Categories added');
    }

}

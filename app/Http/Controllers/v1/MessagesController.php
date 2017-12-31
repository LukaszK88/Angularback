<?php

namespace App\Http\Controllers\v1;

use App\Events\MessagePosted;
use App\Models\Message;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Redis;

class MessagesController extends ApiController
{
    public function getUserMessages($conversationId)
    {
        $userMessages =
            Message::
                with(['fromUser' => function($query){
                    $query->select(['id','name','image']);
                    }])
                    ->with(['toUser' => function($query){
                        $query->select(['id','name','image']);
                    }])
                ->where(Message::COL_CONVERSATION_ID,$conversationId)->get();

       // if($userMessages->count() < 1) return $this->respondWithError('No Messages Found');

        return $this->respond($userMessages);
    }

    public function storeMessage(Request $request)
    {
        $data = $request->all();

        $from = User::where(User::COL_ID,$data['from'])->select(['id','name','image'])->first();

        $to = User::where(User::COL_ID,$data['to'])->select(['id','name','image'])->first();

        $message = Message::create($data);

        $message['from_user'] = $from;

        $message['to_user'] = $to;

        Redis::publish('chatroom',$message);

        // event(new MessagePosted($message));

        return $this->respond('Message stored');
    }
}

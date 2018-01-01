<?php

namespace App\Http\Controllers\v1;

use App\Models\Conversation;
use App\Models\Message;
use Illuminate\Http\Request;

class ConversationsController extends ApiController
{

    public function startUsersConversation($to, $from)
    {
        $existingConversation1 = Conversation::where(Conversation::COL_TO,$to)->where(Conversation::COL_FROM,$from)->first();
        $existingConversation2 = Conversation::where(Conversation::COL_TO,$from)->where(Conversation::COL_FROM,$to)->first();
        if($existingConversation1 || $existingConversation2) return $this->respondWithError('Already exists');

        $newConversation = Conversation::create([
            Conversation::COL_TO => $to,
            Conversation::COL_FROM => $from
        ]);

        $conversation = Conversation::with(['fromUser' => function($query){
            $query->select(['id','name','image']);
        }])
        ->with(['toUser' => function($query){
            $query->select(['id','name','image']);
        }])
        ->where(Conversation::COL_ID,$newConversation->id)
        ->first();

        return $this->respond($conversation);
    }

}

<?php

namespace Tests\Feature;

use App\Models\Message;
use Tests\TestCase;
use Illuminate\Foundation\Testing\WithoutMiddleware;
use Illuminate\Foundation\Testing\DatabaseMigrations;
use Illuminate\Foundation\Testing\DatabaseTransactions;

class MessagesTest extends TestCase
{
    use DatabaseMigrations;


    /**    @test */
    public function it_returns_user_messages()
    {

        $messages = factory(Message::class,3)->create();

        $response = $this->getJson('v1/messages/'.$messages[0]->from);

        $response
            ->assertStatus(200)
            ->assertJsonFragment([
                'from' => (string)$messages[0]->from,
                'body' => $messages[0]->body
            ]);
    }

    /**    @test */
    public function it_returns_bad_request_response_if_no_messages_found()
    {

        $response = $this->getJson('v1/messages/eee');

        $response
            ->assertStatus(400);

        $this->assertArrayHasKey('error',$response->json());
    }


    public function getJson($uri)
    {
        return $this->json('GET','http://127.0.0.1:8000/api/'.$uri);
    }
}

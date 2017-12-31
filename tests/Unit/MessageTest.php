<?php

namespace Tests\Unit;

use App\Models\Message;
use App\Models\User;
use Tests\TestCase;
use Illuminate\Foundation\Testing\DatabaseMigrations;
use Illuminate\Foundation\Testing\DatabaseTransactions;

class MessageTest extends TestCase
{

    /** @test */
    public function it_has_reciver()
    {
        $this->assertTrue(true);
    }
}

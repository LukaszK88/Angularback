<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;
use Illuminate\Contracts\Queue\ShouldQueue;

class PasswordRecovery extends Mailable
{
    use Queueable, SerializesModels;

    protected $password;
    /**
     * Create a new message instance.
     *
     * @return void
     */
    public function __construct($password)
    {
        $this->password = $password;
    }

    /**
     * Build the message.
     *
     * @return $this
     */
    public function build()
    {
        return $this->from('noreply@medievalclubs.com')
                    ->subject('Password Recovery')
                    ->markdown('emails.password-recovery')
                    ->with('password',$this->password);
    }
}

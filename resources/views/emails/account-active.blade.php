@component('mail::message')
# Dear {{ $user->username }}

Your account is now active!<br>
You can log in with your password or FB/Gmail accounts.


Thanks,<br>
{{ config('app.name') }}
@endcomponent

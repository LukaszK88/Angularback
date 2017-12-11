@component('mail::message')
# Welcome to Ranking {{ $user->username }}

Your team Captain added you to the club!

If you wish you can head on to www.medievalclubs.com and login.
You can log in with FB or create yourself a password

Once logged in you can take control of your fighter profile<br>
-Set up your profile<br>
-Add achievements<br>
-See your performance<br>
-Attend Events

Very soon you will hear back from us once your account is active.


Thanks,<br>
{{ config('app.name') }}
@endcomponent

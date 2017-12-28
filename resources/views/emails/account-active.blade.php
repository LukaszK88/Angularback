@component('mail::message')
# Dear {{ $user->username }}

Your account is now active!<br>
If you wish you can head on to www.medievalclubs.com and login.
You can log in with FB or create yourself a password

Once logged in you can take control of your fighter profile<br>
-Set up your profile<br>
-Add achievements<br>
-See your performance<br>
-Attend/Host Events<br>
and more stuff...


Thanks,<br>
{{ config('app.name') }}
@endcomponent

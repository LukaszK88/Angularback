@component('mail::message')
# Dear {{ $user['founder'] }}

Your club is now active!<br>
Fighters will be able to join your club now and you will get Captain permission<br>

Once logged in you can take control of your Club profile<br>
-Set up club profile<br>
-Add fighters to yur club<br>
-Add ranking records (Club page / Ranking category pages)<br>
and more stuff...



Thanks,<br>
{{ config('app.name') }}
@endcomponent

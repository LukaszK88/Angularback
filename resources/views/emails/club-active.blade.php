@component('mail::message')
# Dear {{ $user['founder'] }}

Your club is now active!<br>
Fighters will be able to join your club now and you will get Captain permission<br>

Once logged in you can take control of your Club profile<br>
-Set up club profile<br>
-Add fighters to yur club<br>
-Add ranking records (Club page / Ranking category pages)<br>
and more stuff...

Ranking Record guidelines:<br>
Make sure you only record proper tournaments, should be self explanatory not to record tournament in your back garden..
Cheatsheet:<br>
Bohurt(each round):<br>
won and standing - Fighters team won and he is on his feet.<br>
last man standing - Fighters team lost but he was the last man standing<br>
suicide - we all know this guy...<br>

Profight(only proper profights 3x3min on official events or first class (FC):<br>
KO - victory by KO<br>
win - 3x3min profight<br>
FC I - 1t place at first class event<br>
FC II - 2nd place at first class event<br>
FC III - 3rd place at first class <br>

Rest of the categories works on win/loss basis (matches/fights not rounds)<br>



Thanks,<br>
{{ config('app.name') }}
@endcomponent

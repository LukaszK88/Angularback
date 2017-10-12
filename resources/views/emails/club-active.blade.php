@component('mail::message')
# Dear {{ $user['founder'] }}

Your club is now active!<br>
Fighters will be able to join your club now and you will get admin permission<br>
You can manage your club page and events


Thanks,<br>
{{ config('app.name') }}
@endcomponent

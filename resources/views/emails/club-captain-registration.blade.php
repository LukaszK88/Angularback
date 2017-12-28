@component('mail::message')
# Welcome to Ranking {{ $user['email'] }}

Very soon you will hear back from us once your account is active.<br>

You have registered as Captain for {{ $user['name'] }} club<br>
Once your club is active you will receive another email...<br>



Thanks,<br>
{{ config('app.name') }}
@endcomponent

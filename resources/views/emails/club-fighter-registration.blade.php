@component('mail::message')
# Welcome to Ranking {{ $user->username }}

Your team Captain added you to the club!

Very soon you will hear back from us once your account is active.



Thanks,<br>
{{ config('app.name') }}
@endcomponent

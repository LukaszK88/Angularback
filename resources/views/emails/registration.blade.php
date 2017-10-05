@component('mail::message')
# Welcome to Ranking {{ $user->username }}

Very soon you will hear back from us once your account is active.



Thanks,<br>
{{ config('app.name') }}
@endcomponent

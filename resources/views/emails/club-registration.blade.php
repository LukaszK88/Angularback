@component('mail::message')
# New club wants to join Ranking
@isset($club['fb'])
fb : {{$club['fb']}}
@endisset
email {{$club['founder']}}
Thanks,<br>
{{ config('app.name') }}
@endcomponent

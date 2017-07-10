@component('mail::message')
# Password Recovery

Your temporary password is : {{ $password }}



Thanks,<br>
{{ config('app.name') }}
@endcomponent

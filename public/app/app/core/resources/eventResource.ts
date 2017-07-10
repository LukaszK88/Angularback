/**
 * Created by lukas on 20/05/17.
 */
module myApp {

    'use strict';

    EventResource.$inject = [
        '$resource',
        'config'
    ];

    function EventResource(
        $resource:any,
        config:any

    ){

        return $resource( config.API + 'event/:eventId',
                {
                    eventId: '@eventId',
                },
                {
                    recover: {
                        method: 'POST',
                        //isArray: true,
                        url: config.API + 'user/recover',
                    },
                    getTypes: {
                        method: 'GET',
                        isArray: true,
                        url: config.API + 'event-types'
                    },
                    attend: {
                        method: 'POST',
                        //isArray: true,
                        url: config.API + 'event-attend/:eventId/:userId',
                        params:{
                            eventId: '@eventId',
                            userId: '@userId'
                        }
                    },
                    getAttendingEvents: {
                        method: 'GET',
                        isArray: true,
                        url: config.API + 'event-attending/:userId',
                        params:{
                            userId: '@userId'
                        }
                    },
                    attendees: {
                        method: 'GET',
                        isArray: true,
                        url: config.API + 'event-attendees/:eventId',
                        params:{
                            eventId: '@eventId'
                        }
                    },
                    attendCategories: {
                        method: 'POST',
                        //isArray: true,
                        url: config.API + 'event-attend-categories/:eventAttendId',
                        params:{
                            eventAttendId: '@eventAttendId'
                        }
                    },
                    getByType: {
                        method: 'GET',
                        isArray: true,
                        url: config.API + 'events/:typeId',
                        params:{
                            typeId: '@typeId'
                        }
                    },
                        update: {
                            method: 'PUT'
                        }
                });


    }

    angular.module('myApp')
        .factory('EventResource', EventResource);

}

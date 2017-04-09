'use strict';

angular.
    module('fighter').
        factory('Fighter', function($resource){
            var url= 'https://jsonplaceholder.typicode.com/users';

            return $resource(url, {}, {
                query:{
                    method: "GET",
                    params: {},
                    isArray: true,
                    cache: true,
                    //transformResponse:
                    //interceptor

                },
                get:{
                    method: "GET",
                    // params: {"id" : @id},
                    isArray: true,
                    cache: true,

                }
            })

        });
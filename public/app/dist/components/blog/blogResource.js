/**
 * Created by lukas on 20/05/17.
 */
var myApp;
(function (myApp) {
    'use strict';
    BlogResource.$inject = [
        '$resource',
        'config'
    ];
    function BlogResource($resource, config) {
        return {
            post: $resource(config.API + 'post/:postId', {
                postId: '@postId'
            }, {
                get: {
                    method: 'get',
                    isArray: false
                },
                query: {
                    method: 'get',
                    isArray: true
                },
                getByType: {
                    method: 'get',
                    isArray: true,
                    params: {
                        type: '@type'
                    },
                    url: config.API + 'posts/:type'
                },
                update: {
                    method: 'PUT'
                }
            })
        };
    }
    angular.module('myApp')
        .factory('BlogResource', BlogResource);
})(myApp || (myApp = {}));

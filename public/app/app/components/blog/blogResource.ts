/**
 * Created by lukas on 20/05/17.
 */
module myApp {

    'use strict';

    BlogResource.$inject = [
        '$resource',
        'config'
    ];

    function BlogResource(
        $resource:any,
        config:any

    ){

        return{

            post:$resource( config.API + 'post/:postId',
                {
                    postId: '@postId',
                },{
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
                        url:config.API + 'posts/:type',
                    },

                    update: {
                        method: 'PUT'
                    }
                }),

            // admin:$resource(config.API + 'admin/:userId/:action',
            //     {
            //         userId: '@userId',
            //         action: '@action'
            //     },
            //     {
            //         getBlocked: {
            //             method: 'GET',
            //             isArray: true,
            //             url: config.API + 'admin/:action',
            //             params: {
            //                 action: '@action'
            //             }
            //         },
            //         getUnauthorized: {
            //             method: 'GET',
            //             isArray: true,
            //             url: config.API + 'admin/:action',
            //             params: {
            //                 action: '@action'
            //             }
            //         },
            //         block: {
            //             method: 'POST',
            //             url: config.API + 'admin/:userId/:action',
            //             params: {
            //                 userId: '@userId',
            //                 action: '@action'
            //             }
            //         },
            //         approve: {
            //             method: 'POST',
            //             url: config.API + 'admin/:userId/:action',
            //             params: {
            //                 userId: '@userId',
            //                 action: '@action'
            //             }
            //         },
            //         remove: {
            //             method: 'POST',
            //             url: config.API + 'admin/:userId/:action',
            //             params: {
            //                 userId: '@userId',
            //                 action: '@action'
            //             }
            //         },
            //
            //     })
            //
            // //     // templateFields: {
            // //     //     method: 'GET',
            // //     //     isArray:true,
            // //     //     url: AppConfig.apiPath + AppConfig.API.event + ':eventId/template-fields',
            // //     //     params: {
            // //     //         eventId: '@eventId'
            // //     //     }
            // //     // },
            //
            //
             }
    }

    angular.module('myApp')
        .factory('BlogResource', BlogResource);

}

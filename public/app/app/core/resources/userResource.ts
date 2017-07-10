/**
 * Created by lukas on 20/05/17.
 */
module myApp {

    'use strict';

    UserResource.$inject = [
        '$resource',
        'config'
    ];

    function UserResource(
        $resource:any,
        config:any

    ){

        return{

            user:$resource( config.API + 'user/:userId',
                {
                    userId: '@userId',
                },
                {
                    recover: {
                        method: 'POST',
                        //isArray: true,
                        url: config.API + 'user/recover',
                    },
                    getUserRoles: {
                        method: 'GET',
                        isArray: true,
                        url: config.API + 'user-roles',
                    },
                        update: {
                            method: 'PUT'
                        }
                }),
            admin:$resource(config.API + 'admin/:userId/:action',
                {
                    userId: '@userId',
                    action: '@action'
                },
                {
                    getBlocked: {
                        method: 'GET',
                        isArray: true,
                        url: config.API + 'admin/:action',
                        params: {
                            action: '@action'
                        }
                    },
                    getUnauthorized: {
                        method: 'GET',
                        isArray: true,
                        url: config.API + 'admin/:action',
                        params: {
                            action: '@action'
                        }
                    },
                    block: {
                        method: 'POST',
                        url: config.API + 'admin/:userId/:action',
                        params: {
                            userId: '@userId',
                            action: '@action'
                        }
                    },
                    approve: {
                        method: 'POST',
                        url: config.API + 'admin/:userId/:action',
                        params: {
                            userId: '@userId',
                            action: '@action'
                        }
                    },
                    remove: {
                        method: 'POST',
                        url: config.API + 'admin/:userId/:action',
                        params: {
                            userId: '@userId',
                            action: '@action'
                        }
                    },

                })

            //     // templateFields: {
            //     //     method: 'GET',
            //     //     isArray:true,
            //     //     url: AppConfig.apiPath + AppConfig.API.event + ':eventId/template-fields',
            //     //     params: {
            //     //         eventId: '@eventId'
            //     //     }
            //     // },


            }
    }

    angular.module('myApp')
        .factory('UserResource', UserResource);

}

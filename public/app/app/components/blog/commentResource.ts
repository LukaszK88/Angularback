/**
 * Created by lukas on 20/05/17.
 */
module myApp {

    'use strict';

    CommentResource.$inject = [
        '$resource',
        'config'
    ];

    function CommentResource(
        $resource:any,
        config:any

    ){

        return $resource( config.API + 'comment/:commentId',
            {
                commentId: '@commentId',
            },{
                update: {
                    method: 'PUT'
                }
            })
    }

    angular.module('myApp')
        .factory('CommentResource', CommentResource);

}

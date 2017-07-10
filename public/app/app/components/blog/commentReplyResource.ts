/**
 * Created by lukas on 20/05/17.
 */
module myApp {

    'use strict';

    CommentReplyResource.$inject = [
        '$resource',
        'config'
    ];

    function CommentReplyResource(
        $resource:any,
        config:any

    ){

        return $resource( config.API + 'comment-reply/:replyId',
            {
                replyId: '@replyId',
            },{
                update: {
                    method: 'PUT'
                }
            })
    }

    angular.module('myApp')
        .factory('CommentReplyResource', CommentReplyResource);

}

/**
 * Created by lukas on 20/05/17.
 */
var myApp;
(function (myApp) {
    'use strict';
    CommentReplyResource.$inject = [
        '$resource',
        'config'
    ];
    function CommentReplyResource($resource, config) {
        return $resource(config.API + 'comment-reply/:replyId', {
            replyId: '@replyId'
        }, {
            update: {
                method: 'PUT'
            }
        });
    }
    angular.module('myApp')
        .factory('CommentReplyResource', CommentReplyResource);
})(myApp || (myApp = {}));

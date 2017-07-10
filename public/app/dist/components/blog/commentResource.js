/**
 * Created by lukas on 20/05/17.
 */
var myApp;
(function (myApp) {
    'use strict';
    CommentResource.$inject = [
        '$resource',
        'config'
    ];
    function CommentResource($resource, config) {
        return $resource(config.API + 'comment/:commentId', {
            commentId: '@commentId'
        }, {
            update: {
                method: 'PUT'
            }
        });
    }
    angular.module('myApp')
        .factory('CommentResource', CommentResource);
})(myApp || (myApp = {}));

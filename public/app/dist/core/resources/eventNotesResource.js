/**
 * Created by lukas on 20/05/17.
 */
var myApp;
(function (myApp) {
    'use strict';
    EventNotesResource.$inject = [
        '$resource',
        'config'
    ];
    function EventNotesResource($resource, config) {
        return $resource(config.API + 'event/notes/:noteId', {
            noteId: '@noteId'
        }, {
            update: {
                method: 'PUT'
            }
        });
    }
    angular.module('myApp')
        .factory('EventNotesResource', EventNotesResource);
})(myApp || (myApp = {}));

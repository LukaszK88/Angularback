/**
 * Created by lukas on 20/05/17.
 */
var myApp;
(function (myApp) {
    'use strict';
    FighterResource.$inject = [
        '$resource',
        'config'
    ];
    function FighterResource($resource, config) {
        return $resource(config.API + 'ranking/:fighterId', {
            fighterId: '@fighterId'
        }, {
            getFighterEventInfo: {
                method: 'GET',
                //isArray: true,
                url: config.API + 'user/event-info/:eventAttendId/:userId',
                params: {
                    eventAttendId: '@eventAttendId',
                    userId: '@userId'
                }
            },
            getLeaderboardData: {
                method: 'GET',
                //isArray: true,
                url: config.API + 'ranking-leaderboard'
            },
            getFighterData: {
                method: 'GET',
                url: config.API + 'ranking/tableData'
            },
            saveUpdate: {
                method: 'POST',
                url: config.API + 'ranking/:type',
                params: {
                    type: '@type'
                }
            },
            update: {
                method: 'PUT'
            }
        });
    }
    angular.module('myApp')
        .factory('FighterResource', FighterResource);
})(myApp || (myApp = {}));

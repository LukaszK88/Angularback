/**
 * Created by lukas on 20/05/17.
 */
var myApp;
(function (myApp) {
    var ranking;
    (function (ranking) {
        'use strict';
        FighterResource.$inject = [
            '$resource',
            'config'
        ];
        function FighterResource($resource, config) {
            return $resource(config.API + 'fighters/:fighterId', {
                fighterId: '@fighterId'
            }, {
                getFighterEventInfo: {
                    method: 'GET',
                    //isArray: true,
                    url: config.API + 'fighter/event-info/:eventAttendId/:userId',
                    params: {
                        eventAttendId: '@eventAttendId',
                        userId: '@userId'
                    }
                },
                getLeaderboardData: {
                    method: 'GET',
                    //isArray: true,
                    url: config.API + 'fighters-leaderboard'
                },
                getFighterData: {
                    method: 'GET',
                    url: config.API + 'fighters/tableData'
                },
                saveUpdate: {
                    method: 'POST',
                    url: config.API + 'fighters/:type',
                    params: {
                        type: '@type'
                    }
                },
                update: {
                    method: 'PUT'
                }
            });
        }
        angular.module('myApp.ranking')
            .factory('FighterResource', FighterResource);
    })(ranking = myApp.ranking || (myApp.ranking = {}));
})(myApp || (myApp = {}));

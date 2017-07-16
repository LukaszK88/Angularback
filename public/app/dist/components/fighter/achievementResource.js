/**
 * Created by lukas on 20/05/17.
 */
var myApp;
(function (myApp) {
    'use strict';
    AchievementResource.$inject = [
        '$resource',
        'config'
    ];
    function AchievementResource($resource, config) {
        return $resource(config.API + 'achievement/:userId/:achievementId', { userId: '@userId',
            achievementId: '@achievementId' }, {
            deleteThis: {
                method: 'POST',
                url: config.API + 'achievement/:userId/:achievementId/delete',
                params: {
                    userId: '@userId',
                    achievementId: '@achievementId'
                }
            },
            update: {
                method: 'PUT'
            }
        });
    }
    angular.module('myApp')
        .factory('AchievementResource', AchievementResource);
})(myApp || (myApp = {}));

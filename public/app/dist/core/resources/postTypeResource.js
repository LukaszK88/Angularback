var myApp;
(function (myApp) {
    'use strict';
    PostTypeResource.$inject = [
        '$resource',
        'config'
    ];
    function PostTypeResource($resource, config) {
        return $resource(config.API + 'types/:typeId', { typeId: '@typeId' }, {
            update: {
                method: 'PUT'
            }
        });
    }
    angular.module('myApp')
        .factory('PostTypeResource', PostTypeResource);
})(myApp || (myApp = {}));

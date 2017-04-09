'use-strict';

angular.module('tableBohurt').
component('tableBohurt', {

    templateUrl: 'app/components/ranking/tables/bohurt/tableBohurt.template.html',

    controller: function (Fighter, $location, $rootScope, $routeParams, $scope) {

                $scope.fighters = Fighter.query();



    }
});

'use-strict';

angular.module('tableAll').
component('tableAll', {

    templateUrl: 'app/components/ranking/tables/all/tableAll.template.html',

    controller: function (Fighter, $http, $location, $rootScope, $routeParams, $scope) {

               // $scope.fighters = $http.get('https://jsonplaceholder.typicode.com/users', config);
        $http.get("http://ranking/")
            .then(function(response) {
                $scope.fighters = response.data;
            });



    }
});

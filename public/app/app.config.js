'use strict';

angular.module('myApp').
    config(
        function(
            $locationProvider,
            $routeProvider
            ){
                $locationProvider.html5Mode(true);

                $routeProvider.
                    when("/", {template:"<home></home>"}).
                    when("/ranking", {template:"<ranking-nav></ranking-nav><table-all></table-all>"}).
                    when("/ranking/bohurt", {template:"<ranking-nav></ranking-nav><table-bohurt></table-bohurt>"}).
                    when("/register", {template:"<registration></registration>"}).
                    otherwise({template: "not found"})

});
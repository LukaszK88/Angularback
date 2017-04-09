'use-strict';

angular.module('registration').
        component('registration', {

            templateUrl: 'app/auth/registration/register.template.html',

            controller: function ($http, $location, $rootScope, $routeParams, $scope) {

                $scope.registerUser = function () {
                    $http.post('http://whitecompany/public/auth/signup', this.email).then(function (data) {
                       // console.log(data);
                    });
                }
            }
        });

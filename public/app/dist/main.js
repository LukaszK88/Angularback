/**
 * Created by lukas on 22/04/17.
 */
/// <reference path="_all.ts" />
var myApp;
(function (myApp) {
    var ranking;
    (function (ranking) {
        'use strict';
        var RankingController = (function () {
            function RankingController($scope) {
                this.$scope = $scope;
                this.sayHello();
            }
            RankingController.prototype.sayHello = function () {
                console.log('hello');
            };
            RankingController.prototype.sayBye = function () {
                alert('kaka');
            };
            return RankingController;
        }());
        RankingController.$inject = [
            '$scope'
        ];
        angular.module('myApp').controller('myApp.ranking.RankingController', RankingController);
    })(ranking = myApp.ranking || (myApp.ranking = {}));
})(myApp || (myApp = {}));

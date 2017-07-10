/**
 * Created by lukas on 09/04/17.
 */
var myApp;
(function (myApp) {
    angular.module('myApp').
        filter('abs', function () {
        return function (val) {
            return Math.abs(val);
        };
    });
})(myApp || (myApp = {}));

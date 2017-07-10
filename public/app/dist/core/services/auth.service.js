/**
 * Created by lukas on 20/05/17.
 */
var myApp;
(function (myApp) {
    'use strict';
    var Auth = (function () {
        function Auth($auth, $http, $q, config) {
            var _this = this;
            this.$auth = $auth;
            this.$http = $http;
            this.$q = $q;
            this.config = config;
            this.currentUser = function () {
                if (_this.$auth.getToken()) {
                    return _this.$http.get(_this.config.API + 'fighter');
                }
                else {
                    _this.$q.reject({ message: 'User has no Token' });
                }
            };
            this.updateUser = function (data) {
                if (_this.$auth.getToken()) {
                    return _this.$http.put(_this.config.API + 'fighters/update', data);
                }
                else {
                    _this.$q.reject({ message: 'User has no Token' });
                }
            };
            this.updateUserPassword = function (data) {
                if (_this.$auth.getToken()) {
                    console.log(data);
                    return _this.$http.put(_this.config.API + 'fighters/updatePassword', data);
                }
                else {
                    _this.$q.reject({ message: 'User has no Token' });
                }
            };
        }
        return Auth;
    }());
    Auth.$inject = [
        '$auth',
        '$http',
        '$q',
        'config'
    ];
    myApp.Auth = Auth;
    angular.module('myApp').service('auth', Auth);
})(myApp || (myApp = {}));

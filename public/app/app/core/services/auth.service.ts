/**
 * Created by lukas on 20/05/17.
 */
module myApp {
    'use strict';

    export class Auth {

        public static $inject = [
            '$auth',
            '$http',
            '$q',
            'config'
        ];

        constructor(
            private $auth:any,
            protected $http:any,
            protected $q:any,
            protected config:any
        ) {

        }
        public currentUser = () => {
        if(this.$auth.getToken()){
            return this.$http.get(this.config.API + 'user-current');
        }else {
            this.$q.reject({ message: 'User has no Token'});
        }
        };

        public updateUser = (data) => {
        if(this.$auth.getToken()){
            return this.$http.put(this.config.API + 'user/update', data);
        }else {
            this.$q.reject({ message: 'User has no Token'});
        }
        };

        public updateUserPassword = (data) => {
            if(this.$auth.getToken()){
                return this.$http.put(this.config.API + 'user/updatePassword', data);
            }else {
                this.$q.reject({ message: 'User has no Token'});
            }
        };

    }
    angular.module('myApp').service('auth', Auth);
}
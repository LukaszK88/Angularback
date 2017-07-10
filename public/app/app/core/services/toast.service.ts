/**
 * Created by lukas on 20/05/17.
 */
module myApp {
    'use strict';

    export class ToastService {

        public static $inject = ['$mdToast'];

        constructor(private $mdToast:any) {

        }
        public makeToast = function(type, string){
        this.$mdToast.show(
            this.$mdToast.simple()
                .content(string)
                .theme(type + "-toast")
                //.parent($(".p"))
                .position('right')
                .hideDelay(4000)
                .action('OK')
        );
    };


    }
    angular.module('myApp').service('toastService', ToastService);
}

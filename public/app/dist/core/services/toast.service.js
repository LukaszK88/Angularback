/**
 * Created by lukas on 20/05/17.
 */
var myApp;
(function (myApp) {
    'use strict';
    var ToastService = (function () {
        function ToastService($mdToast) {
            this.$mdToast = $mdToast;
            this.makeToast = function (type, string) {
                this.$mdToast.show(this.$mdToast.simple()
                    .content(string)
                    .theme(type + "-toast")
                    .position('right')
                    .hideDelay(4000)
                    .action('OK'));
            };
        }
        return ToastService;
    }());
    ToastService.$inject = ['$mdToast'];
    myApp.ToastService = ToastService;
    angular.module('myApp').service('toastService', ToastService);
})(myApp || (myApp = {}));

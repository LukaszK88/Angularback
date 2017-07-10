var myApp;
(function (myApp) {
    var ModalCtrl = (function () {
        function ModalCtrl($scope, $location, $auth, Toast, Auth, $mdDialog, $rootScope, $timeout, $window, Upload) {
            var _this = this;
            this.$scope = $scope;
            this.$location = $location;
            this.$auth = $auth;
            this.Toast = Toast;
            this.Auth = Auth;
            this.$mdDialog = $mdDialog;
            this.$rootScope = $rootScope;
            this.$timeout = $timeout;
            this.$window = $window;
            this.Upload = Upload;
            // var range = [];
            // for(var i=16;i<=60;i++) {
            //     range.push(i);
            // }
            // this $scope.ageArray = range;
            this.showEditProfile = function (ev) {
                _this.$mdDialog.show({
                    controller: _this.DialogController,
                    templateUrl: 'app/templates/modals/editprofile.template.html',
                    parent: angular.element(document.body),
                    targetEvent: ev,
                    clickOutsideToClose: true,
                    fullscreen: _this.$scope.customFullscreen // Only for -xs, -sm breakpoints.
                })
                    .then(function (data) {
                    _this.Auth.updateUser(data).then(function (response) {
                        _this.Toast.makeToast('success', response.data.message);
                    });
                }, function () {
                    _this.$scope.status = 'You cancelled the dialog.';
                });
            };
            this.showUpdateRecord = function (ev) {
                _this.$mdDialog.show({
                    controller: _this.DialogController,
                    templateUrl: 'app/templates/modals/updateRecord.template.html',
                    parent: angular.element(document.body),
                    targetEvent: ev,
                    clickOutsideToClose: true,
                    fullscreen: _this.$scope.customFullscreen // Only for -xs, -sm breakpoints.
                })
                    .then(function (data) {
                    _this.Auth.updateUser(data).then(function (response) {
                        _this.Toast.makeToast('success', response.data.message);
                    });
                }, function () {
                    _this.$scope.status = 'You cancelled the dialog.';
                });
            };
            if (this.$auth.isAuthenticated()) {
                this.Auth.currentUser().then(function (data) {
                    $scope.user = data.data;
                });
            }
        }
        ModalCtrl.prototype.DialogController = function () {
            var _this = this;
            this.$scope.hide = function () {
                _this.$mdDialog.hide();
            };
            this.$scope.cancel = function () {
                _this.$mdDialog.cancel();
            };
            this.$scope.submit = function (data) {
                _this.$mdDialog.hide(data);
            };
        };
        return ModalCtrl;
    }());
    ModalCtrl.$inject = [
        '$scope',
        '$location',
        '$auth',
        'toastService',
        'auth',
        '$mdDialog',
        '$rootScope',
        '$timeout',
        '$window',
        'Upload'
    ];
    myApp.ModalCtrl = ModalCtrl;
    angular.module('myApp').controller('ModalCtrl', ModalCtrl);
})(myApp || (myApp = {}));

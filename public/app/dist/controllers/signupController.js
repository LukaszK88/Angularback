var myApp;
(function (myApp) {
    var SignupCtrl = (function () {
        function SignupCtrl($scope, $location, $auth, Toast, $timeout, $window) {
            this.$scope = $scope;
            this.$location = $location;
            this.$auth = $auth;
            this.Toast = Toast;
            this.$timeout = $timeout;
            this.$window = $window;
            this.loading = false;
        }
        SignupCtrl.prototype.signup = function (user) {
            var _this = this;
            this.loading = true;
            this.$auth.signup(user)
                .then(function (response) {
                _this.$timeout(function () {
                    _this.$location.path('/');
                    _this.$window.location.reload();
                }, 2000);
                _this.Toast.makeToast('success', response.data.message);
            })["catch"](function (response) {
                _this.Toast.makeToast('error', response.data.error.email[0]);
                _this.loading = false;
            });
        };
        return SignupCtrl;
    }());
    SignupCtrl.$inject = [
        '$scope',
        '$location',
        '$auth',
        'toastService',
        '$timeout',
        '$window'
    ];
    myApp.SignupCtrl = SignupCtrl;
    angular.module('myApp').controller('myApp.SignupCtrl', SignupCtrl);
})(myApp || (myApp = {}));

var myApp;
(function (myApp) {
    var ToolsCtrl = (function () {
        function ToolsCtrl($scope, Toast) {
            var _this = this;
            this.$scope = $scope;
            this.Toast = Toast;
            this.pass = null;
            $scope.$watch('tools.weapon', function (newVal, oldVal) {
                var check;
                if (newVal) {
                    check = _this.wmfcWeaponCheck(newVal.balance, newVal.weight);
                    _this.idealBalance = ((25.5 / newVal.weight) - 5);
                    _this.idealWeight = (25.5 / (newVal.balance + 5));
                    if (_this.idealWeight <= 1.4) {
                        _this.idealWeight = 1.4;
                    }
                    if (check < 25.5) {
                        _this.pass = false;
                    }
                    else if (check >= 25.5) {
                        _this.pass = true;
                    }
                }
            }, true);
        }
        ToolsCtrl.prototype.wmfcWeaponCheck = function (balance, weaponWeight) {
            return ((balance + 5) * weaponWeight);
        };
        return ToolsCtrl;
    }());
    ToolsCtrl.$inject = [
        '$scope',
        'toastService'
    ];
    myApp.ToolsCtrl = ToolsCtrl;
    angular.module('myApp').controller('myApp.ToolsCtrl', ToolsCtrl);
})(myApp || (myApp = {}));

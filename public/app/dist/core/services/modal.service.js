/**
 * Created by lukas on 18/05/17.
 */
var myApp;
(function (myApp) {
    'use strict';
    var ModalService = (function () {
        function ModalService(// protected $scope:any,
            Auth, $mdDialog) {
            var _this = this;
            this.Auth = Auth;
            this.$mdDialog = $mdDialog;
            this.showAdvanced = function (controller) {
                _this.$mdDialog.show({
                    controller: controller,
                    bindToController: true,
                    templateUrl: 'app/templates/modals/editprofile.template.html',
                    parent: angular.element(document.body),
                    //targetEvent: ev,
                    clickOutsideToClose: true
                });
                // .then((data) => {
                //     this.Auth.updateUser(data).then((response) => {
                //         // User.toast('success', response.data.message);
                //
                //     });
                // }, () => {
                //     return 'You cancelled the dialog.';
                //
                // });
            };
        }
        return ModalService;
    }());
    ModalService.$inject = [
        //'$scope',
        'Auth',
        '$mdDialog'
        //
        //
    ];
    myApp.ModalService = ModalService;
    angular.module('myApp').service('modalService', ModalService);
})(myApp || (myApp = {}));

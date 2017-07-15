angular.module('myApp')
    .controller('ModalCtrl', function(
        $scope,
        auth,
        $location,
        $auth,
        $mdDialog
    ) {

        var finalData = [];

        if($auth.isAuthenticated()){
            auth.currentUser().then(function (data) {
                $scope.user = data.data;
            });
        }

        $scope.user = {};

        $scope.showCategoryAttendance = function (ev, template, local) {
            openModal(ev,template,local);
        };

        $scope.showFighterEventNotes = function (ev, template, local) {
            openModal(ev,template,local);
        };

        function openModal(ev,template, local) {
                $mdDialog.show({
                    controller: DialogController2,
                    templateUrl: 'app/app/templates/modals/' + template + '.template.html',
                    //parent: angular.element(document.body),
                    targetEvent: ev,
                    focusOnOpen: true,
                    locals:{
                        local: local
                    },
                    clickOutsideToClose: true,
                    fullscreen: $scope.customFullscreen // Only for -xs, -sm breakpoints.
                })
                    .then(function (data) {

                    }, function () {
                        $scope.status = 'You cancelled the dialog.';
                    });
        }

        $scope.showLogin = function (ev) {

            $mdDialog.show({
                controller: DialogController,
                templateUrl: 'app/app/templates/modals/login.template.html',
                //parent: angular.element(document.body),
                targetEvent: ev,
                focusOnOpen: true,
                clickOutsideToClose: true,
                fullscreen: $scope.customFullscreen // Only for -xs, -sm breakpoints.
            })
                .then(function (data) {

                }, function () {
                    $scope.status = 'You cancelled the dialog.';
                });
        };

        $scope.showRegister = function (ev) {

            $mdDialog.show({
                controller: DialogController,
                templateUrl: 'app/app/templates/modals/register.template.html',
                //parent: angular.element(document.body),
                targetEvent: ev,
                focusOnOpen: true,
                clickOutsideToClose: true,
                fullscreen: $scope.customFullscreen // Only for -xs, -sm breakpoints.
            })
                .then(function (data) {

                }, function () {
                    $scope.status = 'You cancelled the dialog.';
                });
        };

        $scope.showSettings = function (ev) {

            $mdDialog.show({
                controller: DialogController,
                templateUrl: 'app/app/templates/modals/settings.template.html',
                //parent: angular.element(document.body),
                targetEvent: ev,
                focusOnOpen: true,
                clickOutsideToClose: true,
                fullscreen: $scope.customFullscreen // Only for -xs, -sm breakpoints.
            })
                .then(function (data) {

                }, function () {
                    $scope.status = 'You cancelled the dialog.';
                });
        };

        $scope.showEditProfile = function (ev, template, local) {
            openModal(ev,template,local);
        };

        $scope.showUpdateRecordRanking = function (ev, template, local) {
            openModal(ev,template,local);
        };

        function DialogController2($scope, $mdDialog, local) {
            $scope.container = {};
            $scope.local = local;
            $scope.hide = function () {
                $mdDialog.hide();
            };

            $scope.cancel = function () {
                $mdDialog.cancel();
            };

            $scope.submit = function (data) {
                $mdDialog.hide(data);
            };
        }

        function DialogController($scope, $mdDialog) {
            $scope.container = {};

            $scope.hide = function () {
                $mdDialog.hide();
            };

            $scope.cancel = function () {
                $mdDialog.cancel();
            };

            $scope.submit = function (data) {
                $mdDialog.hide(data);
            };
        }

        $scope.places = [
            {"value": "<font color='#ffd700'><i class='fa fa-trophy fa-2x' aria-hidden='true'></i></font>", "name": "1st" },
            {"value": "<font color='silver'><i class='fa fa-trophy fa-2x' aria-hidden='true'></i></font>", "name": "2nd"},
            {"value": "<font color='#a52a2a'><i class='fa fa-trophy fa-2x' aria-hidden='true'></i></font>", "name": "3rd"}
        ];
//TODO move to config?
        $scope.categories = [
            {"name": "5v5"},
            {"name": "10v10"},
            {"name": "16v16"},
            {"name": "21v21"},
            {"name": "Longsword"},
            {"name": "Polearm"},
            {"name": "Profight"},
            {"name": "Triathlon"},
            {"name": "S&S"},
            {"name": "S&B"}
            ];

        $scope.countries = [
            {"name": "Argentina", "code": "AR"},
            {"name": "Australia", "code": "AU"},
            {"name": "Austria", "code": "AT"},
            {"name": "Belarus", "code": "BY"},
            {"name": "Belgium", "code": "BE"},
            {"name": "Bulgaria", "code": "BG"},
            {"name": "Canada", "code": "CA"},
            {"name": "China", "code": "CN"},
            {"name": "Croatia", "code": "HR"},
            {"name": "Cyprus", "code": "CY"},
            {"name": "Czech Republic", "code": "CZ"},
            {"name": "Denmark", "code": "DK"},
            {"name": "Estonia", "code": "EE"},
            {"name": "Finland", "code": "FI"},
            {"name": "France", "code": "FR"},
            {"name": "Germany", "code": "DE"},
            {"name": "Gibraltar", "code": "GI"},
            {"name": "Greece", "code": "GR"},
            {"name": "Greenland", "code": "GL"},
            {"name": "Hungary", "code": "HU"},
            {"name": "Iceland", "code": "IS"},
            {"name": "Ireland", "code": "IE"},
            {"name": "Israel", "code": "IL"},
            {"name": "Italy", "code": "IT"},
            {"name": "Japan", "code": "JP"},
            {"name": "Latvia", "code": "LV"},
            {"name": "Liechtenstein", "code": "LI"},
            {"name": "Lithuania", "code": "LT"},
            {"name": "Luxembourg", "code": "LU"},
            {"name": "Macedonia, The Former Yugoslav Republic of", "code": "MK"},
            {"name": "Mexico", "code": "MX"},
            {"name": "Moldova, Republic of", "code": "MD"},
            {"name": "Monaco", "code": "MC"},
            {"name": "Montenegro", "code": "ME"},
            {"name": "Netherlands", "code": "NL"},
            {"name": "New Zealand", "code": "NZ"},
            {"name": "Norway", "code": "NO"},
            {"name": "Poland", "code": "PL"},
            {"name": "Romania", "code": "RO"},
            {"name": "Russian Federation", "code": "RU"},
            {"name": "Serbia", "code": "RS"},
            {"name": "Slovakia", "code": "SK"},
            {"name": "Slovenia", "code": "SI"},
            {"name": "South Africa", "code": "ZA"},
            {"name": "Spain", "code": "ES"},
            {"name": "Sweden", "code": "SE"},
            {"name": "Switzerland", "code": "CH"},
            {"name": "Taiwan, Province of China", "code": "TW"},
            {"name": "Turkey", "code": "TR"},
            {"name": "Ukraine", "code": "UA"},
            {"name": "United Kingdom", "code": "GB"},
            {"name": "United States", "code": "US"}

        ];
    });
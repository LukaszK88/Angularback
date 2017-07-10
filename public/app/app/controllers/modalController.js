angular.module('myApp')
    .controller('ModalCtrl', function(
        $scope,
        auth,
        $location,
        $auth,
        $mdDialog,
        toastService,
        $stateParams,
        FighterResource,
        AchievementResource,
        $q

    ) {

        var finalData = [];

        if($auth.isAuthenticated()){
            auth.currentUser().then(function (data) {
                $scope.user = data.data;
            });
        }



        $scope.user = {};

        var range = [];
        for(var i=16;i<=60;i++) {
            range.push(i);
        }
        $scope.ageArray = range;

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
                    console.log(data);
                }, function () {
                    $scope.status = 'You cancelled the dialog.';
                });
        };

        $scope.showEditProfile = function (ev) {

            $mdDialog.show({
                controller: DialogController,
                templateUrl: 'app/app/templates/modals/editprofile.template.html',
                parent: angular.element(document.body),
                targetEvent: ev,
                clickOutsideToClose: true,
                fullscreen: $scope.customFullscreen // Only for -xs, -sm breakpoints.
            })
                .then(function (data) {
                    auth.updateUser(data).then(function (response){
                        toastService.makeToast('success', response.data.message);
                    });
                }, function () {
                    $scope.status = 'You cancelled the dialog.';
                });
        };

        $scope.showUpdateRecordRanking = function (ev, template, local) {
            openModal(ev,template,local);
        };

        $scope.showUpdateRecord = function (ev, id, type) {

            $mdDialog.show({
                controller: DialogController,
                templateUrl: 'app/app/templates/modals/ranking/update'+ type +'Record.template.html',
                parent: angular.element(document.body),
                targetEvent: ev,
                clickOutsideToClose: true,
                fullscreen: $scope.customFullscreen // Only for -xs, -sm breakpoints.
            })
                .then(function(data) {
                    finalData = data;
                    finalData.fighterId = id;
                    var keys = [];
                    keys = Object.keys(finalData);

                    FighterResource.saveUpdate({type: keys[0]},finalData).$promise.then(function (response) {
                        toastService.makeToast('success', response.message);
                    });

        }, function(){
                $scope.status = 'You cancelled the dialog.';

            });
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
            {"name": "Bosnia and Herzegovina", "code": "BA"},
            {"name": "Botswana", "code": "BW"},
            {"name": "Brazil", "code": "BR"},
            {"name": "British Indian Ocean Territory", "code": "IO"},
            {"name": "Bulgaria", "code": "BG"},
            {"name": "Burkina Faso", "code": "BF"},
            {"name": "Canada", "code": "CA"},
            {"name": "Central African Republic", "code": "CF"},
            {"name": "Chad", "code": "TD"},
            {"name": "Chile", "code": "CL"},
            {"name": "China", "code": "CN"},
            {"name": "Christmas Island", "code": "CX"},
            {"name": "Cocos (Keeling) Islands", "code": "CC"},
            {"name": "Colombia", "code": "CO"},
            {"name": "Comoros", "code": "KM"},
            {"name": "Congo", "code": "CG"},
            {"name": "Congo, The Democratic Republic of the", "code": "CD"},
            {"name": "Cook Islands", "code": "CK"},
            {"name": "Costa Rica", "code": "CR"},
            {"name": "Cote D\"Ivoire", "code": "CI"},
            {"name": "Croatia", "code": "HR"},
            {"name": "Cuba", "code": "CU"},
            {"name": "Cyprus", "code": "CY"},
            {"name": "Czech Republic", "code": "CZ"},
            {"name": "Denmark", "code": "DK"},
            {"name": "Djibouti", "code": "DJ"},
            {"name": "Dominica", "code": "DM"},
            {"name": "Dominican Republic", "code": "DO"},
            {"name": "Ecuador", "code": "EC"},
            {"name": "Egypt", "code": "EG"},
            {"name": "El Salvador", "code": "SV"},
            {"name": "Equatorial Guinea", "code": "GQ"},
            {"name": "Eritrea", "code": "ER"},
            {"name": "Estonia", "code": "EE"},
            {"name": "Ethiopia", "code": "ET"},
            {"name": "Falkland Islands (Malvinas)", "code": "FK"},
            {"name": "Faroe Islands", "code": "FO"},
            {"name": "Fiji", "code": "FJ"},
            {"name": "Finland", "code": "FI"},
            {"name": "France", "code": "FR"},
            {"name": "French Guiana", "code": "GF"},
            {"name": "French Polynesia", "code": "PF"},
            {"name": "French Southern Territories", "code": "TF"},
            {"name": "Gabon", "code": "GA"},
            {"name": "Gambia", "code": "GM"},
            {"name": "Georgia", "code": "GE"},
            {"name": "Germany", "code": "DE"},
            {"name": "Ghana", "code": "GH"},
            {"name": "Gibraltar", "code": "GI"},
            {"name": "Greece", "code": "GR"},
            {"name": "Greenland", "code": "GL"},
            {"name": "Grenada", "code": "GD"},
            {"name": "Guadeloupe", "code": "GP"},
            {"name": "Guam", "code": "GU"},
            {"name": "Guatemala", "code": "GT"},
            {"name": "Guernsey", "code": "GG"},
            {"name": "Guinea", "code": "GN"},
            {"name": "Guinea-Bissau", "code": "GW"},
            {"name": "Guyana", "code": "GY"},
            {"name": "Haiti", "code": "HT"},
            {"name": "Heard Island and Mcdonald Islands", "code": "HM"},
            {"name": "Holy See (Vatican City State)", "code": "VA"},
            {"name": "Honduras", "code": "HN"},
            {"name": "Hong Kong", "code": "HK"},
            {"name": "Hungary", "code": "HU"},
            {"name": "Iceland", "code": "IS"},
            {"name": "India", "code": "IN"},
            {"name": "Indonesia", "code": "ID"},
            {"name": "Iran, Islamic Republic Of", "code": "IR"},
            {"name": "Iraq", "code": "IQ"},
            {"name": "Ireland", "code": "IE"},
            {"name": "Isle of Man", "code": "IM"},
            {"name": "Israel", "code": "IL"},
            {"name": "Italy", "code": "IT"},
            {"name": "Jamaica", "code": "JM"},
            {"name": "Japan", "code": "JP"},
            {"name": "Jersey", "code": "JE"},
            {"name": "Jordan", "code": "JO"},
            {"name": "Kazakhstan", "code": "KZ"},
            {"name": "Kenya", "code": "KE"},
            {"name": "Kiribati", "code": "KI"},
            {"name": "Korea, Democratic People\"S Republic of", "code": "KP"},
            {"name": "Korea, Republic of", "code": "KR"},
            {"name": "Kuwait", "code": "KW"},
            {"name": "Kyrgyzstan", "code": "KG"},
            {"name": "Lao People\"S Democratic Republic", "code": "LA"},
            {"name": "Latvia", "code": "LV"},
            {"name": "Lebanon", "code": "LB"},
            {"name": "Lesotho", "code": "LS"},
            {"name": "Liberia", "code": "LR"},
            {"name": "Libyan Arab Jamahiriya", "code": "LY"},
            {"name": "Liechtenstein", "code": "LI"},
            {"name": "Lithuania", "code": "LT"},
            {"name": "Luxembourg", "code": "LU"},
            {"name": "Macao", "code": "MO"},
            {"name": "Macedonia, The Former Yugoslav Republic of", "code": "MK"},
            {"name": "Madagascar", "code": "MG"},
            {"name": "Malawi", "code": "MW"},
            {"name": "Malaysia", "code": "MY"},
            {"name": "Maldives", "code": "MV"},
            {"name": "Mali", "code": "ML"},
            {"name": "Malta", "code": "MT"},
            {"name": "Marshall Islands", "code": "MH"},
            {"name": "Martinique", "code": "MQ"},
            {"name": "Mauritania", "code": "MR"},
            {"name": "Mauritius", "code": "MU"},
            {"name": "Mayotte", "code": "YT"},
            {"name": "Mexico", "code": "MX"},
            {"name": "Micronesia, Federated States of", "code": "FM"},
            {"name": "Moldova, Republic of", "code": "MD"},
            {"name": "Monaco", "code": "MC"},
            {"name": "Mongolia", "code": "MN"},
            {"name": "Montenegro", "code": "ME"},
            {"name": "Montserrat", "code": "MS"},
            {"name": "Morocco", "code": "MA"},
            {"name": "Mozambique", "code": "MZ"},
            {"name": "Myanmar", "code": "MM"},
            {"name": "Namibia", "code": "NA"},
            {"name": "Nauru", "code": "NR"},
            {"name": "Nepal", "code": "NP"},
            {"name": "Netherlands", "code": "NL"},
            {"name": "Netherlands Antilles", "code": "AN"},
            {"name": "New Caledonia", "code": "NC"},
            {"name": "New Zealand", "code": "NZ"},
            {"name": "Nicaragua", "code": "NI"},
            {"name": "Niger", "code": "NE"},
            {"name": "Nigeria", "code": "NG"},
            {"name": "Niue", "code": "NU"},
            {"name": "Norfolk Island", "code": "NF"},
            {"name": "Northern Mariana Islands", "code": "MP"},
            {"name": "Norway", "code": "NO"},
            {"name": "Oman", "code": "OM"},
            {"name": "Pakistan", "code": "PK"},
            {"name": "Palau", "code": "PW"},
            {"name": "Palestinian Territory, Occupied", "code": "PS"},
            {"name": "Panama", "code": "PA"},
            {"name": "Papua New Guinea", "code": "PG"},
            {"name": "Paraguay", "code": "PY"},
            {"name": "Peru", "code": "PE"},
            {"name": "Philippines", "code": "PH"},
            {"name": "Pitcairn", "code": "PN"},
            {"name": "Poland", "code": "PL"},
            {"name": "Portugal", "code": "PT"},
            {"name": "Puerto Rico", "code": "PR"},
            {"name": "Qatar", "code": "QA"},
            {"name": "Reunion", "code": "RE"},
            {"name": "Romania", "code": "RO"},
            {"name": "Russian Federation", "code": "RU"},
            {"name": "RWANDA", "code": "RW"},
            {"name": "Saint Helena", "code": "SH"},
            {"name": "Saint Kitts and Nevis", "code": "KN"},
            {"name": "Saint Lucia", "code": "LC"},
            {"name": "Saint Pierre and Miquelon", "code": "PM"},
            {"name": "Saint Vincent and the Grenadines", "code": "VC"},
            {"name": "Samoa", "code": "WS"},
            {"name": "San Marino", "code": "SM"},
            {"name": "Sao Tome and Principe", "code": "ST"},
            {"name": "Saudi Arabia", "code": "SA"},
            {"name": "Senegal", "code": "SN"},
            {"name": "Serbia", "code": "RS"},
            {"name": "Slovakia", "code": "SK"},
            {"name": "Slovenia", "code": "SI"},
            {"name": "Solomon Islands", "code": "SB"},
            {"name": "Somalia", "code": "SO"},
            {"name": "South Africa", "code": "ZA"},
            {"name": "South Georgia and the South Sandwich Islands", "code": "GS"},
            {"name": "Spain", "code": "ES"},
            {"name": "Sri Lanka", "code": "LK"},
            {"name": "Sudan", "code": "SD"},
            {"name": "Suriname", "code": "SR"},
            {"name": "Svalbard and Jan Mayen", "code": "SJ"},
            {"name": "Swaziland", "code": "SZ"},
            {"name": "Sweden", "code": "SE"},
            {"name": "Switzerland", "code": "CH"},
            {"name": "Syrian Arab Republic", "code": "SY"},
            {"name": "Taiwan, Province of China", "code": "TW"},
            {"name": "Tunisia", "code": "TN"},
            {"name": "Turkey", "code": "TR"},
            {"name": "Turkmenistan", "code": "TM"},
            {"name": "Turks and Caicos Islands", "code": "TC"},
            {"name": "Tuvalu", "code": "TV"},
            {"name": "Uganda", "code": "UG"},
            {"name": "Ukraine", "code": "UA"},
            {"name": "United Arab Emirates", "code": "AE"},
            {"name": "United Kingdom", "code": "GB"},
            {"name": "United States", "code": "US"}

        ];
    });
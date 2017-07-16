var myApp;
(function (myApp) {
    'use-strict';
    var FighterCtrl = (function () {
        function FighterCtrl($http, $scope, $location, FighterResource, $stateParams, Upload, Achievement, Toast, EventResource, _, uiCalendarConfig, $compile, config) {
            var _this = this;
            this.$http = $http;
            this.$scope = $scope;
            this.$location = $location;
            this.FighterResource = FighterResource;
            this.$stateParams = $stateParams;
            this.Upload = Upload;
            this.Achievement = Achievement;
            this.Toast = Toast;
            this.EventResource = EventResource;
            this._ = _;
            this.uiCalendarConfig = uiCalendarConfig;
            this.$compile = $compile;
            this.config = config;
            this.achievements = [];
            this.events = [];
            this.eventNotes = [];
            this.eventSelect = [];
            this.photoUploaded = false;
            this.fetchAchievements();
            this.getFighterEvents();
            this.getEvents();
            //UI calendar
            // /* Render Tooltip */
            // $scope.eventRender = ( event, element, view ) => {
            //     element.attr({'uib-tooltip-html': "\'<p>" + event.title + "</p>\'", 'tooltip-append-to-body': true});
            //     $compile(element)($scope);
            // };
            //TODO in the future drop down only events which attended only by the user
            $scope.upload = function (photo, name) {
                if (photo) {
                    _this.Upload.upload({
                        url: config.API + 'storePhoto/' + _this.$scope.currentUser.id,
                        data: {
                            file: Upload.dataUrltoBlob(photo, name)
                        }
                    }).then(function (response) {
                        _this.photoUploaded = true;
                        _this.$scope.fighter.image = response.data.imageUrl;
                        _this.Toast.makeToast('success', response.data.message);
                    });
                }
            };
            if (this.$stateParams['fighterId']) {
                this.RankingResource.get({ fighterId: this.$stateParams['fighterId'] }).$promise
                    .then(function (response) {
                    $scope.fighter = response;
                });
            }
        }
        FighterCtrl.prototype.getEvents = function () {
            var _this = this;
            this.EventResource.query().$promise.then(function (response) {
                _this.eventSelect = response;
            });
        };
        FighterCtrl.prototype.getOtherAttendees = function (event) {
            var _this = this;
            this.EventResource.attendees({ eventId: event.id }).$promise
                .then(function (response) {
                event.users = response;
                _this.RankingResource.getFighterEventInfo({ eventAttendId: event.eventAttendId, userId: _this.$stateParams['fighterId'] }).$promise
                    .then(function (response) {
                    event.attending_categories = response.event_attend_category;
                });
            });
        };
        FighterCtrl.prototype.getFighterEvents = function () {
            var _this = this;
            this.EventResource.getAttendingEvents({ userId: this.$stateParams['fighterId'] }).$promise
                .then(function (response) {
                _this.events = response;
                _this.eventAttendingCount = response.length;
                //TODO change scope to AS
                var calendarEvents = [];
                var array = [];
                _this._.forEach(_this.events, function (value, key) {
                    array.push({ title: value['title'], start: value['date'] });
                });
                _this.$scope.eventSources = [array];
            });
        };
        FighterCtrl.prototype.hideForm = function () {
            this.$scope.showform = false;
        };
        FighterCtrl.prototype.fetchAchievements = function () {
            var _this = this;
            this.Achievement.get({ userId: this.$stateParams['fighterId'] }).$promise
                .then(function (response) {
                _this.achievements = response.data;
            });
        };
        FighterCtrl.prototype.updateAchievement = function (achievement) {
            var _this = this;
            this.Achievement.update({ userId: achievement.id }, achievement).$promise.then(function (response) {
                _this.fetchAchievements();
                _this.Toast.makeToast('success', 'Achievement updated');
            });
        };
        FighterCtrl.prototype.addAchievement = function (data) {
            var _this = this;
            data.user_id = this.$scope.currentUser.id;
            this.Achievement.save(data).$promise.then(function (response) {
                console.log(response.data);
                _this.achievements.data.push(response.data);
                _this.fetchAchievements();
                _this.Toast.makeToast('success', response.message);
            });
        };
        FighterCtrl.prototype.fighterLoggedIn = function () {
            if (this.$scope.currentUser) {
                if (this.$stateParams['fighterId'] == this.$scope.currentUser.id) {
                    return true;
                }
            }
        };
        FighterCtrl.prototype.deleteAchievement = function (achievement) {
            var _this = this;
            this.Achievement.deleteThis({ userId: this.$stateParams['fighterId'], achievementId: achievement.id }).$promise
                .then(function (response) {
                var index = _this.achievements.data.indexOf(achievement);
                _this.achievements.data.splice(index, 1);
                _this.fetchAchievements();
                _this.Toast.makeToast('error', response.message);
            });
        };
        return FighterCtrl;
    }());
    FighterCtrl.$inject = [
        '$http',
        '$scope',
        '$location',
        'FighterResource',
        '$stateParams',
        'Upload',
        'AchievementResource',
        'toastService',
        'EventResource',
        '_',
        'uiCalendarConfig',
        '$compile',
        'config'
    ];
    myApp.FighterCtrl = FighterCtrl;
    angular.module('myApp').controller('myApp.FighterCtrl', FighterCtrl);
})(myApp || (myApp = {}));

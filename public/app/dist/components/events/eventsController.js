var myApp;
(function (myApp) {
    'use-strict';
    var EventCtrl = (function () {
        function EventCtrl($http, $scope, $location, BlogResource, $stateParams, media, Toast, $state, _, event, FighterResource) {
            this.$http = $http;
            this.$scope = $scope;
            this.$location = $location;
            this.BlogResource = BlogResource;
            this.$stateParams = $stateParams;
            this.media = media;
            this.Toast = Toast;
            this.$state = $state;
            this._ = _;
            this.event = event;
            this.FighterResource = FighterResource;
            this.tournaments = [];
            this.tournament = [];
            this.attendees = [];
            this.categories = [];
            this.currentState = $state.current.name;
            if (this.currentState === 'tournaments') {
                this.fetchTournaments();
            }
            if (this.currentState === 'tournament') {
                this.fetchTournament();
                this.fetchAttendees();
            }
        }
        EventCtrl.prototype.fetchAttendees = function () {
            var _this = this;
            this.event.attendees({ eventId: this.$stateParams['tournamentId'] }).$promise.then(function (response) {
                _this.attendees = response;
                // console.log(this.attendees);
            });
        };
        EventCtrl.prototype.fetchTournament = function () {
            var _this = this;
            console.log(this.$stateParams['tournamentId']);
            this.event.get({ eventId: this.$stateParams['tournamentId'] }).$promise.then(function (response) {
                console.log(response);
                _this.tournament = response;
                _this.attendingCount = response.attendance.length;
            });
        };
        EventCtrl.prototype.submitAttendanceCategories = function (categories) {
            this.event.attendCategories({ eventAttendId: this.$stateParams['eventAttendId'] }, categories).$promise.then(function (response) {
            });
        };
        EventCtrl.prototype.attend = function (user, event) {
            var _this = this;
            var status = {};
            this.categories.event = event.category;
            status['going'] = true;
            this.event.attend({ eventId: event.id, userId: user.id }, status).$promise.then(function (response) {
                _this.FighterResource.getFighterEventInfo({ eventAttendId: response.id, userId: user.id }).$promise.then(function (data) {
                    var array = {};
                    angular.forEach(data.event_attend_category, function (value, key) {
                        array[value.name] = true;
                    });
                    _this.categories.user = array;
                });
                _this.Toast.makeToast('success', 'You are going to ' + event.title);
                _this.$state.go('tournaments', { eventAttendId: response.id });
            });
        };
        EventCtrl.prototype.cantGo = function (user, event) {
            var _this = this;
            var status = {};
            status['going'] = false;
            this.event.attend({ eventId: event.id, userId: user.id }, status).$promise.then(function (response) {
                _this.Toast.makeToast('error', 'You are not going to ' + event.title);
            });
        };
        EventCtrl.prototype.fetchTournaments = function () {
            var _this = this;
            this.event.getByType({ typeId: 1 }).$promise.then(function (response) {
                _this.tournaments = response;
                var now = new Date().getTime();
                _this._.forEach(_this.tournaments, (function (value, key) {
                    //  let countdown = (new Date(value.date).getTime()) - now;
                    //value.date = Math.floor((countdown % (1000 * 60)) / 1000);
                    value.date = ((new Date(value.date).getTime() - now) / 1000);
                }));
            });
        };
        return EventCtrl;
    }());
    EventCtrl.$inject = [
        '$http',
        '$scope',
        '$location',
        'BlogResource',
        '$stateParams',
        'MediaResource',
        'toastService',
        '$state',
        '_',
        'EventResource',
        'FighterResource'
    ];
    myApp.EventCtrl = EventCtrl;
    angular.module('myApp').controller('myApp.EventCtrl', EventCtrl);
})(myApp || (myApp = {}));

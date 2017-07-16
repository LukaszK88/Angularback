var myApp;
(function (myApp) {
    'use-strict';
    var GalleryCtrl = (function () {
        function GalleryCtrl($http, $scope, $rootScope, $location, BlogResource, $stateParams, Upload, media, Toast, $state, _) {
            var _this = this;
            this.$http = $http;
            this.$scope = $scope;
            this.$rootScope = $rootScope;
            this.$location = $location;
            this.BlogResource = BlogResource;
            this.$stateParams = $stateParams;
            this.Upload = Upload;
            this.media = media;
            this.Toast = Toast;
            this.$state = $state;
            this._ = _;
            this.posts = [];
            this.post = [];
            this.images = [];
            this.galleryImages = [];
            $scope.methods = {};
            this.BlogResource.post.query({ postId: $stateParams['postId'] }).$promise.then(function (response) {
                _this.post = response;
            });
            //Main gallery
            this.media.image.query().$promise.then(function (response) {
                _this.galleryImages = response;
            });
            this.media.image.getGalleryById({ postId: $stateParams['postId'] }).$promise.then(function (response) {
                _this.images = response;
            });
            $scope.conf = {
                thumbnails: true,
                thumbSize: 50,
                inline: false,
                bubbles: true,
                bubbleSize: 50,
                imgBubbles: true,
                bgClose: false,
                imgAnim: 'fadeup'
            };
        }
        GalleryCtrl.prototype.goBack = function () {
            this.$state.go("blogDetail", { postId: this.$stateParams['postId'] });
        };
        return GalleryCtrl;
    }());
    GalleryCtrl.$inject = [
        '$http',
        '$scope',
        '$rootScope',
        '$location',
        'BlogResource',
        '$stateParams',
        'Upload',
        'MediaResource',
        'toastService',
        '$state',
        '_'
    ];
    myApp.GalleryCtrl = GalleryCtrl;
    angular.module('myApp').controller('myApp.GalleryCtrl', GalleryCtrl);
})(myApp || (myApp = {}));

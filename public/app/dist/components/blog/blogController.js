var myApp;
(function (myApp) {
    'use-strict';
    var BlogCtrl = (function () {
        function BlogCtrl($http, $scope, $location, BlogResource, $stateParams, Upload, media, Toast, $state, _, config, commentResource, commentReplyResource) {
            var _this = this;
            this.$http = $http;
            this.$scope = $scope;
            this.$location = $location;
            this.BlogResource = BlogResource;
            this.$stateParams = $stateParams;
            this.Upload = Upload;
            this.media = media;
            this.Toast = Toast;
            this.$state = $state;
            this._ = _;
            this.config = config;
            this.commentResource = commentResource;
            this.commentReplyResource = commentReplyResource;
            this.posts = [];
            this.post = [];
            this.images = [];
            this.news = [];
            this.headers = [];
            this.tournaments = [];
            this.showEditComment = false;
            this.commentToEdit = [];
            this.showReply = false;
            this.showEditReply = false;
            this.replyToEdit = [];
            $scope.shareUrl = function (postId) {
                return config.basePath + 'post/' + postId;
            };
            //youtube player
            function onYouTubeIframeAPIReady() {
                this.player = new YT.Player('player', {
                    height: '390',
                    width: '640',
                    videoId: 'M7lc1UVf-VE',
                    events: {
                        'onReady': onPlayerReady,
                        'onStateChange': onPlayerStateChange
                    }
                });
            }
            // 4. The API will call this function when the video player is ready.
            function onPlayerReady(event) {
                event.target.playVideo();
            }
            // 5. The API calls this function when the player's state changes.
            //    The function indicates that when playing a video (state=1),
            //    the player should play for six seconds and then stop.
            var done = false;
            function onPlayerStateChange(event) {
                if (event.data == YT.PlayerState.PLAYING && !done) {
                    setTimeout(stopVideo, 6000);
                    done = true;
                }
            }
            function stopVideo() {
                this.player.stopVideo();
            }
            // end of YT player
            $scope.methods = {};
            this.currentState = $state.current.name;
            this.media.image.query({ postId: $stateParams['postId'] }).$promise.then(function (response) {
                _this.images = response;
            });
            if ($stateParams['categoryId']) {
                this.BlogResource.post.getByType({ type: this.$stateParams['categoryId'] }).$promise.then(function (response) {
                    _this.posts = response;
                });
            }
            if ($state.current.name == 'index') {
                //For front page, maybe we can change to pull trough one call
                this.BlogResource.post.getByType({ type: 'news' }).$promise.then(function (response) {
                    _this.news = response;
                });
                this.BlogResource.post.getByType({ type: 'header' }).$promise.then(function (response) {
                    _this.headers = response;
                });
                //-----
            }
            if ($stateParams['postId']) {
                this.fetchPost();
            }
            $scope.conf = {
                thumbnails: true,
                thumbSize: 150,
                inline: false,
                bubbles: true,
                bubbleSize: 50,
                imgBubbles: true,
                bgClose: false,
                imgAnim: 'fadeup'
            };
            $scope.openGallery = function () {
                $scope.methods.open();
            };
            // Similar to above function
            $scope.closeGallery = function () {
                $scope.methods.close();
            };
            $scope.nextImg = function () {
                $scope.methods.next();
            };
            $scope.prevImg = function () {
                $scope.methods.prev();
            };
        }
        BlogCtrl.prototype.fetchPost = function () {
            var _this = this;
            this.BlogResource.post.get({ postId: this.$stateParams['postId'] }).$promise.then(function (response) {
                _this.post = response;
            });
        };
        BlogCtrl.prototype.editComment = function (comment) {
            this.showEditComment ? this.showEditComment = false : this.showEditComment = true;
            this.commentToEdit = comment;
        };
        BlogCtrl.prototype.editReply = function (reply) {
            this.showEditReply ? this.showEditReply = false : this.showEditReply = true;
            this.replyToEdit = reply;
        };
        BlogCtrl.prototype.updateComment = function (comment) {
            var _this = this;
            this.commentResource.update({ commentId: comment.id }, comment).$promise.then(function (response) {
                _this.showEditComment = false;
                _this.commentToEdit.id = null;
                _this.fetchPost();
                _this.Toast.makeToast('success', response.message);
            });
        };
        BlogCtrl.prototype.updateReply = function (reply) {
            var _this = this;
            this.commentReplyResource.update({ replyId: reply.id }, reply).$promise.then(function (response) {
                _this.showEditReply = false;
                _this.replyToEdit.id = null;
                _this.fetchPost();
                _this.Toast.makeToast('success', response.message);
            });
        };
        BlogCtrl.prototype.addReply = function (reply, comment) {
            var _this = this;
            reply.comment_id = comment.id;
            reply.user_id = this.$scope.currentUser.id;
            console.log(reply);
            this.commentReplyResource.save(reply).$promise.then(function (response) {
                _this.fetchPost();
                _this.Toast.makeToast('success', response.message);
            });
        };
        BlogCtrl.prototype.deleteReply = function (reply) {
            var _this = this;
            console.log(reply);
            this.commentReplyResource["delete"]({ replyId: reply.id }).$promise.then(function (response) {
                _this.fetchPost();
                _this.Toast.makeToast('error', response.message);
            });
        };
        BlogCtrl.prototype.addComment = function (comment, post) {
            var _this = this;
            comment.post_id = post.id;
            comment.user_id = this.$scope.currentUser.id;
            console.log(comment);
            this.commentResource.save(comment).$promise.then(function (response) {
                _this.fetchPost();
                _this.Toast.makeToast('success', response.message);
            });
        };
        BlogCtrl.prototype.deleteComment = function (comment) {
            var _this = this;
            this.commentResource["delete"]({ commentId: comment.id }).$promise.then(function (response) {
                _this.fetchPost();
                _this.Toast.makeToast('error', response.message);
            });
        };
        BlogCtrl.prototype.goBack = function () {
            this.$state.go("blog");
        };
        return BlogCtrl;
    }());
    BlogCtrl.$inject = [
        '$http',
        '$scope',
        '$location',
        'BlogResource',
        '$stateParams',
        'Upload',
        'MediaResource',
        'toastService',
        '$state',
        '_',
        'config',
        'CommentResource',
        'CommentReplyResource'
    ];
    myApp.BlogCtrl = BlogCtrl;
    angular.module('myApp').controller('myApp.BlogCtrl', BlogCtrl);
})(myApp || (myApp = {}));

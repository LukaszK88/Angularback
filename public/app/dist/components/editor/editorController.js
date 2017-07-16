var myApp;
(function (myApp) {
    'use-strict';
    var EditorCtrl = (function () {
        function EditorCtrl($http, $scope, $location, $stateParams, Upload, Toast, _, types, blog, config, $state, media, $q, $timeout, eventResource, $filter, eventNotes) {
            //$scope.category = config.editorsDefault.categories;
            var _this = this;
            this.$http = $http;
            this.$scope = $scope;
            this.$location = $location;
            this.$stateParams = $stateParams;
            this.Upload = Upload;
            this.Toast = Toast;
            this._ = _;
            this.types = types;
            this.blog = blog;
            this.config = config;
            this.$state = $state;
            this.media = media;
            this.$q = $q;
            this.$timeout = $timeout;
            this.eventResource = eventResource;
            this.$filter = $filter;
            this.eventNotes = eventNotes;
            this.postTypes = [];
            this.eventTypes = [];
            this.posts = [];
            this.postToEdit = [];
            this.postEdit = false;
            this.galleries = [];
            this.galleryEdit = false;
            this.galleryToEdit = [];
            this.uploadMore = false;
            this.categories = [];
            this.eventToEdit = [];
            this.events = [];
            this.noteToEdit = [];
            $scope.files = [];
            $scope.photo = [];
            $scope.video = {};
            $scope.selected = {};
            this.types.query().$promise.then(function (response) {
                _this.postTypes = response;
            });
            $scope.$watch('active', function (newVal) {
                if (newVal === 1) {
                    _this.activeTab = 1;
                }
                else if (newVal === 2) {
                    _this.activeTab = 2;
                }
                else if (newVal === 3) {
                    _this.activeTab = 3;
                    _this.fetchGalleries();
                }
                else if (newVal === 4) {
                    _this.activeTab = 4;
                    _this.eventResource.getTypes().$promise.then(function (response) {
                        _this.eventTypes = response;
                    });
                }
                else if (newVal === 5) {
                    _this.activeTab = 5;
                    _this.eventResource.getTypes().$promise.then(function (response) {
                        _this.eventTypes = response;
                    });
                    _this.fetchEvents();
                }
                else {
                    _this.activeTab = 0;
                }
            });
            $scope.date = {
                opened: false
            };
            $scope.dateOptions = {};
            $scope.format = 'dd-MMMM-yyyy';
            $scope.date = function () {
                $scope.date.opened = true;
            };
        }
        EditorCtrl.prototype.remove = function (where, what) {
            var index = where.indexOf(what);
            where.splice(index, 1);
        };
        // todo edit types
        // public editPostType(type){
        //     console.log(type);
        //     this.showPostTypeToBeEdited = true;
        // }
        EditorCtrl.prototype.deletePostType = function (type) {
            var _this = this;
            this.types["delete"]({ typeId: type }).$promise.then(function (response) {
                angular.forEach(_this.postTypes, function (value, key) {
                    if (value.id == type) {
                        _this.remove(_this.postTypes, value);
                    }
                });
                _this.Toast.makeToast('error', 'Category Deleted');
            })["catch"](function () {
                _this.Toast.makeToast('error', 'Most probably there are Active Posts with this category');
            });
        };
        EditorCtrl.prototype.addPostType = function (type) {
            var _this = this;
            this.hideAddPostType = false;
            this.types.save(type).$promise.then(function (response) {
                _this.postTypes.push(response);
                _this.Toast.makeToast('success', 'Post Type Added');
            });
        };
        EditorCtrl.prototype.fetchEvents = function () {
            var _this = this;
            this.eventResource.query().$promise.then(function (response) {
                _this.events = response;
            });
        };
        EditorCtrl.prototype.uploadMoreImages = function (gallery) {
            var _this = this;
            this.postId = gallery.id;
            this.uploadGalleryPhotos();
            this.uploadMore = false;
            //fetch single gallery and clear selected photos
            this.$scope.files = [];
            //need to ait for upload
            this.$timeout(function () {
                _this.blog.post.get({ postId: _this.postId }).$promise.then(function (response) {
                    _this.Toast.makeToast('success', 'Photos Uploaded');
                    _this.galleryToEdit = response;
                });
            }, 1500);
        };
        EditorCtrl.prototype.deleteGallery = function (gallery) {
            var _this = this;
            this.media.image.deleteGallery({ postId: gallery.id }).$promise.then(function (response) {
                _this.Toast.makeToast('error', 'Gallery deleted');
                var index = _this.galleries.indexOf(gallery);
                _this.galleries.splice(index, 1);
            });
        };
        EditorCtrl.prototype.deleteImg = function (img) {
            var _this = this;
            this.media.image["delete"]({ postId: img.id }).$promise.then(function (response) {
                _this.Toast.makeToast('error', 'Photo deleted');
                var index = _this.galleryToEdit.image.indexOf(img);
                _this.galleryToEdit.image.splice(index, 1);
            });
        };
        EditorCtrl.prototype.deleteEvent = function (event) {
            var _this = this;
            this.eventResource["delete"]({ eventId: event.id }).$promise.then(function (response) {
                _this.Toast.makeToast('error', 'Event deleted');
                var index = _this.events.indexOf(event);
                _this.events.splice(index, 1);
            });
        };
        EditorCtrl.prototype.updateEvent = function (eventToEdit) {
            var _this = this;
            eventToEdit.categories = this.$scope.selected;
            this.eventResource.update({ eventId: eventToEdit.id }, eventToEdit).$promise.then(function (response) {
                //TODO flexible method
                if (_this.$scope.photo) {
                    console.log('photo');
                    _this.Upload.upload({
                        url: _this.config.API + 'images/event/' + eventToEdit.id + '/' + 1,
                        data: {
                            file: _this.$scope.photo
                        }
                    });
                }
                _this.Toast.makeToast('success', 'Event updated');
                _this.$state.reload();
            });
        };
        EditorCtrl.prototype.editEvent = function (event) {
            var array = {};
            angular.forEach(event.category, function (value, key) {
                array[value.name] = true;
            });
            this.$scope.selected = array;
            this.eventEdit = true;
            this.eventToEdit = event;
        };
        EditorCtrl.prototype.editGallery = function (gallery) {
            this.galleryEdit = true;
            this.galleryToEdit = gallery;
        };
        EditorCtrl.prototype.fetchGalleries = function () {
            var _this = this;
            this.media.image.query().$promise.then(function (response) {
                _this.galleries = response;
            });
        };
        EditorCtrl.prototype.update = function (post) {
            var _this = this;
            if (post) {
                post.post_type = this.post.post_type;
                //make video
                var video = {};
                video.url = post.video_url;
                this.uploadHeaderVideo(post, video);
                this.blog.post.update({ postId: post.id }, post).$promise.then(function (response) {
                    _this.Toast.makeToast('success', 'Post updated');
                    _this.postEdit = false;
                    _this.post.post_type = post.post_type;
                    _this.fetchPosts(post.post_type);
                });
            }
        };
        EditorCtrl.prototype.editPost = function (post) {
            console.log(post);
            this.postEdit = true;
            this.postToEdit = post;
        };
        EditorCtrl.prototype.deletePost = function (post) {
            var _this = this;
            this.blog.post["delete"]({ postId: post.id }).$promise.then(function (response) {
                _this.Toast.makeToast('error', 'Post deleted');
                var index = _this.posts.indexOf(post);
                _this.posts.splice(index, 1);
            });
        };
        EditorCtrl.prototype.fetchPosts = function (type) {
            var _this = this;
            if (this.activeTab === 2) {
                this.blog.post.getByType({ type: type }).$promise.then(function (response) {
                    _this.posts = response;
                });
            }
        };
        EditorCtrl.prototype.addEventData = function (eventData) {
            var _this = this;
            eventData.date = this.$filter('date')(eventData.date, 'yyyy-MM-dd');
            eventData.user_id = this.$scope.currentUser.id;
            //add categories
            eventData.categories = this.$scope.selected;
            return this.eventResource.save(eventData).$promise.then(function (response) {
                _this.Toast.makeToast('success', 'Event added');
                return response;
            });
        };
        EditorCtrl.prototype.updateNote = function (note) {
            var _this = this;
            this.eventNotes.update({ noteId: note.id }, note).$promise.then(function (response) {
                _this.Toast.makeToast('success', 'Note updated');
            });
        };
        EditorCtrl.prototype.editNote = function (note) {
            this.showNoteToEdit = true;
            this.noteToEdit = note;
        };
        EditorCtrl.prototype.deleteNote = function (note) {
            var _this = this;
            this.eventNotes["delete"]({ noteId: note.id }).$promise.then(function (response) {
                _this.Toast.makeToast('error', 'Note deleted');
                var index = _this.eventToEdit.note.indexOf(note);
                _this.eventToEdit.note.splice(index, 1);
            });
        };
        EditorCtrl.prototype.addNote = function (note, event) {
            var _this = this;
            note.event_id = event.id;
            note.user_id = this.$scope.currentUser.id;
            this.eventNotes.save(note).$promise.then(function (response) {
                _this.Toast.makeToast('success', 'Note added');
                if (_this.eventToEdit) {
                    //add note to note array
                    event.note.push(response);
                }
            });
        };
        EditorCtrl.prototype.submitEvent = function (eventData, note) {
            var _this = this;
            if (eventData) {
                this.addEventData(eventData).then(function (response) {
                    if (note) {
                        _this.addNote(note, response);
                    }
                    _this.uploadHeaderPhoto('event', response.id);
                    _this.$state.reload();
                });
            }
        };
        EditorCtrl.prototype.submit = function (post) {
            var _this = this;
            if (post) {
                post.user_id = this.$scope.currentUser.id;
                if (this.activeTab === 1) {
                    post.gallery = 1;
                    post.post_type = 2;
                }
                this.blog.post.save(post).$promise.then(function (response) {
                    _this.postId = response.id;
                    if (_this.activeTab === 1) {
                        _this.uploadGalleryPhotos();
                        _this.Toast.makeToast('success', 'Gallery added');
                        _this.$state.reload();
                    }
                    else {
                        _this.uploadHeaderVideo(response, _this.$scope.video);
                        _this.uploadHeaderPhoto('post', response.id);
                        _this.uploadGalleryPhotos();
                        console.log('submit test');
                        _this.Toast.makeToast('success', 'Post added');
                        _this.$state.reload();
                    }
                });
            }
        };
        EditorCtrl.prototype.uploadHeaderVideo = function (post, videoUrl) {
            if (this.$scope.video) {
                var video = {};
                video.user_id = this.$scope.currentUser.id;
                video.post_id = post.id;
                video.video_type_id = 1;
                video.url = videoUrl.url;
                console.log(video);
                this.media.video.save(video).$promise.then(function (response) {
                    console.log(response);
                });
            }
        };
        //todo can be one method for all
        EditorCtrl.prototype.uploadHeaderPhoto = function (where, whatId) {
            console.log(whatId);
            console.log(where);
            if (this.$scope.photo) {
                console.log('test');
                this.Upload.upload({
                    url: this.config.API + 'images/' + where + '/' + whatId + '/' + 1,
                    data: {
                        file: this.$scope.photo
                    }
                });
            }
        };
        EditorCtrl.prototype.uploadGalleryPhotos = function () {
            var _this = this;
            if (this.$scope.files) {
                this._.forEach(this.$scope.files['photos'], (function (value, key) {
                    _this.Upload.upload({
                        url: _this.config.API + 'images/post/' + _this.postId + '/' + 2,
                        data: {
                            file: value
                        }
                    });
                }));
            }
        };
        return EditorCtrl;
    }());
    EditorCtrl.$inject = [
        '$http',
        '$scope',
        '$location',
        '$stateParams',
        'Upload',
        'toastService',
        '_',
        'PostTypeResource',
        'BlogResource',
        'config',
        '$state',
        'MediaResource',
        '$q',
        '$timeout',
        'EventResource',
        '$filter',
        'EventNotesResource'
    ];
    myApp.EditorCtrl = EditorCtrl;
    angular.module('myApp').controller('myApp.EditorCtrl', EditorCtrl);
})(myApp || (myApp = {}));

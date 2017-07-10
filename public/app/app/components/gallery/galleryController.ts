
module myApp{

    'use-strict';

    export class GalleryCtrl {
            static $inject =[
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

            protected posts:any = [];
            post:any = [];
            images:any = [];
            galleryImages:any = [];
            headerImage:any;

        constructor(public $http:ng.IHttpService,
                        public $scope:ng.IScope,
                        protected $rootScope:any,
                        public $location:any,
                        protected BlogResource:any,
                        protected $stateParams:any,
                        public Upload:any,
                    protected media:any,
                    protected Toast:any,
                    protected $state:any,
                    protected _:any
        ){
            $scope.methods = {};


            this.BlogResource.post.query({ postId:$stateParams['postId']}).$promise.then((response)=>{
                this.post = response;
            });

            //Main gallery
            this.media.image.query().$promise.then((response)=>{
                this.galleryImages = response;
            });

            this.media.image.getGalleryById({postId:$stateParams['postId']}).$promise.then((response)=>{
                this.images = response;
            });

            $scope.conf = {
                thumbnails 	: 	true,
                thumbSize		: 	50,
                inline		: 	false,
                bubbles		: 	true,
                bubbleSize		: 	50,
                imgBubbles 	: 	true,
                bgClose		: 	false,
                imgAnim 		: 	'fadeup'
            };


        }

        public goBack(){

            this.$state.go("blogDetail",{postId: this.$stateParams['postId']});

        }

    }

      angular.module('myApp').controller('myApp.GalleryCtrl', GalleryCtrl);
}




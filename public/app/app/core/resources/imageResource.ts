/**
 * Created by lukas on 20/05/17.
 */
module myApp {

    'use strict';

    MediaResource.$inject = [
        '$resource',
        'config'
    ];

    function MediaResource(
        $resource:any,
        config:any
    ){

        return {


            image:$resource(config.API + 'images/:postId/:userId',
            {
                postId: '@postId',
                userId: '@userId'
            },
            {
                getGalleryById: {
                    method: 'GET',
                    isArray: true,
                    url: config.API + 'images/gallery/:postId',

                },
                deleteGallery: {
                    method: 'POST',
                    url: config.API + 'images/gallery/delete/:postId',
                }


            }),
            video:$resource(config.API + 'video/:postId/:userId',
                {
                    postId: '@postId',
                    userId: '@userId'
                },
                {

                })
        }
    }

    angular.module('myApp')
        .factory('MediaResource', MediaResource);

}

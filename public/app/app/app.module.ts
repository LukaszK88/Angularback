/// <reference path="_all.ts" />
/// <reference path="app.config.ts" />
/// <reference path="filters/abs.ts" />
module myApp{
    "use strict";
    angular
        .module("myApp", [
            "ngRoute",
            "ui.router",
            'ngResource',
            'ngMessages',
            'ngSanitize',
            'ngTouch',
            'ngFlag',
            'validation.match',
            'ngAnimate',
            'satellizer',
            'ngMaterial',
            'ngFileUpload',
            'ngImgCrop',
            //Internal
            'myApp.ranking',
            'textCollapse',
            'thatisuday.ng-image-gallery',
            'FBAngular',
            'angularSuperGallery',
            'angularTrix',
            'ui.bootstrap',
            'timer',
            'videosharing-embed',
            '720kb.socialshare',
            'ui.calendar'

        ])
        .constant('_', window._)
        .constant('config',{
            // local
            // API : 'http://whitecompany.com/api/',
            // basePath: 'http://whitecompany.com/'
            // production
            API : 'http://www.whitecompanymedieval.com/api/',
            basePath: 'http://www.whitecompanymedieval.com/'
            // editorsDefault : {
            //     categories: {
            //         1 : false,
            //         2 : false,
            //         3 : false
            //     }
            // }
        });
}

/// <reference path="_all.ts" />
/// <reference path="components/ranking/tableAllController.ts" />
angular.module('myApp')
.config(['$stateProvider', '$locationProvider', '$authProvider','config',
    function routes($stateProvider: any,
                    $locationProvider: ng.ILocationProvider,
                    $authProvider: any,
                    config:any

    ) {
        $authProvider.facebook({
                clientId: '1884018281856728'
            });

            $authProvider.google({
                clientId: '230761834733-cn34419a1ftkee8lgha90ija7nvckks6.apps.googleusercontent.com'
            });

            $authProvider.baseUrl = '/';
            $authProvider.loginUrl = config.API +'user/authenticate';
            $authProvider.signupUrl = config.API +'user/store';
            $authProvider.tokenPrefix = '';
            $authProvider.tokenName = 'token';
            $authProvider.storageType = 'localStorage';


            // Facebook
            $authProvider.facebook({
                name: 'facebook',
                url: config.API +'login/facebook',
                authorizationEndpoint: 'https://www.facebook.com/v2.5/dialog/oauth',
                redirectUri: window.location.origin + '/',
                requiredUrlParams: ['display', 'scope'],
                scope: ['email'],
                scopeDelimiter: ',',
                display: 'popup',
                oauthType: '2.0',
                popupOptions: { width: 580, height: 400 }
            });

            // Google
            $authProvider.google({
                url: config.API +'login/google',
                authorizationEndpoint: 'https://accounts.google.com/o/oauth2/auth',
                redirectUri: window.location.origin,
                requiredUrlParams: ['scope'],
                optionalUrlParams: ['display'],
                scope: ['profile', 'email'],
                scopePrefix: 'openid',
                scopeDelimiter: ' ',
                display: 'popup',
                oauthType: '2.0',
                popupOptions: { width: 452, height: 633 }
            });
        $locationProvider.html5Mode(true);

        $stateProvider
            .state('index', <any>{
            url: "/",
           templateUrl:'app/app/templates/home/home.template.html'
            })
            .state("about", <any>{
            url: "/about",
            templateUrl:'app/app/templates/about.template.html'
            })
            .state("other", <any>{
                url: "/other",
                templateUrl:'app/app/templates/other.template.html',
                controller: 'myApp.ToolsCtrl',
                controllerAs: 'tools'
            })
            .state("ranking", <any>{
                url: "/ranking",
                templateUrl:'app/app/components/ranking/ranking.html',
                controller: 'myApp.ranking.TableAllController',
                controllerAs: 'ranking'
            })
            .state("fighterDetail", <any>{
                url: "/fighters/:fighterId",
                templateUrl:'app/app/components/fighter/fighterDetail.template.html'
            })
            .state("fighterPage", <any>{
                url: "/fighter/page/:fighterId",
                templateUrl:'app/app/components/fighter/fighterPage.template.html'
            })
            .state("blog", <any>{
                url: "/blog/:categoryId",
                templateUrl:'app/app/components/blog/blogPage.template.html'
            })
            .state("postDetail", <any>{
                url: "/post/:postId",
                templateUrl:'app/app/components/blog/blogDetailPage.template.html'
            })
            .state("galleryDetail", <any>{
                url: "/gallery/:postId",
                templateUrl:'app/app/components/gallery/galleryDetailPage.template.html'
            })
            .state("gallery", <any>{
                url: "/gallery",
                templateUrl:'app/app/components/gallery/galleryPage.template.html'
            })
            .state("tournaments", <any>{
                url: "/tournaments/:eventAttendId",
                templateUrl:'app/app/components/events/tournaments.template.html',
                params: {
                    eventAttendId: {value: null, squash: true}
                }
            })
            // .state("training", <any>{
            //     url: "/training/:postId",
            //     templateUrl:'app/components/events/tournaments.template.html',
            //     params: {
            //         eventAttendId: {value: null, squash: true}
            //     }
            // })
            .state("tournament", <any>{
                url: "/tournament/:tournamentId",
                templateUrl:'app/app/components/events/tournamentDetailPage.template.html'
            })
            .state("adminPage", <any>{
                url: "/admin",
                templateUrl:'app/app/components/admin/adminPage.template.html',
                controller: 'myApp.AdminCtrl',
                controllerAs: 'adminCtrl'
            })
            .state("editorPage", <any>{
                url: "/editor",
                templateUrl:'app/app/components/editor/editorPage.template.html',
                controller: 'myApp.EditorCtrl',
                controllerAs: 'editorCtrl'
            })
            .state("register", {
                url: "/register",
                templateUrl:'app/app/templates/register.template.html',
                controller: 'myApp.SignupCtrl'
            }).
            state("recovery", <any>{
                url: "/recovery",
                    templateUrl:'app/app/templates/recovery.template.html'
                });

    }
]);

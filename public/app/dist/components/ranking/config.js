// angular.module('myApp.ranking')
//     .config(config);
//
// config.$inject = [
//     '$locationProvider',
//     '$stateProvider',
//     '$urlRouterProvider'
// ];
//
// function config($locationProvider: ng.ILocationProvider,
//                 $stateProvider: angular.ui.IStateProvider,
//                 $urlRouterProvider: angular.ui.IUrlRouterProvider) {
//
//     //html5 removes the need for # in URL
//     $locationProvider.html5Mode({
//         enabled: true,
//         requireBase: false
//     });
//
//     $urlRouterProvider.otherwise('/');
//
//     //angular-ui-router for multiple views
//     $stateProvider
//         .state('index', <ng.ui.IState>{
//             url: "/ranking/all",
//             views: {
//                 "viewA": {
//                     templateUrl: "app/components/ranking/tableAll.template.html"
//                 },
//                 "viewB": {
//                     templateUrl: "app/home/home.html"
//                 }
//             }
//         });
//     //more states here.
// }

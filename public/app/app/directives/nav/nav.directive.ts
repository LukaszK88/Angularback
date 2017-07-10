module myApp {
    'use strict';
    export function navBar() {
        var directive = {
            restrict: 'EA',
            link: linkFunc,
            replace: true,
            templateUrl: 'app/app/directives/nav/nav.template.html',
        };

        function linkFunc(scope, element, attrs) {
        };
        return directive;
    };
    angular.module('myApp').directive('navBar', navBar);
}

// angular.module('myApp').
//     directive('navBar', function(){
//         return{
//             restrict: 'E',
//             templateUrl: 'app/directives/nav/nav.template.html',
//             link: function(scope, element, attr){
//
//
//             }
//         }
// });
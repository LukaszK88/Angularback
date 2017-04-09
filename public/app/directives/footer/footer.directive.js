'use strict';

angular.module('footer').
    directive('footer', function(){
        return{
            restrict: 'E',
            templateUrl: 'app/directives/footer/footer.template.html',
            link: function(scope, element, attr){
              
            }
        }
});
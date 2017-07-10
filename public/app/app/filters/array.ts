/**
 * Created by lukas on 08/04/17.
 */
'use strict';
module myApp {
    angular.module('myApp').filter('arrayHelper', function () {

        return function (category:any, type:string) {
            var sum = 0;
            for (var x in category) {
                sum += category[x][type];
            }
            return sum;
        }

    });
}
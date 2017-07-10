/**
 * Created by lukas on 09/04/17.
 */
module myApp{

    angular.module('myApp').
    filter('abs', function () {
        return function(val:number)
        {
            return Math.abs(val);

        }
    });

}


var myApp;
(function (myApp) {
    var ranking;
    (function (ranking) {
        var TableBohurtController = (function () {
            function TableBohurtController($http, $scope) {
                this.$http = $http;
                this.$scope = $scope;
                this.$http.get("http://127.0.0.1:8000/api/fighters/bohurt/")
                    .then(function (response) {
                    $scope.fighters = response.data.fighters;
                });
            }
            return TableBohurtController;
        }());
        TableBohurtController.$inject = [
            '$http',
            '$scope'
        ];
        ranking.TableBohurtController = TableBohurtController;
        angular.module('myApp.ranking').controller('myApp.ranking.TableBohurtController', TableBohurtController);
    })(ranking = myApp.ranking || (myApp.ranking = {}));
})(myApp || (myApp = {}));

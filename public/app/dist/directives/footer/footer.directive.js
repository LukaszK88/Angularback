var myApp;
(function (myApp) {
    'use strict';
    var Footer = (function () {
        function Footer() {
            this.templateUrl = 'app/app/directives/footer/footer.template.html';
            this.scope = {};
            // It's important to add `link` to the prototype or you will end up with state issues.
            // See http://blog.aaronholmes.net/writing-angularjs-directives-as-typescript-classes/#comment-2111298002 for more information.
            Footer.prototype.link = function (scope, element, attrs) {
                /*handle all your linking requirements here*/
            };
        }
        Footer.Factory = function () {
            var directive = function () {
                return new Footer();
            };
            directive.$inject = [];
            return directive;
        };
        return Footer;
    }());
    myApp.Footer = Footer;
    angular.module('myApp')
        .directive('footer', Footer.Factory());
})(myApp || (myApp = {}));

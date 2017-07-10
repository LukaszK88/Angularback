module myApp{
    'use strict';

   export class Footer
    {
        public link: (scope: ng.IScope, element: ng.IAugmentedJQuery, attrs: ng.IAttributes) => void;
        public templateUrl = 'app/app/directives/footer/footer.template.html';
        public scope = {};

        constructor(/*list of dependencies*/)
        {
            // It's important to add `link` to the prototype or you will end up with state issues.
            // See http://blog.aaronholmes.net/writing-angularjs-directives-as-typescript-classes/#comment-2111298002 for more information.
            Footer.prototype.link = (scope: ng.IScope, element: ng.IAugmentedJQuery, attrs: ng.IAttributes) =>
            {
                /*handle all your linking requirements here*/
            };
        }

        public static Factory()
        {
            var directive = (/*list of dependencies*/) =>
            {
                return new Footer(/*list of dependencies*/);
            };

            directive.$inject = [];

            return directive;
        }
    }

    angular.module('myApp')
        .directive('footer', Footer.Factory());
}


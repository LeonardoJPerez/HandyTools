(function () {
    "use strict";

    angular
        .module("handytoolsApp")
        .directive("loginDialogDirective", function (APPSETTINGS) {
            return {
                restrict: "A",
                template: "<div ng-if=\"visible\" ng-include=\"loginView.html\">",
                link: function (scope) {
                    var showDialog = function () {
                        scope.visible = true;
                    };

                    scope.visible = false;

                    scope.$on(APPSETTINGS.AUTH_EVENTS.NotAuthenticated, showDialog);
                    scope.$on(APPSETTINGS.AUTH_EVENTS.SessionTimeout, showDialog);
                }
            };
        });
}());
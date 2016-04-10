(function () {
    "use strict";

    angular
        .module("handytoolsApp")
        .directive("loginDialogDirective", function (APPSETTINGS) {
            return {
                restrict: "A",
                template: "<div ng-if=\"visible\" ng-include=\"'app/login/loginView.html'\">",
                link: function (scope) {
                    scope.visible = true;
                }
            };
        });
}());
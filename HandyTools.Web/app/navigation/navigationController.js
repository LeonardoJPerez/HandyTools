(function () {
    "use strict";

    angular
        .module("handytoolsApp")
        .controller("navigationController", ["$rootscope", "$scope", "USER_ROLES", "handy.authService", navigationController]);

    function navigationController($rootscope, $scope, USER_ROLES, authService) {       

        $scope.userRoles = USER_ROLES;
        $scope.isAuthorized = authService.isAuthorized;
        $scope.logoff = authService.logoff;
    }
}());
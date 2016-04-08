(function () {
    "use strict";

    angular
        .module("handytoolsApp")
        .controller("mainController", ["$scope", "$location", "USER_ROLES", "handy.authService", mainController]);

    function mainController($scope, $location, USER_ROLES, authService) {
        $scope.userRoles = USER_ROLES;
        $scope.isAuthorized = authService.isAuthorized;
        $scope.isAuthenticated = authService.isAuthenticated;
        $scope.getCurrentUser = authService.getCurrentUser;

        $scope.showLogin = function () {
            return !authService.isAuthenticated() && $location.path() === "/";
        };
    }
}());
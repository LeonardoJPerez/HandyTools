(function () {
    "use strict";

    angular
        .module("handytoolsApp")
        .controller("mainController", ["$scope", "$location", "handy.session", "USER_ROLES", "handy.authService", mainController]);

    function mainController($scope, $location, session, USER_ROLES, authService) {
        $scope.currentUser = null;
        $scope.userRoles = USER_ROLES;
        $scope.isAuthorized = authService.isAuthorized;
        $scope.isAuthenticated = authService.isAuthenticated;

        $scope.showLogin = function () {
            return !authService.isAuthenticated() && $location.path() === "/";
        };

        $scope.setCurrentUser = function (user) {
            $scope.currentUser = user;
        };

        $scope.getCurrentUser = function () {
            return {
                username: session.userId,
                role: session.userRole
            };
        };
    }
}());
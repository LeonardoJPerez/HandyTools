(function () {
    "use strict";

    angular
        .module("handytoolsApp")
        .controller("mainController", ["$scope", "USER_ROLES", "handy.authService", mainController]);

    function mainController($scope, USER_ROLES, authService) {
        $scope.currentUser = null;
        $scope.userRoles = USER_ROLES;
        $scope.isAuthorized = authService.isAuthorized;
        $scope.isAuthenticated = authService.isAuthenticated;

        $scope.setCurrentUser = function (user) {
            $scope.currentUser = user;
        };
    }
}());   
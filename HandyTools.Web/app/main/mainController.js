(function () {
    "use strict";

    angular
        .module("handytoolsApp")
        .controller("mainController", ["$scope", "$location", "APPSETTINGS", "USER_ROLES", "handy.authService", mainController]);

    function mainController($scope, $location, APPSETTINGS, USER_ROLES, authService) {
        var vm = this;

        vm.userRoles = USER_ROLES;
        vm.isAuthorized = authService.isAuthorized();
        vm.isAuthenticated = authService.isAuthenticated();

        vm.showLogin = function () {
            return !authService.isAuthenticated() && $location.path() === "/";
        };

        $scope.getCurrentUser = authService.getCurrentUser;

        $scope.$on(APPSETTINGS.AUTH_EVENTS.LoginSuccess, function (event, data) {
            vm.currentUser = authService.getCurrentUser();
            vm.isAuthenticated = authService.isAuthenticated();
        });

        $scope.$on(APPSETTINGS.AUTH_EVENTS.LogoutSuccess, function (event, data) {
            vm.isAuthorized = false;
            vm.isAuthenticated = false;
        });
    }
}());
(function () {
    "use strict";

    angular
        .module("handytoolsApp")
        .controller("mainController", ["$route", "$scope", "USER_ROLES", "handy.authService", mainController]);

    function mainController($route, $scope, USER_ROLES, authService) {
        var vm = this;

        vm.currentUser = null;
        vm.userRoles = USER_ROLES;
        vm.isAuthorized = authService.isAuthorized;

        vm.setCurrentUser = function (user) {
            vm.currentUser = user;
        };
    }
}());
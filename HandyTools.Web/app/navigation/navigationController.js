(function () {
    "use strict";

    angular
        .module("handytoolsApp")
        .controller("navigationController", ["$route", "$scope", "USER_ROLES", "handy.authService", navigationController]);

    function navigationController($route, $scope, USER_ROLES, authService) {
        var vm = this;

        vm.userRoles = USER_ROLES;
        vm.isAuthorized = authService.isAuthorized;
        vm.logoff = authService.logoff;

        //vm.logout = function () {
        //    if (currentUser.getProfile().isLoggedIn) {
        //        currentUser.clearUserSession();
        //    }
        //}
    }
}());
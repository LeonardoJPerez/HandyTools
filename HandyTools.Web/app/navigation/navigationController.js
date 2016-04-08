(function () {
    "use strict";

    angular
        .module("handytoolsApp")
        .controller("navigationController", ["$rootScope", "$scope", "APPSETTINGS", "USER_ROLES", "handy.authService", navigationController]);

    function navigationController($rootScope, $scope, APPSETTINGS, USER_ROLES, authService) {
        var vm = this;

        vm.currentUser = authService.getCurrentUser();
        vm.currentRole = vm.currentUser.userRole;
        vm.userRoles = USER_ROLES;

        vm.isAuthorized = authService.isAuthorized;

        vm.logoff = function () {
            authService.logoff(function (user) {
                authService.redirectTo(user.userRole);
                $rootScope.$broadcast(APPSETTINGS.AUTH_EVENTS.LogoutSuccess);
            });
        }
    };
}());
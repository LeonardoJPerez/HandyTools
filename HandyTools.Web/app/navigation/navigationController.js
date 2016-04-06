(function () {
    "use strict";

    angular
        .module("handytoolsApp")
        .controller("navigationController", ["$rootScope", "$scope", "APPSETTINGS", "USER_ROLES", "handy.authService", navigationController]);

    function navigationController($rootScope, $scope, APPSETTINGS, USER_ROLES, authService) {
        var vm = this;

        vm.currentUser = $scope.getCurrentUser();
        vm.currentRole = $scope.getCurrentUser().role;
        vm.userRoles = USER_ROLES;
        vm.isAuthorized = authService.isAuthorized;
        vm.logoff = function () {
            authService.logoff(function (user) {
                $rootScope.$broadcast(APPSETTINGS.AUTH_EVENTS.LogoutSuccess);
                $scope.setCurrentUser(user);

                authService.redirectTo(user.role);
            });
        }
    };
}());
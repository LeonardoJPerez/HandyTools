(function () {
    "use strict";

    angular
        .module("handytoolsApp")
        .controller("navigationController", ["$route", "$scope", "handy.api", "currentUser", navigationController]);

    function navigationController($route, $scope, handyApi, currentUser) {
        var vm = this;

        vm.loggedIn = currentUser.getProfile().isLoggedIn;
        vm.activeMenu = getActiveMenu() === "customer";

        function getActiveMenu() {
            console.log(currentUser.getProfile().userType);
            return currentUser.getProfile().userType;
        };

        vm.logout = function () {
            if (currentUser.getProfile().isLoggedIn) {
                currentUser.clearUserSession();
            }
        }
    }
}());
(function () {
    "use strict";

    angular
        .module("handytoolsApp")
        .controller("mainController", ["$route", "$scope", "handy.api", "currentUser", mainController]);

    function mainController($route, $scope, handyApi, currentUser) {
        var vm = this;

        vm.loggedIn = currentUser.getProfile().isLoggedIn;
        console.log(vm.loggedIn);
    }
}());
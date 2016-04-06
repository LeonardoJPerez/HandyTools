(function () {
    "use strict";

    angular
        .module("handytoolsApp")
        .controller("reservationCreateController", ["$rootScope", "$scope", "APPSETTINGS", "handy.api", reservationCreateController]);

    function reservationCreateController($rootScope, $scope, APPSETTINGS, handyApi, $uibModalInstance) {
        var vm = this;

        vm.reservation = {};

        vm.ok = function () {
            $scope.$close(vm.reservation);
        };

        vm.cancel = function () {
            $scope.$dismiss("cancel");
        };
    }
}());
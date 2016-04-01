(function () {
    "use strict";

    angular
        .module("handytoolsApp")
        .controller("reservationController", ["$rootScope", "$scope", "$route", reservationController]);

    function reservationController($rootScope, $scope, $route) {
        var vm = this;

        vm.refresh = function () {
            $route.reload();
        }

        vm.createReservation = function () {
            console.log("Making a reservation...");
        }
    }
}());
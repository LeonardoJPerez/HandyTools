(function () {
    "use strict";

    angular
        .module("handytoolsApp")
        .controller("reservationSummaryController", ["$rootScope", "$scope", "handy.api", "reservation", "toaster", "$uibModal", "$uibModalInstance", reservationSummaryController]);

    function reservationSummaryController($rootScope, $scope, handyapi, reservation, toaster, $uibModal, $uibModalInstance) {
        var vm = this;

        vm.reservation = angular.copy(reservation);
        vm.reservation.tools = [];
        angular.forEach(reservation.tools, function (t) {
            vm.reservation.tools.push(t.tool);
        });

        vm.submit = function () {
            handyapi.Reservations.resource.save(vm.reservation, function (res) {
                console.log(res);
                toaster.pop("success", "Reservation Created!", "");
                $scope.$close("ok");
            }, function (res) {
                console.log("Error: ", res);
                toaster.pop("error", "Reservation fialed! Please review Reservation.", "");
                $scope.$dismiss("cancel");
            });
        };

        vm.cancel = function () {
            $scope.$dismiss("cancel");
        };
    }
}());
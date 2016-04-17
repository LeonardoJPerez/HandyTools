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
                toaster.pop("success", "Reservation Created!", "");
                $scope.$close(res);
            }, function (res) {               
                toaster.pop("error", "Reservation fialed! Please review Reservation.", "");
                $scope.$dismiss("cancel");
            });
        };

        vm.back = function () {
            $scope.$dismiss("cancel");
        };

        vm.backHome = function () {
            $scope.$dismiss("home");
        };
    }
}());
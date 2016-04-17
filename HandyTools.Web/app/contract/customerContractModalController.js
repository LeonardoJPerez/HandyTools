(function () {
    "use strict";

    angular
        .module("handytoolsApp")
        .controller("customerContractModalController", ["$scope", "handy.api", "reservation", "$uibModal", "$uibModalInstance", customerContractModalController]);

    function customerContractModalController($scope, handyapi, reservation, $uibModal, $uibModalInstance) {
        var vm = this;

        vm.reservation = angular.copy(reservation);
        vm.showToolsSection = vm.reservation.action === "pickup";
        vm.clerk = vm.reservation.pickUpClerk ? vm.reservation.pickUpClerk : vm.reservation.dropOffClerk;        

        vm.backHome = function () {
            $scope.$dismiss("home");
        };
    }
}());
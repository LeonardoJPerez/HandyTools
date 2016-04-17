(function () {
    "use strict";

    angular
        .module("handytoolsApp")
        .controller("clerkDashboardModalController", ["$scope", "handy.api", "handy.authService", "toaster", "reservation", "$uibModal", clerkDashboardModalController]);

    function clerkDashboardModalController($scope, handyApi, authService, toaster, reservation, $uibModal) {
        var vm = this;

        vm.reservation = angular.copy(reservation);
        vm.showPaymentSection = vm.reservation.action === "pickup";
        vm.title = vm.reservation.action === "pickup" ? "Pick Up" : "Drop Off";
        vm.ccnameoncard = vm.reservation.customerName,
        vm.ccexpdateMonth = null;
        vm.ccexpdateYear = null;
        vm.ccnumber = null;
        vm.cctype = null;

        var handlePickUp = function () {
            handyApi.Reservations.pickup.save({
                id: reservation.id,
                pickuUpDate: new Date(),
                pickupHandledby: authService.getCurrentUser().userName,
                ccnameoncard: vm.ccnameoncard,
                ccExpirationDate: vm.ccexpdateMonth + "/" + vm.ccexpdateYear,
                ccNumber: vm.ccnumber,
                ccType: vm.cctype
            }, function (res) {
                toaster.pop("success", "Reservation Picked Up!", "");
                res.action = vm.reservation.action;
                $scope.$close(res);
            }, function (res) {
                toaster.pop("error","", "Error!<br /> Please review payment information.", "");
                $scope.$dismiss("cancel");
            });
        }

        var handleDropOff = function () {
            handyApi.Reservations.dropoff.save({
                id: reservation.id,
                dropOffDate: new Date(),
                dropOffHandledBy: authService.getCurrentUser().userName
            }, function (res) {
                toaster.pop("success", "Rental equipment received!", "");
                res.action = vm.reservation.action;
                $scope.$close(res);
            }, function (res) {
                toaster.pop("error", "", "Error processing rental completion!<br /> Please review rental information.", "");
                $scope.$dismiss("cancel");
            });
        }

        vm.submit = function () {
            if (vm.reservation.action === "pickup") {
                handlePickUp();
            } else if (vm.reservation.action === "dropoff") {
                handleDropOff();
            } else {
                toaster.pop("error", "", "Error processing rental completion!<br /> Please review rental information.", "");
                $scope.$dismiss("cancel");
            }
        };

        vm.back = function () {
            $scope.$dismiss("cancel");
        };
    }
}());
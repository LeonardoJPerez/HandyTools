(function () {
    "use strict";

    angular
        .module("handytoolsApp")
        .controller("clerkDashboardModalController", ["$scope", "handy.api", "toaster","reservation", "$uibModal", "$uibModalInstance", clerkDashboardModalController]);

    function clerkDashboardModalController($scope, handyapi, toaster, reservation, $uibModal, $uibModalInstance) {
        var vm = this;

        vm.reservation = angular.copy(reservation);
        vm.reservation.tools = [];
        vm.showPaymentSection = vm.reservation.action === "pickup";
        vm.ccexpdateMonth = null;
        vm.ccexpdateYear = null;
        vm.ccnumber = null;
        vm.cctype = null;

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
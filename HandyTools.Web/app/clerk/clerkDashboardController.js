(function () {
    "use strict";

    angular
        .module("handytoolsApp")
        .filter("displayAsShortDate", function () {
            return function (fieldValue, item) {
                if (fieldValue === 0) {
                    return " ";
                }

                return new Date(fieldValue).toLocaleString();
            };
        })
        .filter("displayCurrency", function () {
            return function (fieldValue, item) {
                return "$" + fieldValue.toFixed(2);
            };
        })
        .filter("displayClerk", function () {
            return function (fieldValue, item) {
                return fieldValue ? fieldValue : "Pending";
            };
        })     
        .controller("clerkDashboardController", ["$rootScope", "$scope", "APPSETTINGS", "handy.api", "$uibModal", "$log", "$route", "$location", clerkDashboardController]);

    function clerkDashboardController($rootScope, $scope, APPSETTINGS, handyApi, $uibModal, $log, $route, $location) {
        var vm = this;

        vm.selectedReservation = {};
        
        this.getReservations = function () {
            return handyApi.Reservations.getByUser.query({ id: btoa(vm.currentUser.userName) });
        };

        vm.refresh = function () {
            $route.reload();
        };

        vm.reservations = this.getReservations();

        $scope.mySelectedItems = [];

        $scope.displaySelected = function () {
            $scope.$watchCollection("mySelectedItems", function (row) {
                if ($scope.mySelectedItems.length > 0) {
                    vm.selectedReservation = $scope.mySelectedItems[0];
                    $log.info(vm.selectedReservation);
                }
            });
        };

        vm.createReservation = function () {
            $location.path(APPSETTINGS.ApplicationPaths.CreateReservation);
        };
    }
}());
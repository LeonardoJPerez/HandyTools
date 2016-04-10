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
        .controller("reservationController", ["$rootScope", "$scope", "APPSETTINGS", "handy.api", "$uibModal", "$log", "$route", "$location", reservationController]);

    function reservationController($rootScope, $scope, APPSETTINGS, handyApi, $uibModal, $log, $route, $location) {
        var vm = this;

        vm.selectedReservation = {};
        vm.currentUser = $scope.getCurrentUser();

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

            //$log.info("Making a reservation...");

            //var modalInstance = $uibModal.open({
            //    animation: true,
            //    templateUrl: "app/reservation/reservationCreateView.html",
            //    controller: "reservationCreateController as vm",
            //    size: "lg"
            //});

            //modalInstance.result.then(function (selectedItem) {
            //    //$scope.selected = selectedItem;
            //}, function () {
            //    $log.info("Modal dismissed at: " + new Date());
            //});
        };
    }
}());
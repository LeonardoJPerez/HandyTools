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
        .controller("reservationController", ["$rootScope", "$scope", "APPSETTINGS", "handy.api", "$uibModal", "$log", "$window", reservationController]);

    function reservationController($rootScope, $scope, APPSETTINGS, handyApi, $uibModal, $log, $window) {
        var vm = this;
        vm.currentUser = $scope.getCurrentUser();
        this.userId = btoa(vm.currentUser.userName);

        this.getReservations = function () {
            return handyApi.Reservations.getByUser.query({ id: this.userId });
        };

        vm.refresh = function () { };

        vm.reservations = this.getReservations();

        $scope.mySelectedItems = [];

        $scope.alertOnSelectionChange = function () {
            $scope.$watch("mySelectedItems.length", function (newLength) {
                if (newLength > 0) {
                    $window.alert("The selection now contains " + newLength + " items");
                }
            });
        };

        vm.createReservation = function () {
            $log.info("Making a reservation...");

            var modalInstance = $uibModal.open({
                animation: true,
                templateUrl: "app/reservation/reservationCreateView.html",
                controller: "reservationCreateController as vm",
                size: "lg"
            });

            modalInstance.result.then(function (selectedItem) {
                //$scope.selected = selectedItem;
            }, function () {
                $log.info("Modal dismissed at: " + new Date());
            });
        };
    }
}());
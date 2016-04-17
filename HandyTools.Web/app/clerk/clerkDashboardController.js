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
        .controller("clerkDashboardController", ["$scope", "handy.api", "$log", "$uibModal", clerkDashboardController]);

    function clerkDashboardController($scope, handyApi, $log, $uibModal) {
        var vm = this;

        vm.selectedReservation = {};
        vm.pickups = [];
        vm.dropoffs = [];

        var getReservations = function () {
            return handyApi.Reservations.resource.query(null, function (res) {
                angular.forEach(res, function (r) {
                    if (r.pickUpDate === 0) {
                        vm.pickups.push(r);
                    } else {
                        vm.dropoffs.push(r);
                    }
                });
            });
        };

        getReservations();

        $scope.mySelectedPickUps = [];
        $scope.mySelectedDropOffs = [];

        var displayReservation = function (action) {
            vm.selectedReservation.action = action;

            var modalInstance = $uibModal.open({
                animation: true,
                templateUrl: "app/clerk/clerkDashboardModal.html",
                controller: "clerkDashboardModalController as vm",
                size: "md",
                resolve: {
                    reservation: function () {
                        return vm.selectedReservation;
                    }
                }
            });

            modalInstance.result.then(null, function (reason) {
                if (reason === "home") {
                    return authService.redirectTo("/");
                }
            });
        };

        $scope.displayPickUp = function () {
            $scope.$watchCollection("mySelectedPickUps", function (row) {
                if ($scope.mySelectedPickUps.length > 0) {
                    vm.selectedReservation = $scope.mySelectedPickUps[0];
                    $log.info(vm.selectedReservation);
                    displayReservation("pickup");
                }
            });
        };

        $scope.displayDropOff = function () {
            $scope.$watchCollection("mySelectedDropOffs", function (row) {
                if ($scope.mySelectedDropOffs.length > 0) {
                    vm.selectedReservation = $scope.mySelectedDropOffs[0];
                    $log.info(vm.selectedReservation);
                    displayReservation("dropoff");
                }
            });
        };
    }
}());
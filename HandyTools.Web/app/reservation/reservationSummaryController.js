(function () {
    "use strict";

    angular
        .module("handytoolsApp")
        .controller("reservationSummaryController", ["$scope", reservationSummaryController]);

    function reservationSummaryController($scope, $uibModalInstance) {
        var vm = this;

        vm.ok = function () {
            $scope.$close("ok");
        };

        vm.cancel = function () {
            $scope.$dismiss("cancel");
        };
    }
}());
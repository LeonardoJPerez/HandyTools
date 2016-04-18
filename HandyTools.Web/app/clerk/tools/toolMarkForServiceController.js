(function () {
    "use strict";

    angular
        .module("handytoolsApp")
        .controller("toolMarkForServiceController", ["$scope", "$moment", "tool", toolMarkForServiceController]);

    function toolMarkForServiceController($scope, $moment, tool) {
        var vm = this;

        vm.tool = tool;
        vm.serviceOrder = {
            toolId: tool.id,
            endDate: null,
            startDate: null
        };


        vm.back = function () {
            $scope.$dismiss("close");
        };

        // DatePicker Settings
        vm.showStartDateError = false;
        vm.showEndDateError = false;

        vm.dateOptionsStart = { dropdownSelector: "#ddStartDate", startView: "day", minView: "day", modelType: "Date" };
        vm.dateOptionsEnd = { dropdownSelector: "#ddEndDate", startView: "day", minView: "day", modelType: "Date" };

        vm.validateStart = function (newDate, oldDate) {
            vm.showStartDateError = $moment(newDate).isAfter(vm.serviceOrder.endDate);
            vm.disableSubmit = vm.showStartDateError;
        };
        vm.validateEnd = function (newDate, oldDate) {
            vm.showEndDateError = $moment(newDate).isBefore(vm.serviceOrder.startDate);
            vm.disableSubmit = vm.showEndDateError;
        };

    }
}());
(function () {
    "use strict";

    angular
        .module("handytoolsApp")
        .controller("toolMarkForServiceController", ["$scope", "$moment", "tool", "handy.api", "toaster", toolMarkForServiceController]);

    function toolMarkForServiceController($scope, $moment, tool, handyApi, toaster) {
        var vm = this;
        var startDate = new Date();
        var endDate = new Date();
        endDate.setDate(startDate.getDate() + 1);
 
        vm.tool = tool;
        vm.serviceOrder = {
            toolId: tool.id,
            clerk: vm.tool.clerk,
            cost: 0,
            endDate: endDate,
            startDate: startDate
        };


        vm.back = function () {
            $scope.$dismiss("close");
        };

        vm.submit = function () {
            handyApi.Tools.serviceTool.save({
                id: vm.serviceOrder.toolId,
                clerk: vm.serviceOrder.clerk,
                startDate: vm.serviceOrder.startDate,
                endDate: vm.serviceOrder.endDate,
                cost: vm.serviceOrder.cost
            }, function (res) {
                toaster.pop("success", "Service Order created!", "");
                $scope.$close("close");
            }, function (res) {
                toaster.pop("error", "Cold not create Service Order. Please try again.", "");
                $scope.$dismiss("close");
            });
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
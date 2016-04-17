(function () {
    "use strict";

    angular
        .module("handytoolsApp")
        .controller("toolsController", ["$rootScope", "$scope", "$route", "handy.api", "$moment", toolsController]);

    function toolsController($rootScope, $scope, $route, handyApi, $moment) {
        var vm = this;

        var startDate = new Date();
        var endDate = new Date();
        endDate.setDate(startDate.getDate() + 10);

        var getToolTypes = function () {
            return handyApi.Tools.getToolTypes.query();
        };
        var getTools = function (toolType) {
            return handyApi.Tools.getToolsByType.post(null, {
                tooltype: toolType,
                startDate: vm.startDate,
                endDate: vm.endDate
            });
        };

        vm.toolTypeChange = function (toolType) {
            vm.tools = getTools(toolType);
        };
        vm.searchText = "";
        vm.filter = {};
        vm.selectedToolType = null;
        vm.startDate = startDate;
        vm.endDate = endDate;

        vm.dateOptionsStart = { dropdownSelector: "#ddStartDate", startView: "day", minView: "hour", modelType: "Date" };
        vm.dateOptionsEnd = { dropdownSelector: "#ddEndDate", startView: "day", minView: "hour", modelType: "Date" };

        vm.validateStart = function (newDate, oldDate) {
            vm.showStartDateError = $moment(newDate).isAfter(vm.endDate);
        };
        vm.validateEnd = function (newDate, oldDate) {
            vm.showEndDateError = $moment(newDate).isBefore(vm.startDate);
        };

        vm.toolTypes = getToolTypes();
        vm.tools = getTools();

        $scope.$watch("vm.searchText", function (newValue) {
            vm.filter = { id: newValue };
        });
    }
}());
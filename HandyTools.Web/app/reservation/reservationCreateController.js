(function () {
    "use strict";

    angular
        .module("handytoolsApp")
        .controller("reservationCreateController", ["$scope", "APPSETTINGS", "handy.api", "$location", "$anchorScroll", reservationCreateController]);

    function reservationCreateController($scope, APPSETTINGS, handyApi, $location, $anchorScroll, $uibModalInstance) {
        var vm = this;
        var date = new Date();

        var getToolTypes = function () {
            return handyApi.Tools.getToolTypes.query();
        };

        var getTools = function (toolType) {
            return handyApi.Tools.getToolsByType.query({ type: toolType });
        };

        vm.reservation = {
            startDate: new Date(),
            endDate: date.setDate(date.getDate() + 10)
        };

        vm.toolRows = [
        {
            toolType: { value: '-1', text: 'Select a Tool Type' },
            tool: { value: '-1', text: 'Select a Tool' }
        }];

        vm.toolTypes = getToolTypes();
        vm.tools = [];

        vm.addRow = function () {
            if (vm.toolRows.length < 50) {
                if (vm.toolRows.length > 1) {
                    $location.hash('lastRow');
                    $anchorScroll();
                }

                vm.toolRows.push({
                    toolType: { value: '-1', text: 'Select a Tool Type' },
                    tool: { value: '-1', text: 'Select a Tool' }
                });
            }
        };
        vm.removeRow = function (index) {
            if (vm.toolRows.length > 1) {
                vm.toolRows.splice(index, 1);
            }
        };

        vm.addHighlight = function () {
            angular.element(".row.add-tool p").removeClass("text-success");
        };
        vm.removeHighlight = function () {
            angular.element(".row.add-tool p").addClass("text-success");
        };

        vm.disableAdd = false;
        vm.back = function () {
            $location.path("/");
        };

        vm.toolTypeChange = function (toolType) {
            vm.tools = getTools(toolType);
        };

        // DatePicker Methods/Settings
        vm.altInputFormats = ['M!/d!/yyyy'];
        vm.dateOptions = {
            formatYear: "yyyy",
            formatMonth: "MMMM",
            maxDate: new Date(2020, 5, 22),
            minDate: new Date(),
            initDate: new Date(),
            startingDay: 0,
            showWeeks: false
        };
        vm.startDatePopup = {
            opened: false
        };
        vm.endDatePopup = {
            opened: false
        };

        vm.openStartDate = function () {
            vm.startDatePopup.opened = true;
        };
        vm.openEndDate = function () {
            vm.endDatePopup.opened = true;
        };

        $scope.$watch("vm.toolRows", function (value) {
            console.log(value);
        });
    }
}());
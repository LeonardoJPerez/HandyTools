(function () {
    "use strict";

    angular
        .module("handytoolsApp")
        .controller("reservationCreateController", ["$rootScope", "$scope", "APPSETTINGS", "handy.api", reservationCreateController]);

    function reservationCreateController($rootScope, $scope, APPSETTINGS, handyApi, $uibModalInstance) {
        var vm = this;
        var date = new Date();

        vm.reservation = {
            startDate: new Date(),
            endDate: date.setDate(date.getDate() + 10)
        };

        vm.toolRows = [
        {
            toolType: { value: '-1', text: 'Select a Tool Type' },
            tool: { value: '-1', text: 'Select a Tool' }
        }];

        vm.toolTypes = this.getToolTypes();

        vm.tools = [];

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

        vm.addRows = function () {
            vm.tools.push({
                toolType: { value: '-1', text: 'Select a Tool Type' },
                tool: { value: '-1', text: 'Select a Tool' }
            });
        };

        vm.addHighlight = function () {
            angular.element(".row.add-tool p").removeClass("text-success");
        };

        vm.removeHighlight = function () {
            angular.element(".row.add-tool p").addClass("text-success");
        };

        vm.openStartDate = function () {
            vm.startDatePopup.opened = true;
        };

        vm.openEndDate = function () {
            vm.endDatePopup.opened = true;
        };

        var getToolTypes = function() {
            handyApi.Tools.getToolTypes.query(function (res) {
                console.log(res);
            });
        };

        var getTools = function() {
            
        };
    }
}());
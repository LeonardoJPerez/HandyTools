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
        .controller("inventoryReportController", ["$rootScope", "$scope", "APPSETTINGS", "handy.api", inventoryReportController]);

    function inventoryReportController($rootScope, $scope, APPSETTINGS, handyApi) {
        var vm = this;

        var startDate = new Date();
        var endDate = new Date();
        endDate.setDate(startDate.getDate() + 10);

        vm.startDate = startDate;
        vm.endDate = endDate;
        vm.dateOptionsStart = { dropdownSelector: "#ddStartDate", startView: "day", minView: "day", modelType: "Date" };
        vm.dateOptionsEnd = { dropdownSelector: "#ddEndDate", startView: "day", minView: "day", modelType: "Date" };

        this.getReport = function () {
            return handyApi.Reports.post({ id: 1 }, {
                startDate: vm.startDate,
                endDate: vm.endDate
            });
        };

        vm.refresh = function () {
            $route.reload();
        };

        vm.items = this.getReport();

        vm.validateStart = function (newDate, oldDate) {
            vm.showStartDateError = $moment(newDate).isAfter(vm.endDate);
        };
        vm.validateEnd = function (newDate, oldDate) {
            vm.showEndDateError = $moment(newDate).isBefore(vm.startDate);
        };
    }
}());
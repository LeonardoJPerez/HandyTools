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

        vm.ok = function () {
            $scope.$close(vm.reservation);
        };

        vm.cancel = function () {
            $scope.$dismiss("cancel");
        };

        $scope.formats = ['dd-MMMM-yyyy', 'yyyy/MM/dd', 'dd.MM.yyyy', 'shortDate'];
        $scope.altInputFormats = ['M!/d!/yyyy'];

        $scope.dateOptions = {
            formatYear: "yyyy",
            formatMonth: "MMMM",
            maxDate: new Date(2020, 5, 22),
            minDate: new Date(),
            initDate: new Date(),
            startingDay: 0,
            showWeeks: false
        };

        $scope.open1 = function () {
            $scope.popup1.opened = true;
        };

        $scope.popup1 = {
            opened: false
        };

        $scope.open2 = function () {
            $scope.popup2.opened = true;
        };

        $scope.popup2 = {
            opened: false
        };

        $scope.setDate = function (year, month, day) {
            vm.reservation.startDate = new Date(year, month, day);
        };
    }
}());
﻿(function () {
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
        .controller("reservationsController", ["$rootScope", "$scope", "APPSETTINGS", "handy.api", "$uibModal", "$log", "$route", "$location", reservationsController]);

    function reservationsController($rootScope, $scope, APPSETTINGS, handyApi, $uibModal, $log, $route, $location) {
        var vm = this;

        vm.selectedReservation = {};
        vm.currentUser = $scope.getCurrentUser();

        this.getReservations = function () {
            return handyApi.Reservations.getByUser.query({ id: btoa(vm.currentUser.userName) });
        };

        vm.refresh = function () {
            $route.reload();
        };

        vm.reservations = this.getReservations();
      
        vm.createReservation = function () {
            $location.path(APPSETTINGS.ApplicationPaths.CreateReservation);
        };
    }
}());
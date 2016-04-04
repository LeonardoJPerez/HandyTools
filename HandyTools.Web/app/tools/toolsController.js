(function () {
    "use strict";

    angular
        .module("handytoolsApp")
        .controller("toolsController", ["$rootScope", "$scope", "$route", toolsController]);

    function toolsController($rootScope, $scope, $route) {
        var vm = this;
    }
}());
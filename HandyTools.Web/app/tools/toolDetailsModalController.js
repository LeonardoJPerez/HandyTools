(function () {
    "use strict";

    angular
        .module("handytoolsApp")
        .controller("toolDetailsModalController", ["$scope", "tool", toolDetailsModalController]);

    function toolDetailsModalController($scope, tool) {
        var vm = this;

        vm.tool = tool;

        vm.close = function () {
            $scope.$close("close");
        };
    }
}());
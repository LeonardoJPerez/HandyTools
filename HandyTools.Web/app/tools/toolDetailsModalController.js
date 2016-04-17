(function () {
    "use strict";

    angular
        .module("handytoolsApp")
        .controller("toolDetailsModalController", ["$scope", "tool", toolDetailsModalController]);

    function toolDetailsModalController($scope, tool) {
        var vm = this;

        vm.tool = tool;

        var servicedDate = new Date(vm.tool.lastServiced);
        if (servicedDate.getFullYear() === 0) {
            vm.hideLastServiced = true;
        }

        vm.close = function () {
            $scope.$close("close");
        };
    }
}());
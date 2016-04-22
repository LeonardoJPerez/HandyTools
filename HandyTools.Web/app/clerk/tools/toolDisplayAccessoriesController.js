(function () {
    "use strict";

    angular
        .module("handytoolsApp")
        .controller("toolDisplayAccessoriesController", ["$scope", "handy.api", "tool", toolDisplayAccessoriesController]);

    function toolDisplayAccessoriesController($scope, handyApi, tool) {
        var vm = this;       
        var getAccessories = function () {
            return handyApi.Tools.getAccessories.query({
                id: vm.tool.id
            });
        };

        vm.tool = tool;
        vm.accessories = getAccessories();

        vm.back = function () {
            $scope.$dismiss("close");
        };
    }
}());
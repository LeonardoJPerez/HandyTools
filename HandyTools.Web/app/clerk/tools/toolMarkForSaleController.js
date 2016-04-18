(function () {
    "use strict";

    angular
        .module("handytoolsApp")
        .controller("toolMarkForSaleController", ["$scope", "handy.api", "toaster", "tool", toolMarkForSaleController]);

    function toolMarkForSaleController($scope, handyApi, toaster, tool) {
        var vm = this;

        vm.tool = [tool];

        vm.submit = function () {
            handyApi.Tools.sellTool.save({             
                id: vm.tool[0].id,
                clerk: vm.tool[0].clerk,
                salePrice: (vm.tool[0].originalPrice / 2)               
            }, function (res) {
                toaster.pop("success", "Tool marked for Sale!", "");
                $scope.$close("close");
            }, function (res) {
                toaster.pop("error", "Tool could no be marked for Sale.", "");
                $scope.$dismiss("close");
            });
        };

        vm.back = function () {
            $scope.$dismiss("close");
        };
    }
}());
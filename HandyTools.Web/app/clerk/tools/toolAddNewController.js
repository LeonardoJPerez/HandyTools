(function () {
    "use strict";

    angular
        .module("handytoolsApp")
        .controller("toolAddNewController", ["$scope", "handy.api", "toaster", "$anchorScroll", toolAddNewController])
        .directive('validNumber', function () {
             return {
                 require: '?ngModel',
                 link: function (scope, element, attrs, ngModelCtrl) {
                     if (!ngModelCtrl) {
                         return;
                     }

                     ngModelCtrl.$parsers.push(function (val) {
                         if (angular.isUndefined(val)) {
                             var val = '';
                         }
                         var clean = val.replace(/[^0-9\.]/g, '');
                         var decimalCheck = clean.split('.');

                         if (!angular.isUndefined(decimalCheck[1])) {
                             decimalCheck[1] = decimalCheck[1].slice(0, 2);
                             clean = decimalCheck[0] + '.' + decimalCheck[1];
                         }

                         if (val !== clean) {
                             ngModelCtrl.$setViewValue(clean);
                             ngModelCtrl.$render();
                         }
                         return clean;
                     });

                     element.bind('keypress', function (event) {
                         if (event.keyCode === 32) {
                             event.preventDefault();
                         }
                     });
                 }
             };
         });

    function toolAddNewController($scope, handyApi, toaster, $anchorScroll) {
        var vm = this;

        var getToolTypes = function () {
            return handyApi.Tools.getToolTypes.query();
        };

        vm.toolTypes = getToolTypes();
        vm.tool = {
            description: null,
            originalPrice: null,
            dailyRentalCharge: null,
            deposit: null,
            longDescription: null,
            tooltype: null,
            accessories: [
            {
                accessory: null
            }]
        };

        vm.toolTypeChange = function (toolType) {
            vm.tool.tooltype = vm.selectedToolType;
        };

        vm.submit = function () {

            var accessories = [];
            angular.forEach(vm.tool.accessories, function (item) {
                if (item.accessory) {
                    accessories.push(item.accessory);
                }               
            });

            vm.tool.accessories = accessories;

            handyApi.Tools.addTool.save(vm.tool,
            function (res) {
                toaster.pop("success", "New Tool added!", "");
                $scope.$close("close");
            }, function (res) {
                toaster.pop("error", "Error adding new inventory! Please verify tool information.", "");
                $scope.$dismiss("close");
            });
        };

        vm.back = function () {
            $scope.$dismiss("close");
        };

        // UI Methods
        vm.addHighlight = function () {
            angular.element(".row.add-tool p").removeClass("text-success");
        };
        vm.removeHighlight = function () {
            angular.element(".row.add-tool p").addClass("text-success");
        };

        vm.addRow = function () {
            if (vm.tool.accessories.length < 50) {
                if (vm.tool.accessories.length > 1) {
                    $anchorScroll.yOffset = 50;
                    $anchorScroll();
                }

                vm.tool.accessories.push({
                    accessory: null,
                });
            } else {
                // Disable Add tool button.
            }
        };
        vm.removeRow = function (index) {
            if (vm.tool.accessories.length > 1) {
                vm.tool.accessories.splice(index, 1);
            }
        };
    }
}());
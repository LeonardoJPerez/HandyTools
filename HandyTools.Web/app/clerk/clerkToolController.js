﻿(function () {
    "use strict";

    angular
        .module("handytoolsApp")
        .controller("clerkToolController", ["$scope", "$route", "handy.api", "handy.authService","toaster", "$moment", "$log", "$uibModal", clerkToolController]);

    function clerkToolController($scope, $route, handyApi, authService, toaster, $moment, $log, $uibModal) {
        var vm = this;

        var startDate = new Date();
        var endDate = new Date();
        endDate.setDate(startDate.getDate() + 10);

        var getToolTypes = function () {
            return handyApi.Tools.getToolTypes.query();
        };
        var getTools = function (toolType) {
            return handyApi.Tools.getToolsClerk.post({
                tooltype: toolType                
            });
        };

        vm.toolTypeChange = function (toolType) {
            vm.tools = getTools(toolType);
        };

        vm.searchText = "";
        vm.filter = {};
        vm.selectedToolType = null;
        vm.selectedTool = null; 
        vm.toolTypes = getToolTypes();
        vm.tools = getTools(null);
        vm.clerk = authService.getCurrentUser().userName;

        vm.markForSale = function(gridItem) {
            gridItem.clerk = vm.clerk;

            var modalInstance = $uibModal.open({
                animation: true,
                templateUrl: "app/clerk/tools/toolMarkForSaleView.html",
                controller: "toolMarkForSaleController as vm",
                size: "sm",
                resolve: {
                    tool: function() {
                        return gridItem;
                    }
                }
            });

            modalInstance.result.then(function(res) {
                    $route.reload();
                },
                null);
        };

        vm.markForService = function(gridItem) {
            console.log('You clicked on ' + gridItem);
            gridItem.clerk = vm.clerk;

            var modalInstance = $uibModal.open({
                animation: true,
                templateUrl: "app/clerk/tools/toolMarkForServiceView.html",
                controller: "toolMarkForServiceController as vm",
                size: "md",
                resolve: {
                    tool: function() {
                        return gridItem;
                    }
                }
            });

            modalInstance.result.then(function(res) {
                    $route.reload();
                },
                null);
        };

        vm.addNewTool = function() {
            var modalInstance = $uibModal.open({
                animation: true,
                templateUrl: "app/clerk/tools/toolAddNewView.html",
                controller: "toolAddNewController as vm",
                size: "md"
            });

            modalInstance.result.then(function(res) {
                    $route.reload();
                },
                null)
        };

        vm.displayAccessories = function() {
            var modalInstance = $uibModal.open({
                animation: true,
                templateUrl: "app/clerk/tools/toolDisplayAccessories.html",
                controller: "toolDisplayAccessoriesController as vm",
                size: "sm",
                resolve: {
                    tool: function() {
                        return vm.selectedTool;
                    }
                }
            });
        };

        $scope.$watch("vm.searchText", function (newValue) {
            vm.filter = { id: newValue };
        });
 
        $scope.mySelectedItems = [];

        $scope.displaySelected = function () {
            $scope.$watchCollection("mySelectedItems", function (row) {
                if ($scope.mySelectedItems.length > 0) {
                    vm.selectedTool = $scope.mySelectedItems[0];
                    console.log(vm.selectedTool);
                    if (vm.selectedTool.type === "PowerTool") {
                        vm.displayAccessories();
                    }
                }
            });
        };
    }
}());
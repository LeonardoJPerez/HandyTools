(function () {
    "use strict";

    angular
        .module("handytoolsApp")
        .controller("reservationCreateController", ["$scope", "handy.api", "$location", "$anchorScroll", reservationCreateController]);

    function reservationCreateController($scope, handyApi, $location, $anchorScroll, $uibModalInstance) {
        var vm = this;
        var startDate = new Date();
        var endDate = new Date();

        endDate.setDate(startDate.getDate() + 10);

        var getToolTypes = function () {
            return handyApi.Tools.getToolTypes.query();
        };

        var getTools = function (toolType) {
            return handyApi.Tools.getToolsByType.post(null, {
                tooltype: toolType,
                startDate: vm.reservation.startDate,
                endDate: vm.reservation.endDate
            });
        };

        var excludeTools = function () {
            angular.forEach(vm.reservation.tools, function (reservedTool) {
                for (var i = 0; i < vm.toolRows.length; i++) {
                    if (vm.toolRows[i].selectedTool && reservedTool.tool.id === vm.toolRows[i].selectedTool.id) {
                        continue;
                    }

                    var newArray = [];
                    if (!vm.toolRows[i].tools) { continue; }

                    for (var j = 0; j < vm.toolRows[i].tools.length; j++) {
                        if (vm.toolRows[i].tools[j].id !== reservedTool.tool.id) {
                            newArray.push(vm.toolRows[i].tools[j]);
                        }
                    }

                    vm.toolRows[i].tools = newArray;
                }
            });
        }

        vm.reservation = {
            startDate: startDate,
            endDate: endDate,
            tools: []
        };

        vm.toolRows = [
        {
            selectedToolType: null,
            tools: null,
            selectedTool: null
        }];
        vm.toolTypes = getToolTypes();

        var getTotal = function () {
            var total = 0;
            angular.forEach(vm.toolRows, function (row) {
                if (row.selectedTool) {
                    total += row.selectedTool.dailyRentalCharge;
                }
            });

            return parseFloat(total).toFixed(2);
        }

        vm.reservationTotal = getTotal();

        vm.addRow = function () {
            if (vm.toolRows.length < 50) {
                if (vm.toolRows.length > 1) {
                    $anchorScroll.yOffset = 50;
                    $anchorScroll();
                }

                vm.toolRows.push({
                    selectedToolType: null,
                    tools: null,
                    selectedTool: null
                });
            }
        };
        vm.removeRow = function (index) {
            if (vm.toolRows.length > 1) {
                vm.toolRows.splice(index, 1);
            }

            excludeTools();
        };

        vm.addHighlight = function () {
            angular.element(".row.add-tool p").removeClass("text-success");
        };
        vm.removeHighlight = function () {
            angular.element(".row.add-tool p").addClass("text-success");
        };

        vm.disableAdd = false;
        vm.back = function () {
            $location.path("/");
        };

        vm.toolTypeChange = function (row, toolType) {
            if (toolType) {
                getTools(toolType).$promise.then(function (t) {
                    row.tools = t;
                    excludeTools();
                });
            } else {
                row.tools = null;
            }
        };

        vm.toolChange = function (tool, index) {
            vm.reservationTotal = getTotal();

            if (!tool) {
                // Remove from Reservation Tools Collection.
                angular.forEach(vm.reservation.tools, function (t, i) {
                    if (t.rowindex === index) { vm.reservation.tools.splice(i, 1); }
                });

                return;
            }

            if (vm.reservation.tools.length === 0) {
                vm.reservation.tools.push({ rowindex: index, tool });
            } else {
                angular.forEach(vm.reservation.tools, function (t, i) {
                    if (t.rowindex !== index) {
                        vm.reservation.tools.push({ rowindex: index, tool });
                    } else {
                        vm.reservation.tools[i] = { rowindex: index, tool }
                    }
                });
            }

            // Update Tools dropdowns and remove selected tools.
            excludeTools();
        };

        // DatePicker Settings
        vm.dateOptionsStart = { dropdownSelector: "#ddStartDate", startView: "day", minView: "hour", modelType: "Date" };
        vm.dateOptionsEnd = { dropdownSelector: "#ddEndDate", startView: "day", minView: "hour", modelType: "Date" };
    }
}());
﻿(function () {
    "use strict";

    angular
        .module("handytoolsApp")
        .controller("reservationCreateController", ["$scope", "handy.api", "$location", "$anchorScroll", "$moment",
            "$log", "$sce", "$uibModal", reservationCreateController]);

    function reservationCreateController($scope, handyApi, $location, $anchorScroll, $moment, $log, $sce, $uibModal, $uibModalInstance) {
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
        var updateReservations = function (tool, index) {
            vm.reservationTotal = getTotal();
            var reservedTools = vm.reservation.tools;

            if (!tool) {
                // Remove from Reservation Tools Collection if selection is null.
                angular.forEach(reservedTools, function (t, i) {
                    if (t.rowindex === index) { reservedTools.splice(i, 1); }
                });
                return;
            }

            if (reservedTools.length === 0) {
                reservedTools.push({ rowindex: index, tool });
            } else {
                var pos = null;
                angular.forEach(reservedTools, function (t, i) {
                    if (t.tool.id === tool.id) { pos = i; }
                });

                if (pos) {
                    reservedTools[pos] = { rowindex: index, tool };
                } else {
                    reservedTools.push({ rowindex: index, tool });
                }
            }

            vm.reservation.tools = reservedTools;
        };

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
        vm.ok = function () {
            $log.info("Making a reservation...");

            var modalInstance = $uibModal.open({
                animation: true,
                templateUrl: "app/reservation/reservationSummary.html",
                controller: "reservationSummaryController as vm",
                size: "md"               
            });

            modalInstance.result.then(function (selectedItem) {
                $log.info("Reservation Accecpted at: " + new Date());
            }, function () {
                $log.info("Reservation dismissed at: " + new Date());
            });
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
            excludeTools();
        };
        vm.toolChange = function (tool, index) {
            updateReservations(tool, index);
            // Update Tools dropdowns and remove selected tools.
            excludeTools();
            $log.info(vm.reservation);
        };

        // DatePicker Settings
        vm.dateOptionsStart = { dropdownSelector: "#ddStartDate", startView: "day", minView: "hour", modelType: "Date" };
        vm.dateOptionsEnd = { dropdownSelector: "#ddEndDate", startView: "day", minView: "hour", modelType: "Date" };

        vm.validateStart = function (newDate, oldDate) {
            vm.showStartDateError = $moment(newDate).isAfter(vm.reservation.endDate);
            vm.disableSubmit = vm.showStartDateError;
        };
        vm.validateEnd = function (newDate, oldDate) {
            vm.showEndDateError = $moment(newDate).isBefore(vm.reservation.startDate);
            vm.disableSubmit = vm.showEndDateError;
        };

        vm.disableSubmit = false;
        vm.showStartDateError = false;
        vm.showEndDateError = false;
        vm.popupHtml = $sce.trustAsHtml("<span class='text-danger'>Date Invalid!</span>");
    }
}());
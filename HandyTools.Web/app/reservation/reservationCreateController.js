(function () {
    "use strict";

    angular
        .module("handytoolsApp")
        .controller("reservationCreateController", ["$scope", "handy.api", "handy.authService", "$location", "$anchorScroll", "$moment", "$log", "$sce", "$uibModal", reservationCreateController]);

    function reservationCreateController($scope, handyApi, authService, $location, $anchorScroll, $moment, $log, $sce, $uibModal) {
        var vm = this;
        var startDate = new Date();
        var endDate = new Date();
        endDate.setDate(startDate.getDate() + 10);

        var getTools = function (toolType) {
            return handyApi.Tools.getToolsByType.post(null, {
                tooltype: toolType,
                startDate: vm.reservation.startDate,
                endDate: vm.reservation.endDate
            });
        };

        var getToolTypes = function () {
            return handyApi.Tools.getToolTypes.query().$promise.then(function (data) {
                vm.toolTypes = data;
                getTools().$promise.then(function (data) {
                    for (var i = 0; i < data.length; i++) {
                        vm.toolsCollection.push(data[i]);
                    }
                });
            });
        };

        var displayResult = function () {
            var modalInstance = $uibModal.open({
                animation: true,
                templateUrl: "app/reservation/reservationSubmittedModal.html",
                controller: "reservationSummaryController as vm",
                size: "md",
                resolve: {
                    reservation: function () {
                        return vm.reservation;
                    }
                }
            });

            modalInstance.result.then(null, function (reason) {
                if (reason === "home") {
                    return authService.redirectTo("/");
                }            
            });
        };

        vm.toolsCollection = [];

        var syncAvailableTools = function () {
            angular.forEach(vm.reservation.tools, function (t) {
                var newArray = [];

                for (var j = 0; j < vm.toolsCollection.length; j++) {
                    if (vm.toolsCollection[j].type === t.tool.type) {
                        newArray.push(vm.toolsCollection[j]);
                    }
                }

                angular.forEach(vm.reservation.tools, function (tt, i) {
                    for (var j = 0; j < newArray.length; j++) {
                        if (newArray[j].id === tt.tool.id) {
                            newArray.splice(j, 1);
                            break;
                        }
                    }
                });

                angular.forEach(vm.toolRows, function (row, i) {
                    if (t.tool.type !== row.selectedToolType) {
                        return;
                    }

                    angular.copy(newArray, row.availableTools);

                    if (row.selectedTool) {
                        var found = false;
                        for (var j = 0; j < row.availableTools.length; j++) {
                            if (row.availableTools[j].id === t.tool.id) {
                                found = true;
                            }
                        }
                        if (!found) {
                            row.availableTools.unshift(row.selectedTool);
                        }
                    }

                    $log.info(row.availableTools);
                });
            });
        };

        vm.currentUser = $scope.getCurrentUser();
        vm.reservation = {
            startDate: startDate,
            endDate: endDate,
            tools: [],
            dailyTotal: 0.00,
            depositTotal: 0.00,
            customerUserName: vm.currentUser.userName
        };
        vm.toolRows = [
        {
            selectedToolType: null,
            availableTools: null,
            selectedTool: null
        }];

        getToolTypes();

        var calculateCharges = function () {
            var dailyTotal = 0, depositTotal = 0;
            angular.forEach(vm.toolRows, function (row) {
                if (row.selectedTool) {
                    dailyTotal += row.selectedTool.dailyRentalCharge;
                    depositTotal += row.selectedTool.deposit;
                }
            });

            vm.reservation.dailyTotal = parseFloat(dailyTotal).toFixed(2);
            vm.reservation.depositTotal = parseFloat(depositTotal).toFixed(2);
        };
        calculateCharges();

        vm.addRow = function () {
            if (vm.toolRows.length < 50) {
                if (vm.toolRows.length > 1) {
                    $anchorScroll.yOffset = 50;
                    $anchorScroll();
                }

                vm.toolRows.push({
                    selectedToolType: null,
                    availableTools: null,
                    selectedTool: null
                });
            } else {
                // Disable Add tool button.
            }
        };
        vm.removeRow = function (index) {
            if (vm.toolRows.length > 1) {
                var tt = vm.toolRows[index].selectedToolType;

                vm.toolRows.splice(index, 1);
                vm.reservation.tools.splice(index, 1);
            }

            // Enable Add tool button if disable.
        };

        vm.disableAdd = false;
        vm.back = function () {
            $location.path("/");
        };
        vm.create = function () {
            $log.info("Making a reservation...");

            var modalInstance = $uibModal.open({
                animation: true,
                templateUrl: "app/reservation/reservationSummaryModal.html",
                controller: "reservationSummaryController as vm",
                size: "md",
                resolve: {
                    reservation: function () {
                        return vm.reservation;
                    }
                }
            });

            modalInstance.result.then(function (reservation) {
                vm.reservation.id = reservation.id;
                displayResult();
            }, function () {
                $log.info("Reservation dismissed at: " + new Date());
            });
        };

        vm.toolTypeChange = function (row, toolType) {
            if (toolType) {
                getTools(toolType).$promise.then(function (data) {
                    row.availableTools = data;
                    syncAvailableTools();
                });
            } else {
                row.availableTools = null;
            }
        };
        vm.toolChange = function (tool, index) {
            if (tool) {
                var insertNew = true;
                for (var i = 0; i < vm.reservation.tools.length; i++) {
                    if (vm.reservation.tools[i].i === index) {
                        vm.reservation.tools[i] = { i: i, tool };
                        insertNew = false;
                        break;
                    }
                }

                if (insertNew) {
                    vm.reservation.tools.push({ i: index, tool });
                }
            } else {
                vm.reservation.tools.splice(index, 1);
            }
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

        // UI Methods
        vm.addHighlight = function () {
            angular.element(".row.add-tool p").removeClass("text-success");
        };
        vm.removeHighlight = function () {
            angular.element(".row.add-tool p").addClass("text-success");
        };

        $scope.$watchCollection("vm.reservation.tools", function (newValue, oldValue) {
            syncAvailableTools();
            calculateCharges();          
        });
    }
}());
﻿(function () {
    "use strict";

    angular
        .module("handytoolsApp")
        .controller("loginController", ["$rootScope", "$scope", "handy.authService", "APPSETTINGS", "USER_ROLES", loginController]);

    function loginController($rootScope, $scope, authService, APPSETTINGS, USER_ROLES) {
        var vm = this;
        vm.userName = "";
        vm.clerkName = "";
        vm.error = false;

        vm.credentials = {
            username: "",
            password: "",
            role: USER_ROLES.Customer
        };

        vm.isCustomer = function () {
            return vm.credentials.role === USER_ROLES.Customer;
        }

        vm.validate = function (isvalid, elemid) {
            if (isvalid) {
                angular.element("#" + elemid).removeClass("has-error");
            } else {
                angular.element("#" + elemid).addClass("has-error");
            }
        }

        vm.setUserType = function (role) {
            if (role === vm.credentials.role) { return; }
            vm.credentials.role = "none";
          
            vm.error = false;
            angular.element(".input-group").removeClass("has-error");
            angular.element("#customer").addClass("ng-hide");
            angular.element("#clerk").addClass("ng-hide");

            vm.credentials.role = role;
        };

        vm.login = function (credentials) {
            if (vm.isCustomer()) {
                credentials.username = vm.userName;
            } else {
                credentials.username = vm.clerkName;
            }

            // Clear error messages.
            vm.error = false;

            authService.login(vm.credentials).then(function (user) {
                authService.redirectTo(user.userRole);
                if (user.userRole === USER_ROLES.NewCustomer) {
                    $rootScope.$broadcast(APPSETTINGS.AUTH_EVENTS.NewCustomerInProcess);
                } else {
                    $rootScope.$broadcast(APPSETTINGS.AUTH_EVENTS.LoginSuccess);
                }
            }, function (error) {
                displayError(error);
                $rootScope.$broadcast(APPSETTINGS.AUTH_EVENTS.LoginFailed);
            });
        }

        // Private Methods

        function displayError(error) {
            vm.error = true;
            console.log(error);
        }
    };
}());
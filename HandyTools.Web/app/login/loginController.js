(function () {
    "use strict";

    angular
        .module("handytoolsApp")
        .controller("loginController", ["$route", "$rootScope", "$scope", "handy.authService", "APPSETTINGS", loginController]);

    function loginController($route, $rootScope, $scope, authService, APPSETTINGS) {
        var vm = this;
        vm.credentials = {
            username: "",
            password: "",
            type: "customer"
        };

        vm.userName = "";
        vm.clerkname = "";

        vm.error = false;
        vm.errorMessage = "";

        vm.isCustomer = function () {
            return vm.credentials.type === "customer";
        }

        vm.validateInput = function (isvalid, elemid) {
            if (isvalid) {
                angular.element("#" + elemid).removeClass("has-error");
            } else {
                angular.element("#" + elemid).addClass("has-error");
            }
        }

        vm.setUserType = function (userType) {
            if (userType === vm.userType) { return; }
            vm.credentials.type = "none";
            angular.element("#customer").addClass("ng-hide");
            angular.element("#clerk").addClass("ng-hide");

            vm.credentials.type = userType === "customer" ? userType : "clerk";
        };

        vm.login = function (credentials) {
            if (vm.isCustomer()) {
                credentials.username = vm.userName;
            } else {
                credentials.username = vm.clerkname;
            }

            // Clear error messages.
            vm.error = false;

            authService.login.then(function (user) {
                $rootScope.$broadcast(APPSETTINGS.loginSuccess);
                vm.setCurrentUser(user);
            }, function () {
                $rootScope.$broadcast(APPSETTINGS.loginFailed);
                displayError(error);
            });
        }

        function displayError(error) {
            vm.error = true;
            console.log(error);
        }
    };

}());
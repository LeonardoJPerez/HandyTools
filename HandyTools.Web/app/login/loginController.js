(function () {
    "use strict";

    angular
        .module("handytoolsApp")
        .controller("loginController", ["$rootScope", "$scope", "handy.authService", "APPSETTINGS", loginController]);

    function loginController($rootScope, $scope, authService, APPSETTINGS) {
        var vm = this;
        vm.userName = "";
        vm.clerkName = "";
        vm.error = false;

        vm.credentials = {
            username: "",
            password: "",
            type: "customer"
        };

        vm.isCustomer = function () {
            return vm.credentials.type === "customer";
        }

        vm.validate = function (isvalid, elemid) {
            if (isvalid) {
                angular.element("#" + elemid).removeClass("has-error");
            } else {
                angular.element("#" + elemid).addClass("has-error");
            }
        }

        vm.setUserType = function (userType) {
            if (userType === vm.credentials.type) { return; }

            vm.credentials.type = "none";

            angular.element("#customer").addClass("ng-hide");
            angular.element("#clerk").addClass("ng-hide");

            vm.credentials.type = userType === "customer" ? userType : "clerk";
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
                $rootScope.$broadcast(APPSETTINGS.AUTH_EVENTS.LoginSuccess);
                $scope.setCurrentUser(user);
            }, function (error) {
                $rootScope.$broadcast(APPSETTINGS.AUTH_EVENTS.LoginFailed);
                displayError(error);
            });
        }

        // Private Methods

        function displayError(error) {
            vm.error = true;
            console.log(error);
        }
    };
}());
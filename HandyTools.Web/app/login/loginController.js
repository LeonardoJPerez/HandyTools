(function () {
    "use strict";

    angular
        .module("handytoolsApp")
        .controller("loginController", ["$route", "$scope", "$window", "handy.api", "currentUser", "appSettings", loginController]);

    function loginController($route, $scope, $window, handyApi, currentUser, appSettings) {
        var vm = this;

        vm.userType = "customer";
        vm.error = false;
        vm.errorMessage = "";

        function displayError(error) {
            vm.error = true;
            console.log(error);
        }

        vm.isCustomer = function () {
            return vm.userType === "customer";
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
            vm.userType = "none";
            angular.element("#customer").addClass("ng-hide");
            angular.element("#clerk").addClass("ng-hide");

            vm.userType = userType === "customer" ? userType : "clerk";
        };

        vm.login = function () {
            var username;
            if (vm.isCustomer()) {
                username = vm.userName;
            } else {
                username = vm.clerkname;
            }

            // Clear error messages.
            vm.error = false;

            handyApi.Login.save({
                "userName": username,
                "password": vm.password,
                "type": vm.userType
            }).$promise.then(
                // Success
                function (data) {
                    if (data) {
                        switch (data.code) {
                            case 0:
                                displayError(data);
                                break;
                            case -1:
                                if (vm.isCustomer()) { $window.location = appSettings.ApplicationPaths.CreateProfile; }
                                if (!vm.isCustomer()) { displayError(data); }
                                break;
                            default:
                                currentUser.setProfile(vm.userName, vm.userType);
                                currentUser.redirectToHome();
                        }
                    }
                },
                // Error
                function (error) {
                    displayError(error);
                }
            );
        }
    }
}());
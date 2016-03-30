(function () {
    "use strict";

    angular
        .module("handytoolsApp")
        .controller("loginController", ["$route", "$scope", "$window", "handy.api", "currentUser", "appSettings", loginController]);

    function loginController($route, $scope, $window, handyApi, currentUser, appSettings) {
        var vm = this;

        vm.userType = "customer";

        vm.setUserType = function (userType) {
            vm.userType = "none";
            angular.element("#customer").addClass("ng-hide");
            angular.element("#clerk").addClass("ng-hide");
            
            vm.userType = userType === "customer" ? userType : "clerk";
        };

        vm.login = function () {
            handyApi.Login.save({
                "userName": vm.userName,
                "password": vm.password,
                "type": vm.userType
            }, function (data) {
                if (data) {
                    switch (data.code) {
                        case 0:
                            // Could not authenticate. Display Error.
                            console.log("Error authenticating...");
                            break;
                        case -1:
                            if (vm.userType === "customer") { $window.location = appSettings.ApplicationPaths.CreateProfile; }
                            if (vm.userType === "clerk") { console.log("Error authenticating with clerk credentials..."); }
                            break;
                        default:
                            currentUser.setProfile(vm.userName, vm.userType);
                            currentUser.redirectToHome();
                    }
                }
            });
        }
    }
}());
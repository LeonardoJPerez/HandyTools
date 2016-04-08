(function () {
    "use strict";

    angular
        .module("handytoolsApp")
        .controller("profileController", ["$rootScope", "$scope", "handy.authService", "handy.api", "APPSETTINGS", "USER_ROLES", "$sce", profileController]);

    function profileController($rootScope, $scope, authService, handyApi, APPSETTINGS, USER_ROLES, $sce) {
        var vm = this;

        vm.currentUser = $scope.getCurrentUser();

        var getstates = function () {
            return handyApi.States.query();
        };

        var preparePayload = function (profile) {
            var payload = angular.copy(profile);

            payload.homePhoneAreaCode = profile.homePhoneNumber.substring(0, 3);
            payload.workPhoneAreaCode = profile.workPhoneNumber.substring(0, 3);
            payload.homePhoneNumber = profile.homePhoneNumber.substring(3, profile.homePhoneNumber.length);
            payload.workPhoneNumber = profile.workPhoneNumber.substring(3, profile.workPhoneNumber.length);

            return payload;
        }

        vm.showPopup = false;

        vm.popupHtml = $sce.trustAsHtml("<span class='text-danger'>Username taken!</span>");

        vm.profile = {
            userName: vm.currentUser.userName,
            password: null,
            passwordConfirm: null,
            firstName: null,
            lastName: null,
            homePhoneAreaCode: null,
            homePhoneNumber: null,
            workPhoneAreaCode: null,
            workPhoneNumber: null,
            addressLine1: null,
            addressLine2: null,
            city: null,
            state: "-1",
            country: "USA",
            postalCode: null
        };

        vm.back = function () {
            authService.setCurrentUser(null);
            return authService.redirectTo("/");
        }

        vm.createProfile = function (isValid) {
            // Validate profile
            if (isValid) {
                handyApi.Profile.save(preparePayload(vm.profile), function (res) {
                    console.log(res);
                    if (res.userName) {
                        vm.showPopup = false;

                        authService.setCurrentUser({
                            userName: vm.profile.userName,
                            userRole: USER_ROLES.Customer
                        });

                        authService.redirectTo(USER_ROLES.Customer);
                        $rootScope.$broadcast(APPSETTINGS.AUTH_EVENTS.LoginSuccess)
                    } else {
                        vm.showPopup = true;
                    }
                });
            }
        }

        vm.states = getstates();
    }
}());
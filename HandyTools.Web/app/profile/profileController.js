(function () {
    "use strict";

    angular
        .module("handytoolsApp")
        .controller("profileController", ["$rootScope", "$scope", "toaster", "handy.authService", "handy.api", "APPSETTINGS", "USER_ROLES", "$sce", profileController]);

    function profileController($rootScope, $scope, toaster, authService, handyApi, APPSETTINGS, USER_ROLES, $sce) {
        var vm = this;

        var getProfile = function () {
            if (vm.isNewCustomer) {
                vm.profile = {
                    userName: vm.currentUser.userName,
                    password: null,
                    passwordConfirm: null,
                    firstName: null,
                    lastName: null,
                    homePhone: null,
                    workPhone: null,
                    addressLine1: null,
                    addressLine2: null,
                    city: null,
                    state: { code: '-1', name: 'Select a State' },
                    country: "USA",
                    postalCode: null
                };
            } else {
                handyApi.Profile.get({ id: btoa(vm.currentUser.userName) }, function (res) {
                    // Parse phone numbers.
                    vm.profile = res;
                    vm.profile.homePhoneNumber = res.homePhoneAreaCode + res.homePhoneNumber;
                    vm.profile.workPhoneNumber = res.workPhoneAreaCode + res.workPhoneNumber;
                    vm.profile.state = { code: res.state, name: 'Select a State' };
                });
            }
        };

        var getStates = function () {
            return handyApi.States.query();
        };

        var getTitle = function () {
            return vm.isNewCustomer ? "Create New Profile" : "View/Edit Profile";
        };

        var preparePayload = function (profile) {
            var payload = angular.copy(profile);

            payload.homePhoneAreaCode = profile.homePhoneNumber.substring(0, 3);
            payload.workPhoneAreaCode = profile.workPhoneNumber.substring(0, 3);
            payload.homePhoneNumber = profile.homePhoneNumber.substring(3, profile.homePhoneNumber.length);
            payload.workPhoneNumber = profile.workPhoneNumber.substring(3, profile.workPhoneNumber.length);
            payload.state = profile.state.code;

            return payload;
        };

        vm.currentUser = $scope.getCurrentUser();
        vm.isNewCustomer = vm.currentUser.userRole === USER_ROLES.NewCustomer
        vm.showPopup = false;
        vm.popupHtml = $sce.trustAsHtml("<span class='text-danger'>Username taken!</span>");
        vm.title = getTitle();
        vm.states = getStates();
        vm.submitText = vm.isNewCustomer ? "Submit" : "Save";

        vm.back = function () {
            if (vm.isNewCustomer) { authService.setCurrentUser(null); }
            return authService.redirectTo("/");
        }

        vm.submitProfile = function (isValid) {
            // Validate profile
            if (isValid) {
                if (vm.isNewCustomer) {
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
                } else {
                    handyApi.Profile.update(preparePayload(vm.profile), function (res) {
                        console.log(res);
                        toaster.pop('success', "Account Updated!", "");
                    });
                }
            }
        };

        getProfile();
    }
}());
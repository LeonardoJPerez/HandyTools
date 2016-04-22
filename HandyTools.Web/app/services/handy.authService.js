(function () {
    "use strict";

    angular
        .module("handy.services")
        .factory("handy.authService", ["$http", "handy.session", "$q", "$location", "APPSETTINGS", "USER_ROLES", "handy.api", authService]);

    function authService($http, session, $q, $location, APPSETTINGS, USER_ROLES, handyApi) {
        var _authService = {};

        _authService.login = function (credentials) {
            return handyApi.Login.save(credentials).$promise.then(handleLoginResponse);
        };

        _authService.isAuthenticated = function () {
            return !!session.userName;
        };

        _authService.isAuthorized = function (authorizedRoles) {
            if (!angular.isArray(authorizedRoles)) {
                authorizedRoles = [authorizedRoles];
            }

            return authorizedRoles.indexOf(session.userRole) !== -1;
        };

        _authService.redirectTo = function (role) {
            switch (role) {
                case USER_ROLES.Customer:
                    $location.path(APPSETTINGS.ApplicationPaths.CustomerHome);
                    break;
                case USER_ROLES.Clerk:
                    $location.path(APPSETTINGS.ApplicationPaths.ClerkHome);
                    break;
                case USER_ROLES.NewCustomer:
                    $location.path(APPSETTINGS.ApplicationPaths.CreateProfile);
                    break;
                default:
                    $location.path("/");
                    break;
            }
        };

        _authService.logoff = function (callback) {
            // Clear session
            session.destroyUserCookie();
            callback({});
        };

        _authService.getCurrentUser = function () {
            return {
                userName: session.userName,
                userRole: session.userRole
            };
        }

        _authService.setCurrentUser = function (user) {
            // if null, nuke cookie.
            if (user) {
                var username = user.hasOwnProperty("userName") ? user.userName : null;
                var role = user.hasOwnProperty("userRole") ? user.userRole : null;
                session.createUserCookie(username, role);
            } else {
                session.destroyUserCookie();
            }
        }

        // Private Methods

        function handleLoginResponse(res) {
            var deferred = $q.defer();

            var response = {
                userName: res.userName,
                userRole: res.role
            };

            switch (res.code) {
                case 1:
                    _authService.setCurrentUser(response);
                    break;

                case -1:
                    // User not found.
                    if (response.userRole === USER_ROLES.NewCustomer) {                    
                        _authService.setCurrentUser(response);
                    } else {
                        response.userRole = USER_ROLES.Invalid;
                    }
                    break;

                default:
                    // Handle invalid login.
                    response.userRole = USER_ROLES.Invalid;
            }

            if (response.userRole === USER_ROLES.Invalid) {
                deferred.reject(response);
            } else {
                deferred.resolve(response);
            }

            return deferred.promise;
        }

        return _authService;
    };
}());
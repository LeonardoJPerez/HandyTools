(function () {
    "use strict";

    angular
        .module("handy.services")
        .factory("handy.authService", ["$http", "handy.session", "$q", "$location", "APPSETTINGS", "USER_ROLES", "handy.api", authService]);

    function authService($http, session, $q, $location, APPSETTINGS, USER_ROLES, handyApi) {
        var _authService = {};

        _authService.login = function (credentials) {
            return handyApi.Login.save({
                "userName": credentials.username,
                "password": credentials.password,
                "type": credentials.type
            })
                .$promise
                .then(handleLoginResponse);
        };

        _authService.isAuthenticated = function () {
            return !!session.userId;
        };

        _authService.isAuthorized = function (authorizedRoles) {
            if (!angular.isArray(authorizedRoles)) {
                authorizedRoles = [authorizedRoles];
            }

            if ($location.path() === APPSETTINGS.ApplicationPaths.CreateProfile && authorizedRoles.indexOf(USER_ROLES.NewCustomer) !== -1) {
                return true;
            }

            return (_authService.isAuthenticated() && authorizedRoles.indexOf(session.userRole) !== -1);
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
            }
        };

        _authService.logoff = function (callback) {
            // Clear session
            session.destroy();
            callback({});
        };

        // Private Methods

        function handleLoginResponse(res) {
            var deferred = $q.defer();

            var response = {
                username: res.userName,
                role: res.role
            };

            switch (res.code) {
                case 1:
                    session.create(response.username, response.username, response.role);
                    break;
                case -1:
                    // User not found.
                    if (response.role === USER_ROLES.Customer) {
                        response.role = USER_ROLES.NewCustomer;
                    } else {
                        response.role = USER_ROLES.Invalid;
                    }
                    break;
                default:
                    // Handle invalid login.
                    response.role = USER_ROLES.Invalid;
            }

            if (response.role === USER_ROLES.Invalid) {
                deferred.reject(response);
            } else {
                deferred.resolve(response);
            }

            return deferred.promise;
        }

        return _authService;
    };
}());
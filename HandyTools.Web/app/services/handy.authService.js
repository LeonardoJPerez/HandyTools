(function () {
    "use strict";

    angular
        .module("handy.services")
        .factory("handy.authService", ["$http", "handy.session", "handy.api", authService]);

    function authService($http, session, handyApi) {
        var _authService = {};

        _authService.login = function (credentials) {
            handyApi.Login.save({
                "userName": credentials.username,
                "password": credentials.password,
                "type": credentials.type
            }).$promise.then(
                // Success
                function (data) {
                    var type = "invalid";
                    switch (data.code) {
                        case 1: // Wrong password
                            type = credentials.type;
                            break;
                        case -1: // User not found.
                            if (credentials.type === "customer") {
                                type = "new";
                            }
                            break;
                    }

                    session.create(credentials.username, credentials.username, credentials.type);

                    return {
                        username: credentials.username,
                        type: type
                    }
                });
        }

        _authService.isAuthenticated = function () {
            return !!session.userId;
        };

        _authService.isAuthorized = function (authorizedRoles) {
            if (!angular.isArray(authorizedRoles)) {
                authorizedRoles = [authorizedRoles];
            }
            return (_authService.isAuthenticated() && authorizedRoles.indexOf(session.userRole) !== -1);
        };

        _authService.logoff = function () {
            // Clear session
        }

        return _authService;
    };
}());
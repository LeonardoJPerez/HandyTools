(function () {
    "use strict";

    angular
        .module("handy.services")
        .factory("handy.authService", ["$http", "handy.session", "$q", "handy.api", authService]);

    function authService($http, session, $q, handyApi) {
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
            return (_authService.isAuthenticated() && authorizedRoles.indexOf(session.userRole) !== -1);
        };

        _authService.logoff = function () {
            // Clear session
        };

        // Private Methods

        function handleLoginResponse(res) {
            var deferred = $q.defer();
            var role = "invalid";
            switch (res.code) {
                case 1: // Wrong password
                    role = res.role;
                    break;
                case -1: // User not found.
                    if (res.role === "customer") { role = "new"; }
                    break;
            }

            // Set new response object with modified role.
            var response = {
                username: res.userName,
                role: role
            };

            if (role !== "invalid") {
                session.create(response.username, response.username, response.role);
                deferred.resolve(response);
            } else {
                deferred.reject(response);
            }

            return deferred.promise;
        }

        return _authService;
    };
}());
(function () {
    "use strict";

    angular
        .module("handy.services")
        .factory("handy.authInterceptor", ["$rootScope", "$q", "APPSETTINGS", function ($rootScope, $q, APPSETTINGS) {
            return {
                responseError: function (response) {
                    $rootScope.$broadcast({
                        401: APPSETTINGS.AUTH_EVENTS.NotAuthenticated,
                        403: APPSETTINGS.AUTH_EVENTS.NotAuthorized,
                        419: APPSETTINGS.AUTH_EVENTS.SessionTimeout,
                        440: APPSETTINGS.AUTH_EVENTS.SessionTimeout
                    }[response.status], response);
                    return $q.reject(response);
                }
            };
        }]);
}());
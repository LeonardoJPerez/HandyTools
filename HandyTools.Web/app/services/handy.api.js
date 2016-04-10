(function () {
    "use strict";

    angular
        .module("handy.services")
        .factory("handy.api", ["$resource", "APPSETTINGS", function ($resource, APPSETTINGS) {
            return {
                Login: $resource(APPSETTINGS.ApiServerUrl + "api/account/login"),
                Profile: $resource(APPSETTINGS.ApiServerUrl + "api/account/:id", null, {
                    'update': { method: 'PUT' }
                }),
                States: $resource(APPSETTINGS.CurrentServerUrl + "assets/states.json"),
                Reservations: {
                    getByUser: $resource(APPSETTINGS.ApiServerUrl + "api/reservation/getbyuser/:id")
                }
            };
        }]);
}());
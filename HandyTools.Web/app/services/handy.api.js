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
                Tools: {
                    getToolTypes: $resource(APPSETTINGS.ApiServerUrl + "api/tool/types"),
                    getToolsByType: $resource(APPSETTINGS.ApiServerUrl + "api/tool/", null, {
                        'post': { method: 'POST', isArray: true }
                    })
                },
                Reservations: {
                    getByUser: $resource(APPSETTINGS.ApiServerUrl + "api/reservation/getbyuser/:id"),
                    resource: $resource(APPSETTINGS.ApiServerUrl + "api/reservation/")
                }
            };
        }]);
}());
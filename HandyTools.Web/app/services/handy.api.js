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
                    addTool: $resource(APPSETTINGS.ApiServerUrl + "api/tool/new"),
                    getToolTypes: $resource(APPSETTINGS.ApiServerUrl + "api/tool/types"),
                    getToolsByType: $resource(APPSETTINGS.ApiServerUrl + "api/tool/", null, {
                        'post': { method: 'POST', isArray: true }
                    }),
                    getToolsClerk: $resource(APPSETTINGS.ApiServerUrl + "api/tool/clerk", null, {
                        'post': { method: 'POST', isArray: true }
                    }),
                    sellTool: $resource(APPSETTINGS.ApiServerUrl + "api/tool/sell"),
                    serviceTool: $resource(APPSETTINGS.ApiServerUrl + "api/tool/service")
                },
                Reservations: {
                    getByUser: $resource(APPSETTINGS.ApiServerUrl + "api/reservation/getbyuser/:id"),
                    pickup: $resource(APPSETTINGS.ApiServerUrl + "api/reservation/pickup/"),
                    dropoff: $resource(APPSETTINGS.ApiServerUrl + "api/reservation/dropoff/"),
                    resource: $resource(APPSETTINGS.ApiServerUrl + "api/reservation/")
                }
            };
        }]);
}());
﻿/// <reference path="../navigation/navigationView.html" />
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
                Reports: $resource(APPSETTINGS.ApiServerUrl + "api/reports/:id", { id: '@id' }, {
                    'post': { method: 'POST', isArray: true }
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
                    serviceTool: $resource(APPSETTINGS.ApiServerUrl + "api/tool/service"),
                    getAccessories: $resource(APPSETTINGS.ApiServerUrl + "api/tool/accessories/:id", { id: '@id'})
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
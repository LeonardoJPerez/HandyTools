(function () {
    "use strict";

    angular
        .module("handy.services")
        .factory("handy.api", ["$resource", "appSettings", function ($resource, appSettings) {
            return {
                Login: $resource(appSettings.ApiServerPath + "api/account/login"),                 
                Profile: $resource(appSettings.ApiServerPath + "api/account/:id"),
                States: $resource(appSettings.CurrentServer + "assets/states.json")
            };
        }]);
}());
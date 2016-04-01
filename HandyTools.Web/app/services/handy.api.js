(function () {
    "use strict";

    angular
        .module("handy.services")
        .factory("handy.api", ["$resource", "APPSETTINGS", function ($resource, APPSETTINGS) {
            return {
                Login: $resource(APPSETTINGS.ApiServerPath + "api/account/login"),
                Profile: $resource(APPSETTINGS.ApiServerPath + "api/account/:id"),
                States: $resource(APPSETTINGS.CurrentServer + "assets/states.json")
            };
        }]);
}());
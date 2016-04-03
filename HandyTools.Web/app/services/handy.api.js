(function () {
    "use strict";

    angular
        .module("handy.services")
        .factory("handy.api", ["$resource", "APPSETTINGS", function ($resource, APPSETTINGS) {
            return {
                Login: $resource(APPSETTINGS.ApiServerUrl + "api/profile/login"),
                Profile: $resource(APPSETTINGS.ApiServerUrl + "api/profile/:id"),
                States: $resource(APPSETTINGS.CurrentServerUrl + "assets/states.json")
            };
        }]);
}());
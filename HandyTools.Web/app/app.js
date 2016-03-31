(function () {
    "use strict";

    var _currentUser = null;

    var app = angular
        .module("handytoolsApp", ["ngRoute", "ngAnimate", "ngCookies", "angular-loading-bar", "ui.event", "datatables", "handy.services"])
        .constant("appSettings",
        {
            
            //ApiServerPath: "handytools.s3-website-us-east-1.amazonaws.com",
            //CurrentServer: "handytools-api.s3-website-us-east-1.amazonaws.com",
            ApiServerPath: "http://localhost:62581/",
            CurrentServer: "http://localhost:49460/",
            ApplicationPaths: {
                ClerkHome: "#/pickups",
                CustomerHome: "#/reservations",
                CreateProfile: "#/profile/create"
            }
        })
        .config(function ($routeProvider, $locationProvider, cfpLoadingBarProvider) {
            cfpLoadingBarProvider.includeSpinner = false;

            $routeProvider
                .when("/", {
                    controller: "loginController",
                    controllerAs: "vm",
                    templateUrl: "app/login/loginView.html",
                    redirectTo: function (params, currPath, currSearch) {
                        if (_currentUser.getProfile().isLoggedIn) {
                            _currentUser.redirectToHome();
                        }
                    }
                })
                .when("/profile/create", {
                    controller: "profileController",
                    controllerAs: "vm",
                    templateUrl: "app/profile/profileCreateView.html"
                })
                .when("/reservations", {
                    controller: "reservationController",
                    controllerAs: "vm",
                    templateUrl: "app/reservation/reservationsView.html"
                })
                .when("/pickups", {
                    controller: "reservationController",
                    controllerAs: "vm",
                    templateUrl: "app/reservation/reservationsView.html"
                })                 
                .otherwise("/");
        });

    app.run(["currentUser", function (currentUser) {
        // Injecting currentUser service for logging check.
        _currentUser = currentUser;
    }]);
}());
(function () {
    "use strict";

    var _currentUser = null;

    var app = angular
        .module("handytoolsApp", ["ngRoute", "ngAnimate", "ngCookies", "angular-loading-bar", "ui.event", "datatables", "handy.services"])
        .constant("APPSETTINGS",
        {
            //ApiServerPath: "handytools.s3-website-us-east-1.amazonaws.com",
            //CurrentServer: "handytools-api.s3-website-us-east-1.amazonaws.com",
            ApiServerPath: "http://localhost:62581/",
            CurrentServer: "http://localhost:49460/",
            ApplicationPaths: {
                ClerkHome: "#/pickups",
                CustomerHome: "#/reservations",
                CreateProfile: "#/profile/create"
            },
            AUTH_EVENTS: {
                LoginSuccess: "auth-login-success",
                LoginFailed: "auth-login-failed",
                LogoutSuccess: "auth-logout-success",
                SessionTimeout: "auth-session-timeout",
                NotAuthenticated: "auth-not-authenticated",
                NotAuthorized: "auth-not-authorized"
            }
        })
        .constant("USER_ROLES", {
            All: "*",
            clerk: "clerk",
            customer: "customer"
        })
        .config(function ($routeProvider, $locationProvider, cfpLoadingBarProvider, USER_ROLES) {
            cfpLoadingBarProvider.includeSpinner = false;

            $routeProvider
                .when("/", {
                    data: {
                        authorizedRoles: [USER_ROLES.All]
                    },
                    redirectTo: function(params, currPath, currSearch) {

                    }
                })
                .when("/profile/create", {
                    controller: "profileController",
                    controllerAs: "vm",
                    templateUrl: "app/profile/profileCreateView.html",
                    data: {
                        authorizedRoles: [USER_ROLES.customer]
                    }
                })
                .when("/reservations", {
                    controller: "reservationController",
                    controllerAs: "vm",
                    templateUrl: "app/reservation/reservationsView.html",
                    data: {
                        authorizedRoles: [USER_ROLES.clerk, USER_ROLES.customer]
                    }
                })
                .when("/pickups", {
                    controller: "reservationController",
                    controllerAs: "vm",
                    templateUrl: "app/reservation/reservationsView.html",
                    data: {
                        authorizedRoles: [USER_ROLES.clerk]
                    },
                });
        })
        .config(function ($httpProvider) {
            $httpProvider.interceptors.push([
              "$injector",
              function ($injector) {
                  return $injector.get("handy.authInterceptor");
              }
            ]);
        });

    app.run(["$rootScope", "APPSETTINGS", "handy.authService", function ($rootScope, APPSETTINGS, authService) {
        $rootScope.$on("$routeChangeStart", function (event, next) {
            var authorizedRoles = next.data.authorizedRoles;
            if (!authService.isAuthorized(authorizedRoles)) {
                event.preventDefault();
                if (authService.isAuthenticated()) {
                    // user is not allowed
                    $rootScope.$broadcast(APPSETTINGS.AUTH_EVENTS.NotAuthorized);
                } else {
                    // user is not logged in
                    $rootScope.$broadcast(APPSETTINGS.AUTH_EVENTS.NotAuthenticated);
                }
            }
        });
    }]);
}());
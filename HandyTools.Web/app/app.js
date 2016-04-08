(function () {
    "use strict";

    var app = angular
        .module("handytoolsApp", ["ngRoute", "ngAnimate", "ui.bootstrap", "ui.mask", "ngCookies", "trNgGrid", "angular-uuid", "ngSanitize",
            "angular-loading-bar", "ui.event", "handy.services", "APPSETTINGS"])
        .config(function ($routeProvider, cfpLoadingBarProvider, USER_ROLES) {
            cfpLoadingBarProvider.includeSpinner = false;

            $routeProvider
                .when("/account/create", {
                    controller: "profileController as vm",
                    templateUrl: "app/profile/profileCreateView.html",
                    data: {
                        authorizedRoles: [USER_ROLES.NewCustomer]
                    }
                })
                .when("/reservations", {
                    controller: "reservationController as vm",
                    templateUrl: "app/reservation/reservationsView.html",
                    data: {
                        authorizedRoles: [USER_ROLES.Clerk, USER_ROLES.Customer]
                    }
                })
                .when("/tools", {
                    controller: "toolsController as vm",
                    templateUrl: "app/tools/toolsView.html",
                    data: {
                        authorizedRoles: [USER_ROLES.Clerk, USER_ROLES.Customer]
                    }
                })
                .when("/pickups", {
                    controller: "reservationController as vm",
                    templateUrl: "app/reservation/reservationsView.html",
                    data: {
                        authorizedRoles: [USER_ROLES.Clerk]
                    }
                })
                .otherwise({
                    redirectTo: "/",
                    data: {
                        authorizedRoles: [USER_ROLES.Clerk, USER_ROLES.Customer, USER_ROLES.NewCustomer]
                    }
                });
        })
    //.config(function ($httpProvider) {
    //    $httpProvider.interceptors.push([
    //      "$injector",
    //      function ($injector) {
    //          return $injector.get("handy.authInterceptor");
    //      }
    //    ]);
    //});

    app.run(["$rootScope", "$location", "APPSETTINGS", "handy.authService", "handy.session", function ($rootScope, $location, APPSETTINGS, authService, session) {
        $rootScope.$on("$routeChangeStart", function (event, next) {
            var authorizedRoles = next.data && next.data.authorizedRoles;
            var path = next.originalPath || next.redirectTo;
            if (!authService.isAuthorized(authorizedRoles) && path !== "/") {
                if (path === APPSETTINGS.ApplicationPaths.CreateProfile) {
                    return;
                }

                event.preventDefault();
                if (authService.isAuthenticated()) {
                    // user is not allowed
                    $rootScope.$broadcast(APPSETTINGS.AUTH_EVENTS.NotAuthorized);
                } else {
                    // user is not logged in
                    $rootScope.$broadcast(APPSETTINGS.AUTH_EVENTS.NotAuthenticated);
                }

                return authService.redirectTo("home");
            } else {
                authService.redirectTo(session.userRole);
            }
        });

        $rootScope.$on("routeChangeSuccess", function (event, current, previous, rejection) {
            console.log($scope, $rootScope, $route, $location);
        });
    }]);
}());
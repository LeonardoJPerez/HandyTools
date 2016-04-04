(function () {
    "use strict";

    var app = angular
        .module("handytoolsApp", ["ngRoute", "ngAnimate", "ngCookies", "angular-loading-bar", "ui.event", "datatables", "handy.services", "APPSETTINGS"])
        .config(function ($routeProvider, cfpLoadingBarProvider, USER_ROLES) {
            cfpLoadingBarProvider.includeSpinner = false;

            $routeProvider
                 .when("/login", {
                     controller: "loginController",
                     controllerAs: "login",
                     templateUrl: "app/login/loginView.html",
                     data: {
                         authorizedRoles: [USER_ROLES.Clerk, USER_ROLES.Customer]
                     }
                 })
                .when("/account/create", {
                    controller: "profileController",
                    controllerAs: "profile",
                    templateUrl: "app/profile/profileCreateView.html",
                    data: {
                        authorizedRoles: [USER_ROLES.Customer]
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
                    controller: "reservationController",
                    controllerAs: "pickups",
                    templateUrl: "app/reservation/reservationsView.html",
                    data: {
                        authorizedRoles: [USER_ROLES.Clerk]
                    }
                })
                .otherwise({ redirectTo: "/" });
        })
        .config(function ($httpProvider) {
            $httpProvider.interceptors.push([
              "$injector",
              function ($injector) {
                  return $injector.get("handy.authInterceptor");
              }
            ]);
        });

    app.run(["$rootScope", "$location", "APPSETTINGS", "handy.authService", function ($rootScope, $location, APPSETTINGS, authService) {
        $rootScope.$on("$routeChangeStart", function (event, next) {
            var authorizedRoles = next.data && next.data.authorizedRoles;
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

        $rootScope.$on("routeChangeSuccess", function (event, current, previous, rejection) {
            console.log($scope, $rootScope, $route, $location);
        });
    }]);
}());
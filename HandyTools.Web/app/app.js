(function () {
    "use strict";

    var app = angular
        .module("handytoolsApp", [
            "ngRoute", "ngAnimate", "ui.bootstrap", "ui.mask", "ngCookies", "trNgGrid", "angular-uuid", "ngSanitize",
            "angular-loading-bar", "ui.bootstrap.datetimepicker", "toaster", "ui.event", "angular-momentjs", "handy.services", "APPSETTINGS"
        ])
        .config(function ($routeProvider, cfpLoadingBarProvider, USER_ROLES) {
            cfpLoadingBarProvider.includeSpinner = false;

            $routeProvider
                .when("/account/create", {
                    controller: "profileController as vm",
                    templateUrl: "app/profile/profileFormView.html",
                    data: {
                        authorizedRoles: [USER_ROLES.NewCustomer]
                    }
                })
                .when("/reservations", {
                    controller: "reservationsController as vm",
                    templateUrl: "app/reservation/reservationsView.html",
                    data: {
                        authorizedRoles: [USER_ROLES.Clerk, USER_ROLES.Customer]
                    }
                })
                .when("/reservation/create", {
                    controller: "reservationCreateController as vm",
                    templateUrl: "app/reservation/reservationCreateView.html",
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
                 .when("/profile", {
                     controller: "profileController as vm",
                     templateUrl: "app/profile/profileFormView.html",
                     data: {
                         authorizedRoles: [USER_ROLES.Customer]
                     }
                 })
                .when("/clerk/dashboard", {
                    controller: "clerkDashboardController as vm",
                    templateUrl: "app/clerk/clerkDashboardView.html",
                    data: {
                        authorizedRoles: [USER_ROLES.Clerk]
                    }
                })
                 .when("/clerk/tools-management", {
                     controller: "clerkToolController as vm",
                     templateUrl: "app/clerk/clerkToolView.html",
                     data: {
                         authorizedRoles: [USER_ROLES.Clerk]
                     }
                 })              
                .when("/clerk/reports/inventory-report", {
                    controller: "inventoryReportController as vm",
                    templateUrl: "app/clerk/reports/inventoryReportView.html",
                    data: {
                        authorizedRoles: [USER_ROLES.Clerk]
                    }
                })
                .when("/clerk/reports/customer-report", {
                    controller: "customerReportController as vm",
                    templateUrl: "app/clerk/reports/customerReportView.html",
                    data: {
                        authorizedRoles: [USER_ROLES.Clerk]
                    }
                })
                .when("/clerk/reports/clerk-report", {
                    controller: "clerkReportController as vm",
                    templateUrl: "app/clerk/reports/clerkReportView.html",
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
        });

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
                if (path === "/") { authService.redirectTo(session.userRole); }
            }
        });

        $rootScope.$on("routeChangeSuccess", function (event, current, previous, rejection) {
            console.log($scope, $rootScope, $route, $location);
        });
    }]);
}());
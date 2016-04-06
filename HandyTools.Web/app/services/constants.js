(function () {
    "use strict";

    angular.module("APPSETTINGS", [])
        .constant("APPSETTINGS",
        {
            ApiServerUrl: "http://localhost:62581/",
            CurrentServerUrl: "http://localhost:49460/",
            ApplicationPaths: {
                ClerkHome: "/pickups",
                CustomerHome: "/reservations",
                CreateProfile: "/account/create"
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
            Clerk: "clerk",
            Customer: "customer",
            NewCustomer: "Newcustomer"
        });
}());
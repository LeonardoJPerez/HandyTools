(function () {
    "use strict";

    angular.module("APPSETTINGS", [])
        .constant("APPSETTINGS",
        {
            ApiServerUrl: "@@APISERVERURL",
            CurrentServerUrl: "@@CURRENTSERVERURL",
            ApplicationPaths: {
                ClerkHome: "/clerk/dashboard",
                CustomerHome: "/reservations",
                CreateProfile: "/account/create",
                CreateReservation: "/reservation/create"
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
            Clerk: "Clerk",
            Customer: "Customer",
            NewCustomer: "NewCustomer"
        });
}());
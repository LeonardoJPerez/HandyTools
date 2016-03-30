﻿(function () {
    "use strict";

    angular
        .module("handy.services")
        .factory("currentUser", ["$cookies", "$window", "appSettings", currentUser]);

    function currentUser($cookies, $window, appSettings) {
        var self = this;

        var defaultProfile = {
            isLoggedIn: false,
            userName: "",
            userType: "customer"
        };

        var setProfile = function (username, userType) {
            var profile = defaultProfile;
            profile.isLoggedIn = true;
            profile.userName = username;
            profile.userType = userType;

            $cookies.putObject("profile", profile);
        };

        var getProfile = function () {
            var profile = $cookies.getObject("profile") || defaultProfile;
            return profile;
        };

        var clearUserSession = function () {
            $cookies.remove("profile");
            return $window.location = "/";
        };

        var redirectToHome = function () {
            var profile = getProfile();
            switch (profile.userType) {
                case "customer":
                    return $window.location = appSettings.ApplicationPaths.CustomerHome;
                case "clerk":
                    return $window.location = appSettings.ApplicationPaths.ClerkHome;
                default:
                    return $window.location = "/";
            }
        }

        return {
            getProfile: getProfile,
            setProfile: setProfile,
            redirectToHome: redirectToHome,
            clearUserSession: clearUserSession
        };
    }
}());
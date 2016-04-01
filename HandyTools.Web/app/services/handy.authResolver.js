(function () {
    "use strict";

    angular
        .module("handytoolsApp")
        .factory("authResolver", ["$q", "$rootScope", "$route", function ($q, $rootScope, $route) {
            return {
                resolve: function () {
                    var deferred = $q.defer();
                    var unwatch = $rootScope.$watch("currentUser", function (currentUser) {
                        if (angular.isDefined(currentUser)) {
                            if (currentUser) {
                                console.log(currentUser);
                                deferred.resolve(currentUser);
                            } else {
                                deferred.reject();
                                $route.go("/login");
                            }
                            unwatch();
                        }
                    });
                    return deferred.promise;
                }
            };
        }]);
}());
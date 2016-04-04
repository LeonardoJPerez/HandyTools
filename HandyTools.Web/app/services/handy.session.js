(function () {
    "use strict";

    angular
        .module("handy.services")
        .factory("handy.session", ["$cookies", function ($cookies) {
            var _sessionService = {
                sessionId: $cookies.get('sessionId'),
                userId: $cookies.get('userId'),
                userRole: $cookies.get('userRole')
            };

            _sessionService.create = function (sessionId, userId, userRole) {
                // Check cookie and add if necessary.
                if (!$cookies.get('sessionId')) {
                    $cookies.put('sessionId', sessionId);
                }

                if (!$cookies.get('userId')) {
                    $cookies.put('userId', userId);
                }

                if (!$cookies.get('userRole')) {
                    $cookies.put('userRole', userRole);
                }

                _sessionService.id = $cookies.get('sessionId');
                _sessionService.userId = $cookies.get('userId');
                _sessionService.userRole = $cookies.get('userRole');
            };

            _sessionService.destroy = function () {
                $cookies.remove('sessionid');
                $cookies.remove('userId');
                $cookies.remove('userRole');

                _sessionService.id = null;
                _sessionService.userId = null;
                _sessionService.userRole = null;
            };

            return _sessionService;
        }]);
}());
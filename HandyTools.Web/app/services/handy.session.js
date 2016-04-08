(function () {
    "use strict";

    angular
        .module("handy.services")
        .factory("handy.session", ["$cookies", "uuid", function ($cookies, uuid) {
            var _sessionService = {
                sessionId: $cookies.get('sessionId'),
                userName: $cookies.get('userId'),
                userRole: $cookies.get('userRole')
            };

            var saveData = [];

            _sessionService.saveData = function (data) {
                var key = containsData(data, saveData) || uuid.v4();
                saveData.push({ k: key, v: data });
            };

            _sessionService.getData = function (data) {
            };

            _sessionService.createUserCookie = function (userId, userRole) {
                // Check cookie and add if necessary.
                if (!$cookies.get('sessionId')) {
                    $cookies.put('sessionId', uuid.v4());
                }

                $cookies.put('userId', userId);
                $cookies.put('userRole', userRole);

                _sessionService.sessionId = $cookies.get("sessionId");
                _sessionService.userName = $cookies.get("userId");
                _sessionService.userRole = $cookies.get("userRole");
            };

            _sessionService.destroyUserCookie = function () {
                $cookies.remove('sessionId');
                $cookies.remove('userId');
                $cookies.remove('userRole');

                _sessionService.sessionId = null;
                _sessionService.userName = null;
                _sessionService.userRole = null;
            };

            // Returns the key to the hash value.
            function containsData(obj, list) {
                var i;
                for (i = 0; i < list.length; i++) {
                    if (JSON.stringify(list[i].v) === JSON.stringify(obj)) {
                        return list[i].k;
                    }
                }

                return undefined;
            }

            return _sessionService;
        }]);
}());
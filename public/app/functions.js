CetiInv.factory('toolsFactory', ['$rootScope', '$auth', '$q', '$cookies', '$window', 'SysAdmin', '$http', function($rootScope, $auth, $q, $cookies, $window, SysAdmin, $http) {

    $rootScope.token = "";

    var socket = io.connect('http://localhost:8080', {
        query: {
            token: $window.localStorage.getItem('sock')
        }
    });

    socket.emit('user-connected', 'dsfsdf');

    socket.on('message', function(data) {

        console.log(data);
    });
    return {
        validateHeaders: function(headerNames) {

            var listError = [];
            var stringErr = '';

            for (var it = 0; it < headerNames.length; it++) {
                if (headerNames[it].indexOf(' ') > 0) {
                    listError.push(headerNames[it].replace(/ /g, ''));
                }
            }
            if (listError.length > 0) {
                for (var it = 0; it < listError.length; it++) {
                    if (it == listError.length - 1) {
                        stringErr += listError[it];
                    } else {
                        stringErr += listError[it] + ', '
                    }
                }
                return $q.reject('Hay espacios en los siguientes encabezados del archivos de excel : ' + stringErr);
            } else {
                return $q.resolve('Campos Validos');
            }
        },
        on: function(eventName, callback) {
            socket.on(eventName, callback);
        },
        emit: function(eventName, data) {
            socket.emit(eventName, data);
        },
        validate: function() {

            if (!$auth.isAuthenticated()) {
                $window.localStorage.clear();
                return $q.reject(false);
            } else {
                return $q.resolve(true);
            }
        },
        isManagerApp: function() {
            if ($auth.isAuthenticated() && localStorage.getItem('type') == 1) {
                console.log(localStorage.getItem('type'));
                return $q.resolve(true);
            } else {
                $window.localStorage.clear();
                return $q.reject(false);
            }
        },

        isUserApp: function() {
            if ($auth.isAuthenticated() && localStorage.getItem('type') == 2) {
                console.log(localStorage.getItem('type'));
                return $q.resolve(true);
            } else {
                $window.localStorage.clear();
                return $q.reject(false);
            }
        },
        validateCookies: function() {

            if ($window.localStorage.getItem('req') !== null && $window.localStorage.getItem('sock') !== null) {
                console.log("aqui no entra");
                return $q.reject(false, "ya hay valores");
            } else {
                return $q.resolve(true);
            }
        }
    }
}]);
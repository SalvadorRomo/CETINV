CetiInv
    .controller('mainController', function($auth, $state, toolsFactory, $http, $rootScope, $scope, SysAdmin, $cookies, $window) {

        $scope.checkToken = function() {
            return $auth.isAuthenticated();
        }

        $scope.deniedAcces = function() {
            if ($auth.isAuthenticated() === false) {
                $window.localStorgae.clear();
                $state.go('login');
            }
        }

        $scope.isAdmin = function() {
            if ($auth.isAuthenticated() === true && $window.localStorage.getItem('type') == 1) {
                return true;
            } else {
                return false;
            }
        };

        $scope.isUser = function() {

            if ($auth.isAuthenticated() === true && $window.localStorage.getItem('type') == 2) {
                return true;
            } else {
                return false;
            }
        };

        $scope.access = function() {
            if ($auth.isAuthenticated() === true) {
                $state.go('welcome');
            } else {
                $window.localStorage.clear();
            }
        }
        $scope.logout = function() {
            $window.localStorage.clear();
            $state.go('login');

        }

    });
CetiInv
    .controller('AuthController', function($auth, $state, $http, $rootScope, $scope, SysAdmin, toolsFactory, $window) {

        $scope.new = {};
        $scope.loginError = false;
        $scope.loginErrorText = '';

        $scope.init = function() {
            $scope.access();
        }

        $scope.checkToken = function() {
            if ($auth.isAuthenticated() === false) {
                $window.localStorage.clear();
                state.go('login');
            }
        }

        $scope.loginUser = function() {

            $auth.login($scope.login).then(function() {
                return SysAdmin.Log.login($scope.login).$promise.then(
                    function(response) {
                        localStorage.setItem('type', response.user.idtype);
                        $state.go('welcome');
                    },
                    function(response) {

                    }
                )

            }, function(error) {
                $scope.loginError = true;
                $scope.loginErrorText = error.data.error;

            }).then(function(response) {
                $rootScope.currentUser = response.data.user;
                $scope.loginError = false;
                $scope.loginErrorText = '';
            });
        }

        $scope.provarScok = function() {
            toolsFactory.emit('user-connected', 'jk');
        };

    });
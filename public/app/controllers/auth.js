CetiInv
    .controller('AuthController',  function($auth,$state,$http,$rootScope,$scope, SysAdmin) {

    $scope.new={};
    $scope.loginError=false;
    $scope.loginErrorText='';

        $scope.checkToken = function(){
            if($auth.isAuthenticated() === false){
                state.go('login');
            }
        }    
    
        $scope.loginUser = function() {

            $auth.login($scope.login).then(function() {
                return SysAdmin.Log.login($scope.login).$promise.then(
                    function(response){
                        $state.go('welcome');
                    },
                    function(response){

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

        $scope.registerUser = function () {
           console.log($scope.new);

            SysAdmin.User.register($scope.new).$promise.then(
                function(response){
                    alert("Entro al server");
                    $state.go('login');
                },
                function(response){
                    alert("Error :(");

                }
            )
        };
    });
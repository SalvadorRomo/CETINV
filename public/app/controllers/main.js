CetiInv
    .controller('mainController',  function($auth,$state,$http,$rootScope,$scope, SysAdmin) {
        
        $scope.checkToken = function(){
            return $auth.isAuthenticated();
        }
        
        $scope.deniedAcces = function(){
            if($auth.isAuthenticated() === false){
                $state.go('login');
            }
        }
        $scope.logout = function(){
                localStorage.clear(); 
                $state.go('login');
        }


    });
CetiInv
.controller('welcomeController',  function($auth,$state,$http,$rootScope,$scope, SysAdmin,toolsFactory) {

    $scope.init = function(){ 
      
    toolsFactory.validate()
        .then(function(succes){	
            SysAdmin.User.connect('').$promise.then(
                function(response){
                 
               },
               function(response){
                      
               }
             );         
        },
        function(error){	
          alert("no tienes los permisos para entrar aqui");
          $state.go('login');
        });
     
    }
});
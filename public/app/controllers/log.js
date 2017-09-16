CetiInv.controller('logController',['$scope', '$http', '$location','toaster','Api',
function($scope, $http, $location, toaster, Api){

    $scope.auth = {}

    $scope.login = function (){

        Api.access.login($scope.auth).$promise.then(
            function(response){
                
            },
            function(response){

            }
        )
    }	

}]);
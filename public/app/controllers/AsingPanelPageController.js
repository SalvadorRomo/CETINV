CetiInv.controller('AsingPanelPageController',['$scope', '$http', '$location','toaster',
function($scope, $http, $location, $routeParams,toaster){

    $scope.data = []; 
    $scope.ids = [];
    $scope.init = function(){
        $scope.deniedAcces();
        
        $http({
            method: 'Get',
            url  	: '/getRecordsCount'
       })
       .then(function successCallback(response) {
       
           $scope.data = response.data.cont;
           $scope.ids = response.data.ids;
            console.log($scope.ids);
            console.log($scope.data);
        
         }, function errorCallback(response) {
           console.log(response);			    
           
        });

    }

}]);
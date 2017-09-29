CetiInv.controller('CreateItemPageController',['$scope', '$http', '$location','toaster',
		function($scope, $http, $location, $routeParams, toaster){
		
			$scope.init = function(){
				$scope.deniedAcces();
			}
	
			$scope.insertGoodsProduct = function ( products){	
	
				$http({
				   	  method: 'Post',
					  url  	: '/insert',
					  data 	:  {data: products}
					})
					.then(function successCallback(response) {									
							
						toaster.pop({
									type: 'info',
									title: 'archivos agreagdos',
									body: response.data,
									timeout: 3000
								});		
								
						$scope.Product = null;	    

					  }, function errorCallback(response) {
					    console.log(response);			    
					    
					 });

				};

}]);
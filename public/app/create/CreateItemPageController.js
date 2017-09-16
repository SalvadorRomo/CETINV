CetiInv.controller('CreateItemPageController',['$scope', '$http', '$location','toaster',
		function($scope, $http, $location, $routeParams,toaster){

	$scope.insertGoodsProduct = function ( products, invoice ,invoiceDetail , goods){	

				$("#calendar").datepicker({
				    onSelect: function() { 
				        goods.date = $(this).datepicker('getDate'); 
				    }
				});
				var objects = { products, invoice, invoiceDetail, goods};	
				console.log(objects);				
				$http({
				   	  method: 'Post',
					  url  	: 'insert',
					  data 	:  objects
					})
					.then(function successCallback(response) {
					
						$scope.Product = null;	    
						toaster.pop('!Exito', "Elemento agregado", "Elemento ha sido agregado");

					  }, function errorCallback(response) {
					    console.log(response);			    
					    
					 });

				};

}]);
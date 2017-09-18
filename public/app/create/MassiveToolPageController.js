CetiInv.controller('MassiveToolPageController',['$scope','toaster','$http','ExcelValidation', function($scope, toaster , $http ,ExcelValidation){

	$scope.data = [];
	$scope.show = false;
	$scope.headers = [];
	$scope.read = function(workbook){
		
		var listError = []; 
		var stringErr = '';
		var headerNames = XLSX.utils.sheet_to_json( workbook.Sheets[workbook.SheetNames[0]], { header: 1 })[0];	
		var	value = XLSX.utils.sheet_to_json( workbook.Sheets[workbook.SheetNames[0]]);
		console.log(value);
		ExcelValidation.validateHeaders(headerNames)
			.then(function(succes){	

				$scope.data = value;
				$scope.headers = headerNames;		    		
			},
			function(error){	
				
				toaster.pop({
					type: 'error',
					title: 'Error de espacios en cabecera',
					body: error,
					timeout: 3000
				});		
			});
			
		
			
	};
	
		$scope.addMultipleRecordsProducts = function( arr,headers ){

			console.log(arr);
				$http({
				   	  method: 'Post',
					  url  	: 'insertMultipleRecords',
					  data 	:  { data  : arr ,
							    head  : headers }
					})
					.then(function successCallback(response) {
					
						$scope.Product = null;	    
						toaster.pop('!Exito', "Elemento agregado", "Elemento ha sido agregado");

					  }, function errorCallback(response) {
					    console.log(response);			    
					    
					 });

				};


	
}]);
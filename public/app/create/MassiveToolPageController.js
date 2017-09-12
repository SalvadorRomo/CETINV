CetiInv.controller('MassiveToolPageController',['$scope','toaster','$http', function($scope, toaster , $http){

	$scope.data = [];
	$scope.show = false;
	
	$scope.read = function(workbook){
		
		var listError = []; 
		var stringErr = '';
		var headerNames = XLSX.utils.sheet_to_json( workbook.Sheets[workbook.SheetNames[0]], { header: 1 })[0];
		var	value = XLSX.utils.sheet_to_json( workbook.Sheets[workbook.SheetNames[0]]);
		for(var it = 0; it < headerNames.length ; it ++){
					if(headerNames[it].indexOf(' ') > 0){
						listError.push(headerNames[it].replace(/ /g,''));
				}
	    	}
	     if(listError.length > 0 ){
	    		for(var it = 0; it < listError.length ; it ++){
						if(it == listError.length - 1){
							stringErr += listError[it];
						}
						else{
						stringErr += listError[it] + ', '
					}
	    		}

	    	$scope.tostr(stringErr);
	    	$scope.$apply();	

	    	}else{
					$scope.data = value;		    		
					$scope.$apply();
	    	}
	};

	$scope.tostr = function(strError){
		toaster.pop({
                type: 'error',
                title: 'Hay espacios en los siguientes encabezados del archivos de excel',
                body: strError,
                timeout: 3000
            });
		};

		$scope.addMultipleRecordsProducts = function( arr ){

			console.log(arr);
				$http({
				   	  method: 'Post',
					  url  	: '/insertMultipleRecords',
					  data 	:  { data : arr}
					})
					.then(function successCallback(response) {
					
						$scope.Product = null;	    
						toaster.pop('!Exito', "Elemento agregado", "Elemento ha sido agregado");

					  }, function errorCallback(response) {
					    console.log(response);			    
					    
					 });

				};


	
}]);
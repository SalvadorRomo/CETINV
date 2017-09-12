//defines the 'CetiInv' module,
var CetiInv = angular.module('CetiInv', ['ngRoute','toaster', 'ngAnimate' ,'angular-js-xlsx']); 

CetiInv.config(function($routeProvider){
	$routeProvider 
		.when('/InsertRecords' , {
				templateUrl : 'app/create/CreateRecord.template.htm',
				controller  : 'CreateItemPageController' 
		})
		.when('/InsertMassiveRecord' , {
				templateUrl : 'app/create/CreateMassiveRecord.template.htm'				
		})
		 .otherwise({
               redirectTo: '/'
        });
});
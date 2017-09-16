CetiInv
	.factory('Api', ['$resource', function($resource){
		return {
			access: $resource('/', {}, {

				login: {
					method: 'POST',
					data: {data:'@data'},
					isArray: false,
					url: 'login'
				}
			})
		};
	}])
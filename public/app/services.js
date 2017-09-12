CetiInv.factory('Info', ['$resource', function($resource){
	return {
		data: $resource('/', {}, {

			getStates: {	//	GENERAL - obtiene los estados de un país determinado
				method: 'GET',
				data: {},
				isArray: false,
				url: _baseurl + 'cakeController/function'
			}
		})
	};
}])
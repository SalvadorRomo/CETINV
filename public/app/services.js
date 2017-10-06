CetiInv
	.factory('SysAdmin', ['$resource', function($resource){
		return {
			Log: $resource('/', {}, {
				login: {	
					method: 'POST',
					data: {user:'@user'},
					isArray: false,
					url: '/login'
				}
			}),
			User: $resource('/', {}, {
				register: {	
					method: 'POST',
					data: {user:'@user'},
					isArray: false,
					url: '/register'
				}, 
				connect :{
					method:'POST', 
					data:{user : '@data'},
					isArray:false, 
					url: '/conncect'

				}
			})
		};
	}])
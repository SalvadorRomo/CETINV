CetiInv
    .factory('SysAdmin', ['$resource', function($resource) {
        return {
            Log: $resource('/', {}, {
                login: {
                    method: 'POST',
                    data: { user: '@user' },
                    isArray: false,
                    url: '/login'
                }
            }),
            User: $resource('/', {}, {
                register: {
                    method: 'POST',
                    data: { user: '@user' },
                    isArray: false,
                    url: '/register'
                },
                connect: {
                    method: 'POST',
                    data: { user: '@data' },
                    isArray: false,
                    url: '/conncect'

                },
                types: {
                    method: 'GET',
                    isArray: false,
                    url: '/getUsersType'

                },
                assign: {

                    method: 'post',
                    data: { data: '@data' },
                    isArray: false,
                    url: ' /assign'
                }

            }),
            API: $resource('/', {}, {
                connectSocket: {
                    method: 'POST',
                    data: { token: '@data' },
                    isArray: false,
                    url: 'http://localhost:8080/registerUser'
                }
            })
        };
    }]);
CetiInv
    .controller('welcomeController', function($auth, $state, $http, $rootScope, $scope, SysAdmin, toolsFactory, $cookies, $window) {


        $scope.init = function() {

            toolsFactory.validate()
                .then(function(succes) {
                        console.log("asdasadas");
                        toolsFactory.validateCookies()
                            .then(function(succes) {
                                SysAdmin.User.connect().$promise
                                    .then(function(response) {
                                            console.log(response);
                                            $window.localStorage.setItem('req', response.token);
                                            $http({
                                                    method: 'Post',
                                                    url: 'http://localhost:8080/registerUser',
                                                    data: {
                                                        token: $window.localStorage.getItem('req')
                                                    }
                                                })
                                                .then(function successCallback(response) {
                                                    $window.localStorage.setItem('sock', response.data.token);
                                                    // $state.go('welcome');
                                                    $window.location.reload();
                                                }, function errorCallback(response) {

                                                });
                                        },
                                        function(response) {
                                            consoele.log("no valida nada");
                                        });

                            }, function(error) {

                            });
                    },
                    function(error) {
                        alert("no tienes los permisos para entrar aqui");
                        $window.localStorage.clear();
                        $state.go('login');
                    });
        };

        $scope.provarScok = function(data) {
            toolsFactory.emit('send-message', data);
        };

    });
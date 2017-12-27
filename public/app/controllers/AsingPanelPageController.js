CetiInv.controller('AsingPanelPageController', ['toolsFactory', 'SysAdmin', '$state', '$scope', '$http', '$location', 'toaster', '$window',

    function(toolsFactory, SysAdmin, $state, $scope, $http, $location, $routeParams, toaster, $window) {

        $scope.data = [];
        $scope.ids = [];
        $scope.newArray = [];
        $scope.managers = [];
        //$scope.new.id_item = 0;
        //$scope.new.id_area = 0;

        $scope.init = function() {

            toolsFactory.isUserApp()
                .then(function(success) {
                    $http({
                            method: 'Get',
                            url: '/getRecordsCount'
                        })
                        .then(function successCallback(response) {
                            $scope.data = response.data.prod;
                            $scope.ids = response.data.ids;
                            $scope.managers = response.data.manag;
                            $scope.createArray(response.data.ids, response.data.prod);
                        }, function errorCallback(response) {
                            console.log(response);
                        });

                }, function(error) {
                    $state.go('login');
                });
        };

        $scope.assign = function(idArea, value) {
            console.log(idArea);
            console.log(value);
            if (confirm("En verdad quieres proceder con esta operacion")) {
                alert("pues siempre si");
                SysAdmin.User.assign({ id_area: idArea, id_item: value }).$promise.then(
                    function(response) {
                        console.log(response);
                        var data = {
                            idManager: response.idManager,
                            message: "te han asigando bienes"
                        };
                        toolsFactory.emit('send-message', data);
                    },
                    function(response) {
                        alert("Error :(");

                    }
                );

            } else {
                alert("neel ´perro no se va agregar ni madres");
            }

        };

        $scope.createArray = function(arr_1, arr_2) {

            for (var i = 0; i < arr_1.length; i++) {
                var res = arr_1[i].split(' ');
                $scope.newArray.push({ key: res[0], value: $scope.data[res[1]] });
            }

        };
    }
]);
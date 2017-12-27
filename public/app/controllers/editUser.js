CetiInv
    .controller('editUserController', function($auth, $state, $http, $rootScope, $scope, SysAdmin, toolsFactory, $window) {


        $scope.isManager = false;
        $scope.isUser = false;
        $scope.isInventory = false;
        $scope.admin = 0;
        $scope.types = [];
        $scope.areas = [];
        $scope.manag = [];

        /**Function to retrive list of manager , roles areas */
        $scope.init = function() {
            toolsFactory.isManagerApp().then(function(success) {
                    SysAdmin.User.types().$promise.then(
                        function(response) {

                            $scope.types = response.ids;
                            $scope.areas = response.areas_ceti;
                            $scope.manag = response.managers;
                            $scope.admin = response.admin;
                        },
                        function(response) {
                            console.log(response);
                            console.log("porquw");
                            alert(response);
                        }
                    );
                },
                function(error) {
                    $state.go("welcome");
                });
        };

        /**  switch beetween users , managers and inventory manager */
        $scope.change = function(value) {

            if (value == 2) {

                $scope.isUser = false;
                $scope.isInventory = true;
                $scope.isManager = false;
                $scope.new.manager = false;
                $scope.new.idtype = value;
                $scope.new.area = 0;

            } else if (value == 3) {

                $scope.isUser = false;
                $scope.isInventory = false;
                $scope.isManager = true;
                $scope.new.manager = true;
                $scope.new.idtype = value;

            } else if (value == 4) {

                $scope.isUser = true;
                $scope.isInventory = false;
                $scope.isManager = false;
                $scope.new.manager = false;
                $scope.new.idtype = value;
                $scope.new.area = 0;
            }
        };
        /** Event to select an areas */
        $scope.changeArea = function(obj) {
            $scope.new.idarea = obj;
            console.log($scope.new.idarea);
        }

        /** Event to select a manager */
        $scope.changeManag = function(obj) {
            $scope.new.manager_id = obj;
            console.log($scope.new.manager_id);
        }

        /** Event to register a specific user */
        $scope.registerUser = function(obj) {

            if ($scope.isManager && obj.idarea === undefined) {

                alert("Campo Vacio");

            } else if ($scope.isManager && obj.idarea !== undefined) {

                obj.manager_id = $scope.admin;
                SysAdmin.User.register(obj).$promise.then(
                    function(response) {
                        alert("Entro al server");
                        $state.go('login');
                    },
                    function(response) {
                        alert("Error :(");

                    }
                );
            }
            if ($scope.isUser && obj.manager_id === undefined) {
                alert("Campo Vacio");
            } else if ($scope.isUser && obj.manager_id !== undefined) {
                SysAdmin.User.register(obj).$promise.then(
                    function(response) {
                        alert("Entro al server");
                        $state.go('login');
                    },
                    function(response) {
                        alert("Error :(");

                    }
                );

            } else if ($scope.isInventory) {
                obj.manager_id = $scope.admin;
                SysAdmin.User.register(obj).$promise.then(
                    function(response) {
                        alert("Entro al server");
                        $state.go('login');
                    },
                    function(response) {
                        alert("Error :(");

                    }
                );
            }
        };

    });
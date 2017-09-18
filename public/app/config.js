CetiInv
    .config(function ($stateProvider, $urlRouterProvider){

        $stateProvider
            .state ('login', {
                url: '/Login',
                templateUrl: 'app/views/index.html'
            })
            .state ('InsertRecords', {
                url: '/Agregar-Productos',
                templateUrl: 'app/create/CreateRecord.template.htm',
                controller: 'CreateItemPageController'
            })
            .state ('InsertMassiveRecord', {
                url: '/Alta-masiva-productos',
                templateUrl: 'app/create/CreateMassiveRecord.template.htm',
                controller: 'MassiveToolPageController'
            })
            .state('AsingGoodness', {
                url : '/Asignar-bienes', 
                templateUrl:'app/views/AssignPanel.html', 
                controller : 'AsingPanelPageController'
            });
            
            $urlRouterProvider.otherwise("/Login");
    });
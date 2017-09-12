CetiInv
    .config(function ($stateProvider, $urlRouterProvider){

        $stateProvider
            .state ('InsertRecords', {
                url: '/Agregar-Productos',
                templateUrl: 'app/create/CreateRecord.template.htm',
                controller: 'CreateItemPageController'
            })
            .state ('InsertMassiveRecord', {
                url: '/Alta-masiva-productos',
                templateUrl: 'app/create/CreateMassiveRecord.template.htm',
                controller: 'MassiveToolPageController'
            });
            
            $urlRouterProvider.otherwise("/");
    });
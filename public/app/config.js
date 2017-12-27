CetiInv
    .config(function($stateProvider, $urlRouterProvider, $authProvider) {

        $stateProvider
            .state('login', {
                url: '/Login',
                templateUrl: 'app/views/index.html'
            })
            .state('InsertRecords', {
                url: '/Agregar-Productos',
                templateUrl: 'app/views/CreateRecord.template.htm',
                controller: 'CreateItemPageController'
            })
            .state('InsertMassiveRecord', {
                url: '/Alta-masiva-productos',
                templateUrl: 'app/views/CreateMassiveRecord.template.htm'
            })
            .state('AsingGoodness', {
                url: '/Asignar-bienes',
                templateUrl: 'app/views/AssignPanel.html',
                controller: 'AsingPanelPageController'
            })
            .state('register', {
                url: '/Registro-usuarios',
                templateUrl: 'app/views/register.html'
            })
            .state('welcome', {
                url: '/Binvenido',
                templateUrl: 'app/views/welcome.html'

            });

        $authProvider.loginUrl = 'validation';
        $urlRouterProvider.otherwise("/Login");
    });
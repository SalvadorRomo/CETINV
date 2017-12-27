<!DOCTYPE html>
<html lang="es" ng-app = "CetiInv">
  <head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>CETI Inventarios</title>

    <!-- CSS -->    
    <link href="https://framework-gb.cdn.gob.mx/qa/assets/styles/main.css" rel="stylesheet">
    <link href="//cdnjs.cloudflare.com/ajax/libs/angularjs-toaster/2.1.0/toaster.css" rel="stylesheet" />

    <!-- Respond.js soporte de media queries para Internet Explorer 8 -->
    <!-- ie8.js EventTarget para cada nodo en Internet Explorer 8 -->
    <!--[if lt IE 9]>
      <script src="https://oss.maxcdn.com/respond/1.4.2/respond.min.js"></script>
      <script src="https://cdnjs.cloudflare.com/ajax/libs/ie8/0.2.2/ie8.js"></script>
    <![endif]-->

  </head>
  <body data-ng-controller="mainController">
    <!-- Contenido -->
    <main class="page">
    <!-- navigation bar --> 
      <nav class="navbar navbar-inverse sub-navbar navbar-fixed-top" data-ng-cloak>
        <div class="container">
          <div class="navbar-header">
            <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#subenlaces">
              <span class="sr-only">Interruptor de Navegación</span>
              <span class="icon-bar"></span>
              <span class="icon-bar"></span>
              <span class="icon-bar"></span>
            </button>
            <a class="navbar-brand" href="/">CETI Inventarios</a>
          </div>
          <div data-ng-if="!checkToken()==false" class="collapse navbar-collapse" id="subenlaces" >
            <ul class="nav navbar-nav navbar-right">
              <li class="dropdown">
                <a  class="dropdown-toggle" data-toggle="dropdown" role="button" aria-expanded="false">Opciones<span class="caret"></span></a>
                <ul class="dropdown-menu" role="menu">
                  <li data-ng-hide="!isUser()"><a ui-sref="InsertRecords">Altas</a></li>
                  <li data-ng-hide="!isUser()"><a ui-sref="InsertMassiveRecord">Altas Masivas</a></li>
                  <li data-ng-hide="!isUser()"><a ui-sref="AsingGoodness"> Asignar Bienes</a></li>
                  <li data-ng-hide="!isAdmin()"><a ui-sref="register"> Registar Usaurios</a></li>               
                </ul>
              </li>
             <li><a data-ng-if="!checkToken()==false" href="" data-ng-click="logout()">Salir</a></li>               
            </ul>
          </div>
        </div>
    </nav>
      <div class="container">
      <!-- form Insert -->     
          <data data-ui-view></data>

          </div>        
        </main>
   
    <!-- JS --> 
    
    <script src="<?= asset('js/angular/angular.min.js') ?>"></script>
    <script src="<?= asset('js/angular/angular-route.min.js') ?>"></script>
    <script src="<?= asset('js/jquery-3.2.1.min.js') ?>"></script> 
    <script src="https://framework-gb.cdn.gob.mx/qa/gobmx.js"></script>
    <script src="https://framework-gb.cdn.gob.mx/assets/scripts/jquery-ui-datepicker.js"></script>
    <script src="<?= asset('js/angular/angular-animate.min.js') ?>" ></script>
    <script src="<?= asset('js/angular/angular-cookies.min.js') ?>" ></script>
    <script src="<?= asset('js/angular/angular-resource.min.js') ?>" ></script>
    <script src="<?= asset('js/angular/angular-ui-router.min.js') ?>" ></script>
    <script src="<?= asset('js/angular/satellizer.js') ?>" ></script>

    <!-- Excel Angular -->
    <script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/xlsx/0.9.13/xlsx.full.min.js"></script>
    <script type="text/javascript" src="//unpkg.com/angular-js-xlsx/angular-js-xlsx.js"></script>

    <!-- Toasters -->  
    <script src="https://cdnjs.cloudflare.com/ajax/libs/angularjs-toaster/1.1.0/toaster.min.js"></script>

    <!-- Angular Files --> 
    <script src="<?= asset('app/app.module.js') ?>"></script>
    <script src="<?= asset('app/config.js') ?>"></script>
    <script src="<?= asset('app/services.js') ?>"></script>
    <script src="<?= asset('app/functions.js')?>"></script>
    
    <script src="<?= asset('app/controllers/CreateItemPageController.js') ?>"></script>
    <script src="<?= asset('app/controllers/MassiveToolPageController.js')?>"></script>
    <script src="<?= asset('app/controllers/AsingPanelPageController.js')?>"></script>
    <script src="<?= asset('app/controllers/auth.js')?>"></script>
    <script src="<?= asset('app/controllers/main.js')?>"></script>
    <script src="<?= asset('app/controllers/welcome.js')?>"></script>
    <script src="<?= asset('app/controllers/editUser.js')?>"></script>
    
    <script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/xlsx/0.9.13/xlsx.full.min.js"></script>
    <script type="text/javascript" src="//unpkg.com/angular-js-xlsx/angular-js-xlsx.js"></script>
    <script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/socket.io/2.0.3/socket.io.js"></script>	

    <!-- Extension Files --> 
    <script src="<?= asset('js/calendar.js') ?>"></script>



  </body>
</html>   
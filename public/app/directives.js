CetiInv

.directive('jsPaginacion', function() {
    return {
      restrict: 'E',
      transclude: true,
      scope: {
        limite: '=limite',
        arreglo: '=arreglo',
        inicio: '=inicio',
        busqueda: '=busqueda',
        cambio: '=cambio'
      },
      templateUrl:"app/views/jsPaginacion.html",
      controller: "JSPaginacionController",
      replace: false
    };
});
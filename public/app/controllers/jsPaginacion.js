CetiInv
	.controller('JSPaginacionController',['$scope','$state', '$element', '$transclude', '$filter', function($scope, $state, $element, $transclude, $filter){
		$element.find('.pagContent').append($transclude());
		$scope.paginas=[];
		$scope.paginaActual=0;
		$scope.countPagination=0;
		$scope.numeroPaginas=0;
		$scope.itemsFiltrados=0;
		$scope.itemsPaginaActual=0;
		$scope.setStart = function(){
			$scope.inicio=$scope.paginaActual*$scope.limite;
		}
		$scope.getPagesNumber=function(){
			if($scope.limite){
				var res = $filter('filter')($scope.arreglo, $scope.busqueda);
				$scope.itemsFiltrados=res.length;
				$scope.paginas=[];
				$scope.paginaActual=0;
				$scope.countPagination=0;
				$scope.numeroPaginas=parseInt(($scope.itemsFiltrados/$scope.limite)+0.999999999999);
				for(var i=0; i<$scope.numeroPaginas; i++){
					$scope.paginas.push(i+1);
				}
				$scope.itemsPaginaActual=$scope.setItemsPerPage($scope.limite);
				$scope.setStart();
			}
			else{
				$scope.limite=12;
				$scope.getPagesNumber();
			}
		}
		$scope.setItemsPerPage=function(lim){
			if($scope.itemsFiltrados<=lim){
				console.log($scope.itemsFiltrados);
				return $scope.itemsFiltrados-($scope.paginaActual+1*lim);
			}
			else if($scope.itemsFiltrados<lim){
				return ($scope.itemsFiltrados);
			}
			var residuo= $scope.itemsFiltrados % lim;
			if(residuo!=0 && $scope.paginaActual+1 == $scope.paginas.length ){
				return residuo-lim;
			}
			return 0;
		}
		$scope.$watch('cambio', function() {
			$scope.getPagesNumber();
		});
		$scope.goNext=function(){
			if($scope.paginaActual + 1 < $scope.numeroPaginas){
				$scope.paginaActual++;
				$scope.itemsPaginaActual=$scope.setItemsPerPage($scope.limite);
				$scope.setStart();
			}
			console.log($scope.paginaActual);
		}
		$scope.goPrev=function(){
			if($scope.paginaActual > 0){
				$scope.paginaActual--;
				$scope.itemsPaginaActual=$scope.setItemsPerPage($scope.limite);
				$scope.setStart();
			}
			console.log($scope.paginaActual);
		}
		$scope.goToPage=function(index){
			$scope.paginaActual=index;
			$scope.itemsPaginaActual=$scope.setItemsPerPage($scope.limite);
			$scope.setStart();
		}
		$scope.getPagesNumber();
	}]);
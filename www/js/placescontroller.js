angular.module('starter.controllers').controller('PlacesCtrl', PlacesController)

function PlacesController($scope, $rootScope, $location, PlacesService){
    $rootScope.uniq = function(a, param) {
        return a.filter(function (item, pos, array) {
          return array.map(function (mapItem) {
            return mapItem[param];
          }).indexOf(item[param]) === pos;
        })
      }
    
      if(!$rootScope.user) $location.path('/app/welcome')
      PlacesService.getByUser($rootScope.user.id, $rootScope.user.token, function(re){
        $scope.places = re.places
      });


      $scope.goToPlace=function(placeid){
        $rootScope.placeid=placeid;
        $location.path('/app/areas')
      }
}

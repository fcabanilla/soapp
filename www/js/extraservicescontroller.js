angular.module('starter.controllers').controller('ExtraServicesCtrl', ExtraServicesController)

function ExtraServicesController($scope, $rootScope, $location, ExtraServicesService){
    if(!$rootScope.user) $location.path('/app/welcome')
    $scope.newState="0";
    
    $rootScope.uniq = function(a, param) {
      return a.filter(function (item, pos, array) {
        return array.map(function (mapItem) {
          return mapItem[param];
        }).indexOf(item[param]) === pos;
      })
    }
    
    ExtraServicesService.getAll($rootScope.user.token, function(re){
      $scope.services = re.automaticFunctions
      for(var i = 0; i < $scope.services.length; i++)
        $scope.services[i].lastState = $scope.services[i].lastState == 1 
    });

    $scope.changeState = function(sId){  
      if(document.getElementById('idcheckbox').checked){
        $scope.newState="1";  
      }
      else{
        $scope.newState="0";
      }
      ExtraServicesService.changeState(sId, $scope.newState, $rootScope.user.token, console.log)
    }
  }
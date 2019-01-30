angular.module('starter.controllers').controller('DispCtrl', DevicesController)

function DevicesController($window, $scope, $rootScope, $location, DispService){
    $scope.newState="0";
    $scope.actualStateDev="0";
    
    $rootScope.uniq = function(a, param) {
      return a.filter(function (item, pos, array) {
        return array.map(function (mapItem) {
          return mapItem[param];
        }).indexOf(item[param]) === pos;
      })
    }
    if(!$rootScope.user) $location.path('/app/welcome')
    
      DispService.getByArea($rootScope.areaid, $rootScope.user.token, function(re){
        $scope.devices = re.devices
      });
    
      
      $scope.refrescarEstado=function(devid){        
          DispService.getActualState(devid, $rootScope.user.token, function(resp){
            $scope.actualStateDev=resp.actualState;
          })
          return $scope.actualStateDev
      }
      

    $scope.changeState = function(devId){  
      if(document.getElementById('idcheckbox').checked){
        $scope.newState="1";  
      }
      else{
        $scope.newState="0";
      }
      DispService.changeState(devId, $scope.newState, $rootScope.user.token, console.log)
    }
  }
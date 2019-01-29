angular.module('starter.controllers', [])

.service('LoginService', function ($http, $rootScope) {
  return {
    login: function (user, pass, cb) {
      url = "http://192.168.192.23/api"

      return $http({
        url: url+'/login',
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        data: 'user=' + user + '&password=' + pass + '&gethash=true'
      }).success(function(res){
        $rootScope.user = {
          user: user,
          id: res.client._id,
          token: res.token
        }
        $http.defaults.headers.common.Authorization = res.token;
        cb()
      })
    },
    logout: function(){
      delete $rootScope.user;
      $http.defaults.headers.common.Authorization = "";
    }
  }
})

.service('DispService', function($http){
  var url= "http://192.168.192.23/api"
  return {
    getByUser: function(user_id, cb){
      console.log(url+'/devices/'+user_id)
      $http({
        url: url + '/devices/'+user_id,
        method: 'GET'
      }).success(cb)
    },
    changeState: function(devId, newState, cb){
      $http({
        url: url+'/device/changeState/'+devId,
        method: 'PUT',
        data: 'lastState='+newState
      }).success(cb)
    }
  }
})

.controller('MenuCtrl', function($scope, $rootScope){
  console.log('entro menuctrl')
})

.controller('DispCtrl', function($scope, $rootScope, $location, DispService){

  $rootScope.uniq = function(a, param) {
    return a.filter(function (item, pos, array) {
      return array.map(function (mapItem) {
        return mapItem[param];
      }).indexOf(item[param]) === pos;
    })
  }

  if(!$rootScope.user) $location.path('/app/welcome')
  DispService.getByUser($rootScope.user.id, function(re){
    $scope.devices = re    
  });

  $scope.changeState = function(devId, newState){
    console.log(devId)
    DispService.changeState(devId, newState, console.log)
  }
})

.controller('AppCtrl', function($scope, $ionicModal, LoginService, $location) {

  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  // Form data for the login modal
  $scope.loginData = {};

  // Create the login modal that we will use later
  $ionicModal.fromTemplateUrl('templates/login.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal = modal;
  });

  // Triggered in the login modal to close it
  $scope.closeLogin = function() {
    $scope.modal.hide();
  };


  $scope.logout = function(){
    LoginService.logout()
  }

  // Open the login modal
  $scope.login = function() {
    $scope.modal.show();
  };

  // Perform the login action when the user submits the login form
  $scope.doLogin = function() {
    LoginService.login($scope.loginData.username, $scope.loginData.password, function(res){
        $scope.closeLogin();
        console.log('entro')
        $location.path('/app/devices')
        $scope.loginData={}
    })
  };
})

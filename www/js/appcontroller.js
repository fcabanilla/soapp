angular.module('starter.controllers', [])

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
    $location.path('/app/welcome')
    $location.path('/app')
  }

  // Open the login modal
  $scope.login = function() {
    $scope.modal.show();
  };

  // Perform the login action when the user submits the login form
  $scope.doLogin = function() {
    LoginService.login($scope.loginData.username, $scope.loginData.password, function(res){
        $scope.closeLogin();
        $location.path('/app/places')
        $scope.loginData={}
    })
  };
})
angular.module('starter.controllers')

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
        console.log(res);
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
  var url = "http://192.168.192.23/api"
  return {
    getByArea: function(area_id, token, cb){
      console.log(url+'/devices/'+area_id)
      $http({
        url: url + '/devices/'+area_id,
        headers: {
          'Authorization': token
        },
        method: 'GET'
      }).success(cb)
    },
    changeState: function(devId, newState, token, cb){
      $http({
        url: url+'/device/changeState/'+devId,
        headers: {
          'Authorization': token,
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        method: 'PUT',
        data: 'lastState='+newState
      }).success(cb)
    },
    getActualState: function(devId, token, cb){
      $http({
        url: url+'/device/actualState/'+devId,
        headers: {
          'Authorization': token,
        },
        method: 'GET'
      }).success(cb)
    }
  }
})

.service('PlacesService', function($http){
  var url = "http://192.168.192.23/api"
  return {
    getByUser: function(user_id, token, cb){
      console.log(url+'/places/'+user_id)
      $http({
        url: url + '/places/'+user_id,
        headers: {
          'Authorization': token
        },
        method: 'GET'
      }).success(cb)
    },
  }
})

.service('AreasService', function($http){
  var url = "http://192.168.192.23/api"
  return {
    getByPlace: function(place_id, token, cb){
      console.log(url+'/areas/'+place_id)
      $http({
        url: url + '/areas/'+place_id,
        headers: {
          'Authorization': token
        },
        method: 'GET'
      }).success(cb)
    },
  }
})

.service('ExtraServicesService', function($http){
  var url = "http://192.168.192.23/api"
  return {
    getById: function(s_id, token, cb){
      console.log(url +'/automaticFunction/'+s_id)
      $http({
        url: url + '/automaticFunction/'+s_id,
        headers: {
          'Authorization': token
        },
        method: 'GET'
      }).success(cb)
    },
    getAll: function(token, cb){
      console.log(url +'/automaticFunction')
      $http({
        url: url + '/automaticFunction',
        headers: {
          'Authorization': token
        },
        method: 'GET'
      }).success(cb)
    },
    changeState: function(s_id, newState, token, cb){
      $http({
        url: url +'/automaticFunction/'+s_id,
        headers: {
          'Authorization': token,
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        method: 'PUT',
        data: 'state='+newState
      }).success(cb)
    }
  }
})
'use strict';

// Declare app level module which depends on views, and components
angular.module('myApp', [
  'ngRoute',
  'ngResource',
  'myApp.search',
  //'myApp.calendar',
  'myApp.profile',
  'myApp.add_event',
  'myApp.home'
]).

config(['$locationProvider', '$routeProvider', function($locationProvider, $routeProvider) {

  $locationProvider.hashPrefix('!');
  $routeProvider.otherwise({redirectTo: '/home'});

}]).

factory('UserService', function() {

  var token = localStorage.getItem('userToken');
  var currentUser = null;

  return {
    login: function(_token, user) { 
      console.log(_token, user);
      localStorage.setItem('userToken', _token); 
      token = _token; 
      currentUser = user;
    },
    logout: function() { 
      localStorage.removeItem('userToken'); 
      token = null; 
      currentUser = null; 
    },
    isLoggedIn: function() { 
      return token != null; 
    },
    currentUser: function() { 
      return currentUser; 
    },
    getToken: function() { 
      return token; 
    }
  };

}).

factory('AuthService', function(UserService, $resource) {

  var Token = $resource('/api/token');

  return {
    login: function(username, password) {
      Token.save({ username: username, password: password }, function(res) {
        //Check if failed login
        UserService.login(res.token, res.user);
      });
    },
    logout: function() {
      UserService.logout(); 
    }
  }
}).

factory('HttpAuthInterceptor', function (UserService) {

  return {
    request: function (config) {
      // This is just example logic, you could check the URL (for example)
      var token = UserService.getToken();
      if(token) {
        config.headers.Authorization = token;
      }
      return config;
    }
  };

}).

config(function ($httpProvider) {
  $httpProvider.interceptors.push('HttpAuthInterceptor');
}).

controller('AppCtrl', ['$scope', 'AuthService', 'UserService', function($scope, AuthService, UserService) {

  $scope.$watch(UserService.isLoggedIn, function (isLoggedIn) {
    $scope.isLoggedIn = isLoggedIn;
    $scope.currentUser = UserService.currentUser();
  });

  $scope.signup = function() {
    console.log("Signup not yet implemented");
  };

  $scope.login = function() {
    AuthService.login($scope.login_email, $scope.login_password);
  }

  $scope.logout = function() {
    AuthService.logout();
  };

  /* Set preferences for sidebar */
  $(document).ready(function(){
    $('.modal').modal();
    $("#mobile-menu-button").sideNav({
      menuWidth: 200,
      edge: 'left',
      closeOnClick: true,
      draggable: true
    });
  });

}]);

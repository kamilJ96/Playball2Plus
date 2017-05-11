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

  var currentUser;

  return {
    login: function(_token, user) { 
      localStorage.setItem('userToken', _token); 
      localStorage.setItem('user', user); 
      token = _token; 
      currentUser = user;
    },
    logout: function() { 
      localStorage.removeItem('userToken'); 
      localStorage.removeItem('user'); 
      token = null; 
      currentUser = null; 
    },
    isLoggedIn: function() { 
      return token != null && currentUser != null; 
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
  var User = $resource('/api/user');

  return {
    loginIfToken: function() {
      if(UserService.getToken()) {
        User.get(function(res) {
          UserService.login(UserService.getToken(), res);
        },
        function(err) {
          console.log(err);
        });
      }
    },
    login: function(email, password) {
      Token.save({ email: email, password: password }, 
        function(res) {

          UserService.login(res.token, res.user);
          Materialize.toast('Login successful!', 4000)
          $('#login-modal').modal('close');

        },
        function(err) {
          Materialize.toast('Error: ' + err.data.err, 4000)
        }
      );
    },
    logout: function() {
      UserService.logout(); 
    },
    signup: function(_f, _l, _e, _p) {
      User.save({
        firstname: _f,
        lastname: _l,
        password: _p,
        email: _e 
      }, 
      function(res) {

        if(res.err) {
          Materialize.toast('Error: ' + res.err, 4000)
        } else {
          UserService.login(res.token, res);
          Materialize.toast('Signup successful!', 4000)
          $('#signup-modal').modal('close');
        }

      },
      function(err) {
        console.log(err);
      });
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
    AuthService.signup(
      $scope.signup_firstname,
      $scope.signup_lastname,
      $scope.signup_email,
      $scope.signup_password
    );
  };

  $scope.login = function() {
    AuthService.login($scope.login_email, $scope.login_password);
  }

  $scope.logout = function() {
    AuthService.logout();
  };

  AuthService.loginIfToken();

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

'use strict';

var bodyParser = require('body-parser');
var expressValidator = require('express-validator');

// Declare app level module which depends on views, and components
angular.module('myApp', [
  'ngRoute',
  'myApp.search',
  'myApp.calendar',
  'myApp.calander',
  'myApp.profile',
  'myApp.add_event',
  'myApp.home'
]).

config(['$locationProvider', '$routeProvider', function($locationProvider, $routeProvider) {
  $locationProvider.hashPrefix('!');

  $routeProvider.otherwise({redirectTo: '/home'});
}]).

controller('AppCtrl', ['$scope', 'userService', function($scope, userService) {
  userService.addCallback(function(user) {
    $scope.user = user;
  });
}]).

factory('userService', function() {
  var user = null;
  var callbacks = [];
  
  var addCallback = function(cb) {
    if(cb)
      callbacks.push(cb);
  }

  var setUser = function(_user) {
    user = _user;
    callbacks.forEach(function(cb) {
      cb(user);
    });
  };

  var getUser = function(){
      return user;
  };

  return {
    addCallback: addCallback,
    setUser: setUser,
    getUser: getUser
  };

});

app.use(bodyParser.urlencoded({ extended: false }));
app.use(expressValidator());

$(document).ready(function(){
  $("#mobile-menu-button").sideNav({
    menuWidth: 200, // Default is 300
    edge: 'left', // Choose the horizontal origin
    closeOnClick: true, // Closes side-nav on <a> clicks, useful for Angular/Meteor
    draggable: true // Choose whether you can drag to open on touch screens
  });
});

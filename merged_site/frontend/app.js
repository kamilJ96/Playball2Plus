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

controller('AppCtrl', ['$scope', function($scope) {
  
  $(document).ready(function(){
    $("#mobile-menu-button").sideNav({
      menuWidth: 200, // Default is 300
      edge: 'left', // Choose the horizontal origin
      closeOnClick: true, // Closes side-nav on <a> clicks, useful for Angular/Meteor    
      draggable: true // Choose whether you can drag to open on touch screens
    });
  });

}]).

factory("User", function($resource) {
  return $resource("/api/user/:id");
});




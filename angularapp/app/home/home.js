'use strict';

angular.module('myApp.home', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/home', {
    templateUrl: 'home/home.html',
    controller: 'HomeCtrl'
  });
}])

.controller('HomeCtrl', ['$scope', 'userService', function($scope, userService) {
  $(document).ready(function(){
      $('.slider').slider();
    });
  
  $scope.saveUser = function() {
    userService.setUser({
      firstName: $scope.firstName, 
      lastName: $scope.lastName,
      email: $scope.email,
      password: $scope.password
    });
  }
}]);

'use strict';

angular.module('myApp.profile', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/profile', {
    templateUrl: 'profile/profile.html',
    controller: 'ProfileCtrl'
  });
}])

.controller('ProfileCtrl', ['$scope', 'User', function($scope, User) {
  User.query({ id: 1}, function(data) {
    $scope.user = data;
  });
}]);

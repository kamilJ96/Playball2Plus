'use strict';

angular.module('myApp.profile', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/profile', {
    templateUrl: 'profile/profile.html',
    controller: 'ProfileCtrl'
  });
}])

.controller('ProfileCtrl', ['$scope', '$location', 'UserService', 'AuthService', function($scope, $location, UserService, AuthService) {
  $scope.user = UserService.currentUser();

  $scope.$watch(UserService.isLoggedIn, function(isLoggedIn) {
    //$scope.user = currentUser;
    if(!isLoggedIn) {
      $location.path("/#!/home");
    }
  });

  $scope.save_details = function() {
    $scope.user_details.$setPristine();
    AuthService.update($scope.user);
  }
  
}]);

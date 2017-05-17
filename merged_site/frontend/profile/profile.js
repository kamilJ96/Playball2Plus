'use strict';

angular.module('myApp.profile', ['ngRoute', 'angularFileUpload'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/profile', {
    templateUrl: 'profile/profile.html',
    controller: 'ProfileCtrl'
  });
}])

.controller('ProfileCtrl', ['$scope', '$location', 'FileUploader', 'UserService', 'AuthService', function($scope, $location, FileUploader, UserService, AuthService) {


  $scope.uploader = new FileUploader({
    url: '/api/upload',
    onSuccessItem: function(r, s, h) {
      $scope.user.img_url = s.file;
      $scope.save_details(); 
      $scope.uploader.clearQueue();
    }
  });

  $scope.user = UserService.currentUser();

  $scope.$watch(UserService.isLoggedIn, function(isLoggedIn) {
    if(!isLoggedIn) {
      $location.path("/#!/home");
    }
  });

  $scope.savePhoto =  function() {

    console.log($scope.profile_upload);
  };

  $scope.save_details = function() {
    $scope.user_details.$setPristine();
    AuthService.update($scope.user);
  }
  
}]);

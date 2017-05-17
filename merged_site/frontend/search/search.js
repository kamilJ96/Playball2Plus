'use strict';

angular.module('myApp.search', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/search', {
    templateUrl: 'search/search.html',
    controller: 'SearchCtrl'
  });
}])

.controller('SearchCtrl', ['$scope', '$http', '$resource', 'UserService', function($scope, $http, $resource, UserService) {
  var Search = $resource('/api/event/search/:query');
  var All = $resource('/api/event');

  $scope.$watch(UserService.isLoggedIn, function(isLoggedIn) {
    $scope.isLoggedIn = isLoggedIn;
  });

  All.query(function(events) {
    $scope.results = events;
    setTimeout(function() {Materialize.showStaggeredList('#search-results');}, 10);
  });

  $scope.signupEvent = function(id) {
    console.log($scope.selectedEvent);
    var Signup = $resource();
    $http({
      url: '/api/event/' + id + '/signup',
      method: 'POST'
    }).then(function successCallback(response) {
      Materialize.toast("Successfully signed up!", 4000);
    }, function errorCallback(err) {
      Materialize.toast("Error: " + err.data.err, 4000);
    });
  }

  $scope.$watch("query",function(value,old){
    if(value && (!old || !old.startsWith(value))){

      Search.query({query: value}, function(events) {
        $scope.results = events;
        setTimeout(function() {Materialize.showStaggeredList('#search-results');}, 10);
      });
    }

    if(value == "") {

      All.query(function(events) {
        $scope.results = events;
        setTimeout(function() {Materialize.showStaggeredList('#search-results');}, 10);
      });
    }
  });
}]);

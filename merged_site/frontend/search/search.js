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
  var Filter = $resource('api/event/filter/:query');

  $scope.$watch(UserService.isLoggedIn, function(isLoggedIn) {
    $scope.isLoggedIn = isLoggedIn;
    $scope.currentUser = UserService.currentUser();
  });

  $scope.signupEvent = function(event) {

    $http({
      url: '/api/event/' + event._id + '/signup',
      method: 'POST'
    }).then(function successCallback(response) {
      event.participants.push($scope.currentUser);
      Materialize.toast("Successfully signed up!", 4000);
    }, function errorCallback(err) {
      Materialize.toast("Error: " + err.data.err, 4000);
    });
  }

  $scope.cancelSignup = function(event) {

    $http({
      url: '/api/event/' + event._id + '/cancelsignup',
      method: 'POST'
    }).then(function successCallback(response) {
      event.participants = event.participants.filter(function(a, b) {
        return a._id != $scope.currentUser._id;
      });
      Materialize.toast("Successfully canceled!", 4000);
    }, function errorCallback(err) {
      Materialize.toast("Error: " + err.data.err, 4000);
    });
  }

  var setEvents = function(events) {
        $scope.results = events;
        //setTimeout(function() {Materialize.showStaggeredList('#search-results');}, 10);
  }

  $scope.loadAll = function() {
    All.query(function(events) {
      setEvents(events);
    });
  }


  $scope.filter = function(f) {
    Filter.query({'query': f}, function(events){
      setEvents(events);
    });
  }

  $scope.$watch("query",function(value,old){
    if(value && value != "") {
      Search.query({'query': value}, function(events) {
        setEvents(events);
      });
    }
  });

  $scope.loadAll();
}]);

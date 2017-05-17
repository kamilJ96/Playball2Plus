'use strict';

angular.module('myApp.calendar', ['ngRoute', 'ui.calendar'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/calendar', {
    templateUrl: 'calendar/calendar.html',
    controller: 'CalendarCtrl'
  });
}])

.controller('CalendarCtrl', ['$scope', '$resource', '$http', 'UserService', function($scope, $resource, $http, UserService) {

  $scope.$watch(UserService.isLoggedIn, function(isLoggedIn) {
    $scope.isLoggedIn = isLoggedIn;
    $scope.currentUser = UserService.currentUser();
  });

  var Events = $resource("/api/event");
  var _e = Events.query(function() {
    console.log(_e);
  });

  $scope.signupEvent = function() {

    $http({
      url: '/api/event/' + $scope.selectedEvent._id + '/signup',
      method: 'POST'
    }).then(function successCallback(response) {
      $scope.selectedEvent.participants.push($scope.currentUser);
      Materialize.toast("Successfully signed up!", 4000);
    }, function errorCallback(err) {
      Materialize.toast("Error: " + err.data.err, 4000);
    });
  }

  $scope.cancelSignup = function() {

    $http({
      url: '/api/event/' + $scope.selectedEvent._id + '/cancelsignup',
      method: 'POST'
    }).then(function successCallback(response) {
      $scope.selectedEvent.participants = $scope.selectedEvent.participants.filter(function(a, b) {
        return a._id != $scope.currentUser._id;
      });
      Materialize.toast("Successfully canceled!", 4000);
    }, function errorCallback(err) {
      Materialize.toast("Error: " + err.data.err, 4000);
    });
  }

  $scope.eventSources = 
  [{
    events: _e,
    color: '#0ba568',
    textColor: 'black'
  }];
  
  $scope.onEventClick = function(clickedEvent, jsEvent, view){
    $scope.selectedEvent = clickedEvent;
    $('#info_modal').modal('open'); 
  };
  
  $scope.uiConfig = {
      calendar:{
        height: 800,
        header:{
          left: 'month basicWeek',
          center: 'title agendaFourDay',
          right: 'today prev,next'
        },
        eventClick: $scope.onEventClick,
      }
    };  

  $(document).ready(function(){
    $('.modal').modal();
  });
}]);

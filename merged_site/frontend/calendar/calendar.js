'use strict';

angular.module('myApp.calendar', ['ngRoute', 'ui.calendar'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/calendar', {
    templateUrl: 'calendar/calendar.html',
    controller: 'CalendarCtrl'
  });
}])

.controller('CalendarCtrl', ['$scope', '$resource', function($scope, $resource) {

  var Events = $resource("/api/event");
  var _e = Events.query(function() {
    console.log(_e);
  });

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

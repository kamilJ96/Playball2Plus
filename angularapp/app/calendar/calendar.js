'use strict';

angular.module('myApp.calendar', ['ngRoute', 'ui.calendar'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/calendar', {
    templateUrl: 'calendar/calendar.html',
    controller: 'CalendarCtrl'
  });
}])

.controller('CalendarCtrl', ['$scope', function($scope) {
  $scope.eventSources = 
  [{
    events: [
    ],
    color: '#0ba568',
    textColor: 'black'
  }];
  
  $scope.onEventClick = function( date, jsEvent, view){
    console.log(date, jsEvent, view);
    Materialize.toast(date.title, 3000, 'rounded')
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

}]);

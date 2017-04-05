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
        {
            title: 'Soccer event 1',
            start: '2017-04-04',
        },
        {
            title: 'Soccer event 2',
            start: '2017-04-05'
        }
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

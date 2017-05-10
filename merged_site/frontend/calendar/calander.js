'use strict';

angular.module('myApp.calander', ['ngRoute', 'ui.calendar'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/calander', {
    templateUrl: 'calendar/calander.html',
    controller: 'CalendarCtrl2'
  });
}])

.controller('CalendarCtrl2', ['$scope', function($scope) {
  $(document).ready(function(){
	  $('.modal').modal();
  });

  $scope.eventSources = 
  [{
    events: [
        {
            title: 'hello',
            start: '2017-04-28',
	    sport: 'farah is best tutor',
	    ppl: '20',
	    desc: 'blahblahblah',
	    addr: 'uom'
        }
    ],
    color: '#0ba568',
    textColor: 'black'
  }];
  
  
  $scope.onEventClick = function(date, jsEvent, view){
	  $('#modal1').modal('open');
  };

  $scope.uiConfig = {
      calendar:{
        height: 800,
        header:{
          left: 'month basicWeek',
          center: 'title agendaFourDay',
          right: 'today prev,next'
        },
	eventClick: $scope.onEventClick
      }
    };  

}]);

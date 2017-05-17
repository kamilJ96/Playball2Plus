'use strict';

angular.module('myApp.add_event', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/add_event', {
    templateUrl: 'add_event/add_event.html',
    controller: 'AddEventCtrl'
  });
}])

.controller('AddEventCtrl', ['$scope', '$resource', function($scope, $resource) {

  var Event = $resource('/api/event/:id');

  $(document).ready(function() {
    $('select').material_select();
  });

  $('.datepicker').pickadate({
    selectMonths: true,
    selectYears: 2
  });

  $scope.create = function() {
    var e = {
      title: $scope.title,
      description: $scope.description,
      address: $scope.address,
      numParticipants: $scope.participants,
      sport: $scope.sport,
      start: $scope.start,
    };
    Event.save(e);
    window.history.back();
  }

  $scope.back = function() {
    window.history.back();
  }

}]);

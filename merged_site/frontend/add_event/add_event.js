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
    $('.timepicker').pickatime();
    $('.datepicker').pickadate({
      selectMonths: true,
      selectYears: 2
    });
  });


  $scope.create = function() {
    console.log($scope.addevent_form);
    if($scope.addevent_form.$invalid) {
      console.log($scope);
      Materialize.toast("Missing event details", 4000);
      return;
    }

    var e = {
      title: $scope.title,
      description: $scope.description,
      address: $scope.address,
      numParticipants: $scope.participants,
      sport: $scope.sport,
      start: moment($scope.start_date + " " + $scope.start_time).format(),
    };
    Event.save(e, function(res) {
      Materialize.toast("Success!", 4000);
      window.history.back();
    }, function(err) {
      Materialize.toast("Error: " + err.data.err, 4000);
    });
  }

  $scope.back = function() {
    window.history.back();
  }

}]);

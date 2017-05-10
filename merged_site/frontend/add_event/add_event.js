'use strict';

angular.module('myApp.add_event', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
	$routeProvider.when('/add_event', {
		templateUrl: 'add_event/add_event.html',
		controller: 'AddEventCtrl'
	});
}])

.controller('AddEventCtrl', ['$scope', function($scope) {
	$(document).ready(function() {
		$('select').material_select();
	});
	$('.datepicker').pickadate({
		selectMonths: true,
		selectYears: 2
	});
}]);

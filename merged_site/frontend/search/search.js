'use strict';

angular.module('myApp.search', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/search', {
    templateUrl: 'search/search.html',
    controller: 'SearchCtrl'
  });
}])

.controller('SearchCtrl', ['$scope', '$resource', function($scope, $resource) {
  var Search = $resource('/api/events/search/:query');
  var All = $resource('/api/events');

  All.query(function(events) {
    $scope.results = events;
    setTimeout(function() {Materialize.showStaggeredList('#search-results');}, 10);
  });

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
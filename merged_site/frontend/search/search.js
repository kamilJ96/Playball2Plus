'use strict';

angular.module('myApp.search', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/search', {
    templateUrl: 'search/search.html',
    controller: 'SearchCtrl'
  });
}])

.controller('SearchCtrl', ['$scope', '$resource', function($scope, $resource) {
  var Events = $resource('/api/events/search/:query');

  $scope.$watch("query",function(value,old){
    if(value && (!old || !old.startsWith(value))){
      
      Events.query({query: value}, function(events) {
        $scope.results = events;
        setTimeout(function() {Materialize.showStaggeredList('#search-results');}, 10);
      });
    }
  });
}]);

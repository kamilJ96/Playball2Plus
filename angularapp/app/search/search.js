'use strict';

angular.module('myApp.search', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/search', {
    templateUrl: 'search/search.html',
    controller: 'SearchCtrl'
  });
}])

.controller('SearchCtrl', ['$scope', function($scope) {
  $scope.names = [];
  $scope.$watch("query",function(value,old){
    if(value && (!old || !old.startsWith(value))){
      $scope.results = [{"img": "images/bball.jpg", "title": "Basketball event 1"}, 
                        {"img": "images/soccer.jpg", "title": "Soccer event 1"}];
                        
      setTimeout(function() {Materialize.showStaggeredList('#search-results');}, 10);
    }
  });
}]);

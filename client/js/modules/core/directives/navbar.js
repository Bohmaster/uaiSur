'use strict';

angular
  .module('uai-news.module.core')
  .directive('navbar', function() {
    return {
      restrict: 'E',
      templateUrl: 'js/modules/core/elements/navbar.html',
      controller: function($scope) {
        $scope.greets = "Navbar controller";
      },
      link: function(scope, elem, attrs) {

      }
    }
  });

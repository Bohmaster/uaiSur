'use strict';

angular
  .module('uai-news.module.core')
  .directive('navbar', function() {
    return {
      restrict: 'E',
      templateUrl: 'js/modules/core/elements/navbar.html'
    }}
  )
  .directive('fileInput', function($parse) {
    return {
      restrict: 'A',
      link: function(scope, elm, attrs) {
        elm.bind('change', function() {
          $parse(attrs.fileInput)
            .assign(scope, elm[0].files);
          scope.$apply();
        });
      }
    }
  });

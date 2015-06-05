'use strict';

angular
  .module('uai-news.module.core')
  .run(function($rootScope, $location) {
    $rootScope.greet = "Hello, from UAI";

    $rootScope.$on('$viewContentLoaded', function() {
      var interval = setInterval(function() {
        if (document.readyState == "complete") {
          window.scrollTo(0, 0);
          clearInterval(interval);
        }
      }, 200);
    });
  });



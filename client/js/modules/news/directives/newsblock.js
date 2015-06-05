angular.module('uai-news.module.news')
  .directive('newsBlock', function() {
    return {
      restrict: 'EA',
      templateUrl: 'js/modules/news/elements/news-block.html',
      link: function(scope, elem, attrs) {
        angular.element('.normal').on('mouseover', function() {
          var desc = angular.element(this).find('.description');
          TweenMax.to(desc, 0.2, {bottom: "0"});
        });
        angular.element('.normal').on('mouseout', function() {
          var desc = angular.element(this).find('.description');
          TweenMax.to(desc, 0.2, {bottom: "-100px"});
        });
      }
    }
  });

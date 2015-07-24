'use strict';
angular.module('uai-news.module.core')
  .controller('MainController',
  function($scope, $http, $modal, Noticia, Categoria, Video) {

    $scope.videoModal = function() {
      $modal.open({
        templateUrl: "video.html",
        size: "lg"
      });
    }

  });

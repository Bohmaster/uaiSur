angular.module('uai-news.module.core')
  .config(function($stateProvider, $urlRouterProvider) {
    $stateProvider
      .state('home', {
        url: '/home',
        templateUrl: 'js/modules/core/views/home.html'
      })
      .state('noticia', {
        url: '/noticia',
        templateUrl: 'js/modules/core/views/noticia.html'
      });

    $urlRouterProvider.otherwise('/home');
  });

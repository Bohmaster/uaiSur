'use strict';
angular.module('uai-news.module.news')
  .controller('NoticiasController',
    function($scope, $http, $modal, Noticia, Categoria) {

      $scope.noticias = [];

      $scope.categorias = [];

      function loadNoticias() {
        Noticia.find({
          filter: {
            limit: 5
          }
        }, function(data) {
          $scope.noticias = data;
          console.log(data);
        })
      }

      function loadCategorias() {
        Categoria.find(function(data) {
          $scope.categorias = data;
          console.log(data);
        })
      }

      loadNoticias();
      loadCategorias();

      $scope.noticia = {};

      /**
       * Agregar noticia
       */
      $scope.agregarNoticia = function() {
        Noticia.create({
          volanta: $scope.noticia.volanta,
          titulo: $scope.noticia.titulo,
          foto_principal: $scope.files[0].name || '',
          foto_miniatura: $scope.files[1].name || '',
          imagenes: [],
          descripcion: $scope.noticia.descripcion,
          cuerpo: $scope.noticia.cuerpo,
          categoriaId: $scope.noticia.categoriaId,
          destacada: $scope.noticia.destacada
        }, function(data) {
          console.log(data);
        });
        $scope.upload();
        loadNoticias();
      };

      /**
       * Editar noticia
       */
      $scope.editarNoticia = function(modelId) {
        $modal.open({
          templateUrl: 'js/modules/news/views/editar_noticia.html',
          resolve: {
            noticia: function(Noticia) {
              return Noticia.findById({id: modelId});
            }
          },
          controller: function($scope, $rootScope, noticia, Noticia, Categoria, $http) {
            $scope.noticia = noticia;

            $scope.editarNoticia = function() {
              $http.put('/api/noticia/' + modelId, {
                volanta: $scope.noticia.volanta,
                titulo: $scope.noticia.titulo,
                foto_principal: $scope.files[0].name || $scope.noticia.foto_principal,
                foto_miniatura: $scope.files[1].name || $scope.noticia.foto_miniatura,
                imagenes: [],
                descripcion: $scope.noticia.descripcion,
                cuerpo: $scope.noticia.cuerpo,
                categoriaId: $scope.noticia.categoriaId
              })
                .then(function(data) {
                  console.log(data);
                  $rootScope.$broadcast('noticia.editada');
                  $scope.$close(data);
                });
            }
          }
        });
      };

      /**
       * Borrar noticia
       */
      $scope.borrarNoticia = function(id) {
        Noticia.deleteById({
          id: id
        }, function(data) {
          console.log('Noticia borrada');
          loadNoticias();
        })
      };

      /**
       * Upload method
       *
       */
      $scope.upload = function() {
        var fd = new FormData();
        angular.forEach($scope.files, function(file) {
          fd.append('file', file);
        });
        $http.post('/api/containers/images/upload',
          fd, {
            transformRequest: angular.identity,
            headers: {'Content-Type': undefined}
          }
        ).success(function(d){
            console.log(d);
            console.log($scope.files);
          })
          .error(function(e) {
            console.log(e);
          });
      };

      /**
       * Obtener categoriaId
       */
      $('#categoria').on('input', function() {
        var x = $('#categoria').val();
        var z = $('#categorias');
        var val = $(z).find('option[value="' + x + '"]');
        var endVal = val.attr('id');
        console.log(x, z, val);
        $scope.noticia.categoriaId = endVal;
      });

    });

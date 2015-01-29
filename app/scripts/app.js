'use strict';

angular
  .module('todosApp', [
    'ngRoute'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'TodoCtrl',
        resolve: {
          store: function(todoStorage) {
            todoStorage.get();
            return todoStorage;
          }
        }
      })
      .otherwise({
        redirectTo: '/'
      });
  });

angular.module('todosApp')
  .controller('TodoCtrl', function TodoCtrl($scope, store) {
    'use strict';

    $scope.todosList = store.todosList;

    $scope.addList = function(){
      var newList = {
        subtitle: $scope.newList.trim(),
        'todos': []
      };
      if (!newList.subtitle) {
        return;
      }
      store.insert(newList);
      $scope.newList = '';
    };
    $scope.removeList = function(list) {
      store.delete(list)
    }
    
  });
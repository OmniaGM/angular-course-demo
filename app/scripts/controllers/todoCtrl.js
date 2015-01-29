angular.module('todosApp')
  .controller('TodoCtrl', function TodoCtrl($scope, $filter, store) {
    'use strict';

    var todos = $scope.todos = store.todos;

    $scope.newTodo = '';

    $scope.$watch('todos', function () {
      $scope.remainingCount = $filter('filter')(todos, { completed: false }).length;
      $scope.allChecked = !$scope.remainingCount;
    }, true);

    $scope.addTodo = function () {
      var newTodo = {
        title: $scope.newTodo.trim(),
        completed: false
      };
      if (!newTodo.title) {
        return;
      }
      store.insert(newTodo);
      $scope.newTodo = '';
    };

    $scope.markAll = function (completed) {
      todos.forEach(function (todo) {
        if (todo.completed !== completed) {
          todo.completed = completed;
          store.put(todo, todos.indexOf(todo));
        }
      });
    };
  });
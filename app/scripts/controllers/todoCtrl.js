angular.module('todosApp')
  .controller('TodoCtrl', function TodoCtrl($scope, $filter, todoStorage) {
    'use strict';

    var todos = $scope.todos = todoStorage.get();

    $scope.newTodo = '';

    $scope.$watch('todos', function (newValue, oldValue) {
      $scope.remainingCount = $filter('filter')(todos, { completed: false }).length;
      $scope.completedCount = todos.length - $scope.remainingCount;
      $scope.allChecked = !$scope.remainingCount;
      if (newValue !== oldValue) { // This prevents unneeded calls to the local storage
        todoStorage.put(todos);
      }
    }, true);


    $scope.addTodo = function () {
      var newTodo = $scope.newTodo.trim();
      if (!newTodo.length) {
        return;
      }

      todos.push({
        title: newTodo,
        completed: false
      });

      $scope.newTodo = '';
    };

    $scope.removeTodo = function (todo) {
      todos.splice(todos.indexOf(todo), 1);
    };

    $scope.clearCompletedTodos = function () {
      $scope.todos = todos = todos.filter(function (val) {
        return !val.completed;
      });
    };

    $scope.markAll = function (completed) {
      todos.forEach(function (todo) {
        todo.completed = !completed;
      });
    };
  });
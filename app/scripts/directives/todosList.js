angular.module('todosApp')
  .directive('todosList', [function(){
    // Runs during compile
    return {
      scope: {
        todos: '='
      }, 
      controller: function($scope, todoStorage) {
        var store = todoStorage
        $scope.removeTodo = function (todo) {
          store.delete(todo)
        };
        $scope.toggleCompleted = function (todo) {
          store.put(todo, $scope.todos.indexOf(todo))
        };
        $scope.editTodo = function (todo) {
          $scope.editedTodo = todo;
        };
        $scope.saveEdits = function (todo) {
          todo.title = todo.title.trim();
          store.put(todo, $scope.todos.indexOf(todo));
          $scope.editedTodo = null;
        };

      },
      restrict: 'E', // E = Element, A = Attribute, C = Class, M = Comment
      templateUrl: 'views/todosList.html',
    };
  }]);
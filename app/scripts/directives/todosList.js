angular.module('todosApp')
  .directive('todosList', [function(){
    // Runs during compile
    return {
      scope: {
        todos: '=',
        list: '='
      }, 
      controller: function($scope, todoStorage) {
        var store = todoStorage
        $scope.removeTodo = function (todo) {
          store.deleteFromList(todo, todoStorage.todosList.indexOf($scope.list))
        };
        $scope.toggleCompleted = function (todo) {
          store.putIntoList(todo, todoStorage.todosList.indexOf($scope.list))
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
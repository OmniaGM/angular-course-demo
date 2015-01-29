angular.module('todosApp')
  .directive('todosFooter', [function(){
    // Runs during compile
    return {
      scope: {
        todos: '='
      }, // {} = isolate, true = child, false/undefined = no change
      controller: function($scope, $filter, todoStorage) {
        var store = todoStorage;
        $scope.$watch('todos', function () {
          $scope.remainingCount = $filter('filter')($scope.todos, { completed: false }).length;
          $scope.completedCount = $scope.todos.length - $scope.remainingCount;
        }, true);
        $scope.clearCompletedTodos = function () {
          store.clearCompleted();
        };
      },
      restrict: 'E', // E = Element, A = Attribute, C = Class, M = Comment
      templateUrl: 'views/todosFooter.html',
    };
  }]);
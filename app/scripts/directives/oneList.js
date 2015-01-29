angular.module('todosApp')
  .directive('oneList', [function(){
    // Runs during compile
    return {
      scope: {
        list: '='
      }, 
      controller: function($scope, $filter, todoStorage) {
        var store = todoStorage
        $scope.newTodo = '';
        var todosList = store.todosList;

        $scope.$watch('list', function () {
          $scope.remainingCount = $filter('filter')($scope.list.todos, { completed: false }).length;
          $scope.allChecked = !$scope.remainingCount;
        }, true);

        $scope.removeList = function(list) {
          store.delete(list)
        };

        $scope.addTodoTo = function (list) {
          var newTodo = {
            title: $scope.newTodo.trim(),
            completed: false
          };
          if (!newTodo.title) {
            return;
          }
          store.insertToList(newTodo, todosList.indexOf(list));
          $scope.newTodo = '';
        };
        

        $scope.markAll = function (completed, list) {
          $scope.list.todos.forEach(function (todo) {
            if (todo.completed !== completed) {
              todo.completed = completed;
              store.putIntoList(todo, todosList.indexOf($scope.list));
            }
          });
        };

      },
      restrict: 'E', // E = Element, A = Attribute, C = Class, M = Comment
      templateUrl: 'views/oneList.html',
    };
  }]);
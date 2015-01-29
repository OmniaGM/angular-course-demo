angular.module('todosApp')
  .factory('todoStorage', function () {
    'use strict';

    var STORAGE_ID = 'todos-angularjs';

    var store = {
      todos: [],
      _getFromLocalStorage: function () {
        return JSON.parse(localStorage.getItem(STORAGE_ID) || '[]');
      },

      _saveToLocalStorage: function (todos) {
        localStorage.setItem(STORAGE_ID, JSON.stringify(todos));
      },

      get: function () {
        return angular.copy(store._getFromLocalStorage(), store.todos);
      },

      put: function (todo, index) {
        store.todos[index] = todo;
        store._saveToLocalStorage(store.todos);
        return store.todos
      },
      
      clearCompleted: function () {
        var completeTodos = [];
        var incompleteTodos = [];
        store.todos.forEach(function (todo) {
          if (todo.completed) {
            completeTodos.push(todo);
          } else {
            incompleteTodos.push(todo);
          }
        });

        angular.copy(incompleteTodos, store.todos);

        store._saveToLocalStorage(store.todos);
        return store.todos;
      },

      delete: function (todo) {
        store.todos.splice(store.todos.indexOf(todo), 1);
        store._saveToLocalStorage(store.todos);
        return store.todos;
      },

      insert: function (todo) {
        store.todos.push(todo);
        store._saveToLocalStorage(store.todos);        
        return store.todos;
      }
    };
    return store
  });
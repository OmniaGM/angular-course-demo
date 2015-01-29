angular.module('todosApp')
  .factory('todoStorage', function () {
    'use strict';

    var STORAGE_ID = 'todoslist-angularjs';

    var store = {
      todosList: [],
      _getFromLocalStorage: function () {
        return JSON.parse(localStorage.getItem(STORAGE_ID) || '[]');
      },

      _saveToLocalStorage: function (todos) {
        localStorage.setItem(STORAGE_ID, JSON.stringify(todos));
      },

      get: function () {
        return angular.copy(store._getFromLocalStorage(), store.todosList);
      },

      put: function (list, index) {
        store.todosList[index] = list;
        store._saveToLocalStorage(store.todosList);
        return store.todosList
      },

      clearCompleted: function (listIndex) {
        var completeTodos = [];
        var incompleteTodos = [];
        var todos = store.todosList[listIndex].todos;

        todos.forEach(function (todo) {
          if (todo.completed) {
            completeTodos.push(todo);
          } else {
            incompleteTodos.push(todo);
          }
        });

        angular.copy(incompleteTodos, todos);

        store._saveToLocalStorage(store.todosList);
        return store.todosList;
      },

      delete: function (list) {
        store.todosList.splice(store.todosList.indexOf(list), 1);
        store._saveToLocalStorage(store.todosList);
        return store.todosList;
      },

      insert: function (list) {
        store.todosList.push(list);
        store._saveToLocalStorage(store.todosList);        
        return store.todosList;
      },

      deleteFromList: function (todo, listIndex) {
        var todos = store.todosList[listIndex].todos;
        todos.splice(todos.indexOf(todo), 1);
        store._saveToLocalStorage(store.todosList);
        return store.todosList;
      },

      insertToList: function (todo, listIndex) {
        store.todosList[listIndex].todos.push(todo);
        store._saveToLocalStorage(store.todosList);        
        return store.todosList;
      },
      
      putIntoList: function (todo, listIndex) {        
        var todos = store.todosList[listIndex].todos;
        todos[todos.indexOf(todo)] = todo;
        store._saveToLocalStorage(store.todosList);
        return store.todosList
      }
      
    };
    return store
  });
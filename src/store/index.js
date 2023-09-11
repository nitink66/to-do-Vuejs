// src/store.js

import Vue from "vue";
import Vuex from "vuex";
import { v4 as uuidv4 } from "uuid";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    todos: [{ index: uuidv4(), text: "Go to GYM", completed: false ,dueDate:'2023-04-03'}],
  },
  mutations: {
    addTodo(state, todo) {
      state.todos.push(todo);
    },
    removeTodo(state, index) {
      state.todos.splice(index, 1);
    },
    markTodoCompleted(state, index) {
      state.todos[index].completed = true;
    },
    markTodoAsCompleted(state, todoId) {
      const todo = state.todos.find((todo) => todo.index === todoId);
      if (todo) {
        todo.completed = true;
      }
    },
    markTodoAsNonCompleted(state, todoId) {
      const todo = state.todos.find((todo) => todo.index === todoId);
      if (todo) {
        todo.completed = false;
      }
    },

    updateToDo(state, updatedItem) {
      const exisitingToDo = state.todos.find((todo) => todo.index === updatedItem.newTodoindex);
      if (exisitingToDo) {
        exisitingToDo.text = updatedItem.newUpdateField;
        exisitingToDo.dueDate = updatedItem.dueDate;
      }
    },
  },
  actions: {
    addTodo({ commit }, todo) {
      commit("addTodo", todo);
    },
    removeTodo({ commit }, index) {
      commit("removeTodo", index);
    },
    completeTodo({ commit }, index) {
      commit("markTodoCompleted", index);
    },

    markTodoAsCompleted({ commit }, index) {
      commit("markTodoAsCompleted", index);
    },
    markTodoAsNonCompleted({ commit }, index) {
      commit("markTodoAsNonCompleted", index);
    },
    updateToDo({ commit }, todo) {
      commit("updateToDo", todo);
    },
  },
  getters: {
    getTodos: (state) => state.todos,

    getCompletedTodos(state) {
      return state.todos.filter((todo) => todo.completed);
    },

    getNonCompletedTodos(state) {
      return state.todos.filter((todo) => !todo.completed);
    },
  },
});

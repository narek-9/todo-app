import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { updateLocalStorageData } from "../../utils/updateLocalStorageData";
import { todo } from "../../types";

export interface ITodosState {
  currentPage: number;
  todos: todo[];
}

const initialState: ITodosState = {
  currentPage: 1,
  todos: JSON.parse(localStorage.getItem("todos") as string) || [],
};

const todosDataSlice = createSlice({
  name: "todos",
  initialState,
  reducers: {
    addTodo: (state, action: PayloadAction<todo>) => {
      const updatedTodos = [action.payload, ...state.todos];
      state.todos = updatedTodos;
      updateLocalStorageData(updatedTodos);
    },
    deleteTodo: (state, action: PayloadAction<string>) => {
      const updatedTodos = state.todos.filter(
        (todo) => todo.id !== action.payload
      );
      updateLocalStorageData(updatedTodos);

      return {
        ...state,
        todos: updatedTodos,
      };
    },
    toggleCompletingTodo: (state, action: PayloadAction<string>) => {
      const updatedTodos = state.todos.map((todo) => {
        if (todo.id === action.payload) {
          const updatedTodo = { ...todo, isCompleted: !todo.isCompleted };
          return updatedTodo;
        }
        return todo;
      });

      state.todos = updatedTodos;
      updateLocalStorageData(updatedTodos);
    },
    makeTodoExpired: (state, action: PayloadAction<string>) => {
      const updatedTodos = state.todos.map((todo) => {
        if (todo.id === action.payload) {
          const updatedTodo = { ...todo, isExpired: true };
          return updatedTodo;
        }
        return todo;
      });

      state.todos = updatedTodos;
      updateLocalStorageData(updatedTodos);
    },
    editTodo: (
      state,
      action: PayloadAction<{
        id: string;
        title: string;
        description: string;
        endDate: string;
      }>
    ) => {
      const updatedTodos = state.todos.map((todo) => {
        if (todo.id === action.payload.id) {
          const updatedTodo = {
            ...todo,
            title: action.payload.title,
            description: action.payload.description,
            endDate: action.payload.endDate,
          };
          return updatedTodo;
        }
        return todo;
      });

      state.todos = updatedTodos;
      updateLocalStorageData(updatedTodos);
    },
    selectTodosPage: (state, action: PayloadAction<number>) => {
      state.currentPage = action.payload;
    },
  },
});

export const {
  addTodo,
  deleteTodo,
  toggleCompletingTodo,
  makeTodoExpired,
  editTodo,
  selectTodosPage,
} = todosDataSlice.actions;
export default todosDataSlice.reducer;

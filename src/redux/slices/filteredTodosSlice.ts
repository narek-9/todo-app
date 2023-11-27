import { PayloadAction, createSlice } from "@reduxjs/toolkit";

import { getSortedTodos } from "../../utils/getSortedTodos";
import { replaceSpaces } from "../../utils/replaceSpaces";
import { todosSortValues, todo, todosStatusValues } from "../../types";

export interface IFilteredTodosState {
  todos: todo[];
  sortParam: todosSortValues;
  searchParam: string;
  todosStatus: todosStatusValues;
  currentPage: number;
}

const initialState: IFilteredTodosState = {
  todos: [],
  sortParam: todosSortValues.SORTED_BY,
  searchParam: "",
  todosStatus: todosStatusValues.STATUS,
  currentPage: 1,
};

const filteredTodosSlice = createSlice({
  name: "filteredTodos",
  initialState,
  reducers: {
    changeSortParam: (
      state,
      action: PayloadAction<{
        todos: todo[];
        updatedSortedParam: todosSortValues;
      }>
    ) => {
      state.sortParam = action.payload.updatedSortedParam;
      state.todos = getSortedTodos(
        action.payload.todos,
        action.payload.updatedSortedParam,
        replaceSpaces(state.searchParam),
        state.todosStatus
      );
    },
    changeSearchParam: (
      state,
      action: PayloadAction<{
        todos: todo[];
        updatedSearchParam: string;
      }>
    ) => {
      state.searchParam = action.payload.updatedSearchParam;
      state.todos = getSortedTodos(
        action.payload.todos,
        state.sortParam,
        replaceSpaces(action.payload.updatedSearchParam),
        state.todosStatus
      );
    },
    changeStatusParam: (
      state,
      action: PayloadAction<{
        todos: todo[];
        updatedStatusParam: todosStatusValues;
      }>
    ) => {
      state.todosStatus = action.payload.updatedStatusParam;
      state.todos = getSortedTodos(
        action.payload.todos,
        state.sortParam,
        replaceSpaces(state.searchParam),
        action.payload.updatedStatusParam
      );
    },
    resetSortedParam: (state, action: PayloadAction<todo[]>) => {
      state.sortParam = todosSortValues.SORTED_BY;
      state.todos = getSortedTodos(
        action.payload,
        todosSortValues.SORTED_BY,
        replaceSpaces(state.searchParam),
        state.todosStatus
      );
    },
    resetSearchParam: (state, action: PayloadAction<todo[]>) => {
      // console.log("resrtttt");

      state.searchParam = "";
      state.todos = getSortedTodos(
        action.payload,
        state.sortParam,
        "",
        state.todosStatus
      );
    },
    resetStatusParam: (state, action: PayloadAction<todo[]>) => {
      state.todosStatus = todosStatusValues.STATUS;
      state.todos = getSortedTodos(
        action.payload,
        state.sortParam,
        replaceSpaces(state.searchParam),
        todosStatusValues.STATUS
      );
    },
    updateFilteredTodos: (state, action: PayloadAction<todo[]>) => {
      state.todos = getSortedTodos(
        action.payload,
        state.sortParam,
        replaceSpaces(state.searchParam),
        state.todosStatus
      );
    },
    selectFilteredTodosPage: (state, action: PayloadAction<number>) => {
      state.currentPage = action.payload;
    },
  },
});

export const {
  changeSortParam,
  changeSearchParam,
  changeStatusParam,
  resetSortedParam,
  resetSearchParam,
  resetStatusParam,
  updateFilteredTodos,
  selectFilteredTodosPage,
} = filteredTodosSlice.actions;
export default filteredTodosSlice.reducer;

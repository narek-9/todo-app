import { IFilteredTodosState } from "../slices/filteredTodosSlice";
import { todosSortValues, todosStatusValues } from "../../types";
import { RootState } from "..";

export const getFilteredTodosData = (state: RootState): IFilteredTodosState =>
  state.filteredTodos;
export const getSearchParam = (state: RootState): string =>
  state.filteredTodos.searchParam;
export const getSortParam = (state: RootState): todosSortValues =>
  state.filteredTodos.sortParam;
export const getStatusParam = (state: RootState): todosStatusValues =>
  state.filteredTodos.todosStatus;

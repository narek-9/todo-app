import { ITodosState } from "../slices/todosSlice";
import { todo } from "../../types";
import { RootState } from "..";

export const getTodos = (state: RootState): todo[] => state.todosData.todos;
export const getTodosData = (state: RootState): ITodosState => state.todosData;

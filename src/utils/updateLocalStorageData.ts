import { todo } from "../types";

export const updateLocalStorageData = (todos: todo[]) =>
  localStorage.setItem("todos", JSON.stringify(todos));

import store from "../redux";
import { makeTodoExpired } from "../redux/slices/todosSlice";
import { checkIfDateValid } from "./checkIfDateValid";
import { updateLocalStorageData } from "./updateLocalStorageData";
import { todo } from "../types";

export const checkExpiredTodos = () => {
  const todos: todo[] =
    JSON.parse(localStorage.getItem("todos") as string) || [];

  const dispatch = store.dispatch;

  const updatedTodos = todos.map((todo) => {
    if (todo.endDate && !checkIfDateValid(todo.endDate)) {
      dispatch(makeTodoExpired(todo.id));
      return { ...todo, isExpired: true };
    }
    return todo;
  });

  updateLocalStorageData(updatedTodos);

  return setTimeout(checkExpiredTodos, 30000);
};

import { todo } from "../types";

export const checkIfTitleUnique = (
  todos: todo[],
  value: string,
  ignoredId?: string
): boolean =>
  !todos.find((todo) => {
    if (todo.id === ignoredId) {
      return false;
    }
    return todo.title === value;
  });

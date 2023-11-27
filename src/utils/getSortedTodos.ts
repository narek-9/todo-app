import { getValidStringDate } from "./getValidStringDate";
import { todosSortValues, todo, todosStatusValues } from "../types";

export const getSortedTodos = (
  todos: todo[],
  sortedParam: todosSortValues,
  searchParam: string,
  todosStatus: todosStatusValues
): todo[] => {
  let searchTodos = todos.filter(
    (todo) =>
      todo.title.toLowerCase().includes(searchParam.toLowerCase()) ||
      todo.description.toLowerCase().includes(searchParam.toLowerCase())
  );

  switch (todosStatus) {
    case todosStatusValues.EXPIRED:
      searchTodos = searchTodos.filter((todo) => todo.isExpired);
      break;
    case todosStatusValues.COMPLETED:
      searchTodos = searchTodos.filter((todo) => todo.isCompleted);
      break;
    case todosStatusValues.INCOMPLETED:
      searchTodos = searchTodos.filter(
        (todo) => !todo.isCompleted && !todo.isExpired
      );
      break;
    case todosStatusValues.STATUS:
      break;
  }

  if (sortedParam === todosSortValues.SORTED_BY) {
    return searchTodos;
  } else if (
    sortedParam === todosSortValues.CREATE_DATE ||
    sortedParam === todosSortValues.END_DATE
  ) {
    const todosWithoutParamField: todo[] = [];
    const coppiedTodos = searchTodos.filter((todo) => {
      if (todo[sortedParam]) {
        return true;
      } else {
        todosWithoutParamField.push(todo);
        return false;
      }
    });

    return coppiedTodos
      .sort(
        (a, b) =>
          new Date(a[sortedParam]).getTime() -
          new Date(b[sortedParam]).getTime()
      )
      .map((todo) => ({
        ...todo,
        [sortedParam]: getValidStringDate(todo[sortedParam].toString()),
      }))
      .concat(todosWithoutParamField);
  } else {
    const todosWithoutParam: todo[] = [];
    const coppiedTodos = searchTodos.filter((todo) => {
      if (todo[sortedParam]) {
        return true;
      } else {
        todosWithoutParam.push(todo);
        return false;
      }
    });

    return coppiedTodos
      .sort((a, b) => a[sortedParam].localeCompare(b[sortedParam]))
      .concat(todosWithoutParam);
  }
};

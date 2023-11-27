import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";

import { selectTodosPage } from "../../redux/slices/todosSlice";
import { updateFilteredTodos } from "../../redux/slices/filteredTodosSlice";
import { getTodosData } from "../../redux/selectors/todosSelectors";
import { getFilteredTodosData } from "../../redux/selectors/filteredTodosSelectors";
import { checkExpiredTodos } from "../../utils/checkExpiredTodos";
import { todosSortValues, todosStatusValues } from "../../types";

import { TodoItem } from "../TodoItem";
import { Pagination } from "../Pagination";

import styles from "./TodoList.module.scss";

export const TodoList = () => {
  const todosData = useSelector(getTodosData);
  const filteredTodosData = useSelector(getFilteredTodosData);

  const dispatch = useDispatch();

  const slicedTodos = todosData.todos.slice(
    (todosData.currentPage - 1) * 4,
    todosData.currentPage * 4
  );
  const slicedFilteredTodos = filteredTodosData.todos.slice(
    (filteredTodosData.currentPage - 1) * 4,
    filteredTodosData.currentPage * 4
  );
  const isFilterParamSelected: boolean =
    !!filteredTodosData.searchParam.trim() ||
    filteredTodosData.sortParam !== todosSortValues.SORTED_BY ||
    filteredTodosData.todosStatus !== todosStatusValues.STATUS;

  useEffect(() => {
    dispatch(updateFilteredTodos(todosData.todos));
  }, [todosData.todos]);

  useEffect(() => {
    if (!slicedTodos.length && todosData.currentPage - 1) {
      dispatch(selectTodosPage(todosData.currentPage - 1));
    }
  }, [slicedTodos]);

  useEffect(() => {
    const intervalId = checkExpiredTodos();
    return () => clearInterval(intervalId);
  }, []);

  const todoWrapperRef = useRef<HTMLDivElement>(null);

  const hideTodos = (side: "left" | "right") => {
    if (side === "left") {
      todoWrapperRef.current?.classList.add(styles.TodoWrapper__hideToLeft);
    } else {
      todoWrapperRef.current?.classList.add(styles.TodoWrapper__hideToRight);
    }
  };

  const showTodos = () => {
    todoWrapperRef.current?.classList.remove(styles.TodoWrapper__hideToLeft);
    todoWrapperRef.current?.classList.remove(styles.TodoWrapper__hideToRight);
  };

  return (
    <>
      <div className={styles.TodoWrapper} ref={todoWrapperRef}>
        {(isFilterParamSelected ? slicedFilteredTodos : slicedTodos).map(
          (todo) => (
            <TodoItem todo={todo} key={todo.id} />
          )
        )}
      </div>
      <Pagination
        todosData={isFilterParamSelected ? filteredTodosData : todosData}
        isFilterParamSelected={isFilterParamSelected}
        hideTodos={hideTodos}
        showTodos={showTodos}
      />
    </>
  );
};

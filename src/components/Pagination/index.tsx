import { FC } from "react";
import { useDispatch } from "react-redux";

import { selectTodosPage } from "../../redux/slices/todosSlice";
import { selectFilteredTodosPage } from "../../redux/slices/filteredTodosSlice";
import { todo } from "../../types";

import arrow from "../../assets/arrow.png";
import styles from "./Pagination.module.scss";

interface IPaginationProps {
  todosData: {
    todos: todo[];
    currentPage: number;
  };
  isFilterParamSelected: boolean;
  hideTodos: (side: "left" | "right") => void;
  showTodos: () => void;
}

export const Pagination: FC<IPaginationProps> = ({
  todosData,
  isFilterParamSelected,
  hideTodos,
  showTodos,
}) => {
  const dispatch = useDispatch();

  const pagesCount = Math.ceil(todosData.todos.length / 4);
  const pages = new Array(pagesCount).fill(0);

  const isButtonsDisabled = pagesCount === 0 || pagesCount === 1;

  return todosData.todos.length ? (
    <ul className={styles.Pages}>
      <li
        className={`${styles.Pages__page} ${
          isButtonsDisabled ? styles.disabled : ""
        }`}
        onClick={() => {
          if (!isButtonsDisabled) {
            hideTodos("right");
            if (isFilterParamSelected) {
              setTimeout(() => {
                if (todosData.currentPage === 1) {
                  dispatch(selectFilteredTodosPage(pagesCount));
                } else {
                  dispatch(selectFilteredTodosPage(todosData.currentPage - 1));
                }
                showTodos();
              }, 500);
            } else {
              setTimeout(() => {
                if (todosData.currentPage === 1) {
                  dispatch(selectTodosPage(pagesCount));
                } else {
                  dispatch(selectTodosPage(todosData.currentPage - 1));
                }
                showTodos();
              }, 500);
            }
          }
        }}
      >
        <img className={styles.leftArrow} src={arrow} alt="" />
      </li>
      {pages.map((_, index) => {
        return (
          <li
            className={`${styles.Pages__page} ${
              todosData.currentPage === index + 1
                ? styles.Pages__page__selected
                : ""
            }`}
            onClick={() => {
              if (index + 1 !== todosData.currentPage) {
                hideTodos(index + 1 > todosData.currentPage ? "left" : "right");
              }
              if (isFilterParamSelected) {
                setTimeout(() => {
                  dispatch(selectFilteredTodosPage(index + 1));
                  showTodos();
                }, 500);
              } else {
                setTimeout(() => {
                  dispatch(selectTodosPage(index + 1));
                  showTodos();
                }, 500);
              }
            }}
            key={index}
          >
            {index + 1}
          </li>
        );
      })}
      <li
        className={`${styles.Pages__page} ${
          isButtonsDisabled ? styles.disabled : ""
        }`}
        onClick={() => {
          if (!isButtonsDisabled) {
            hideTodos("left");
            if (isFilterParamSelected) {
              setTimeout(() => {
                if (todosData.currentPage === pagesCount) {
                  dispatch(selectFilteredTodosPage(1));
                } else {
                  dispatch(selectFilteredTodosPage(todosData.currentPage + 1));
                }
                showTodos();
              }, 500);
            } else {
              setTimeout(() => {
                if (todosData.currentPage === pagesCount) {
                  dispatch(selectTodosPage(1));
                } else {
                  dispatch(selectTodosPage(todosData.currentPage + 1));
                }
                showTodos();
              }, 500);
            }
          }
        }}
      >
        <img className={styles.rightArrow} src={arrow} alt="" />
      </li>
    </ul>
  ) : (
    ""
  );
};

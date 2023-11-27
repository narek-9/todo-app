import { FC, useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";

import {
  deleteTodo,
  makeTodoExpired,
  toggleCompletingTodo,
} from "../../redux/slices/todosSlice";
import { checkIfDateValid } from "../../utils/checkIfDateValid";
import { todo } from "../../types";

import TodoForm from "../TodoForm";
import { Button } from "../Button";

import openingArrow from "../../assets/arrow.png";
import styles from "./TodoItem.module.scss";

interface ITodoItemProps {
  todo: todo;
}

export const TodoItem: FC<ITodoItemProps> = ({ todo }) => {
  const [isTodoEditing, setIsTodoEditing] = useState<boolean>(false);
  const [isDataVisible, setIsDataVisible] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const descriptionRef = useRef<HTMLParagraphElement>(null);

  const dispatch = useDispatch();

  useEffect(() => {
    if (todo.endDate && !checkIfDateValid(todo.endDate)) {
      dispatch(makeTodoExpired(todo.id));
    }
  }, [todo.id]);

  useEffect(() => {
    if (Number(descriptionRef.current?.offsetHeight) === 300) {
      descriptionRef.current?.classList.add(styles.overflowScroll);
    }
  }, [isDataVisible]);

  if (isTodoEditing) {
    return (
      <TodoForm
        todo={todo}
        setIsTodoEditing={() => setIsTodoEditing((prev) => !prev)}
      />
    );
  }

  const handleDelete = () => {
    setIsDeleting(true);
    setTimeout(() => {
      dispatch(deleteTodo(todo.id));
    }, 500);
  };

  return (
    <div className={`${styles.Todo} ${isDeleting ? styles.deleting : ""}`}>
      <h2
        className={`${styles.Todo__title} ${
          todo.isCompleted || todo.isExpired
            ? styles.Todo__completed
            : styles.Todo__incompleted
        }`}
      >
        <img
          src={openingArrow}
          alt={isDataVisible ? "Close" : "Open"}
          onClick={() => {
            setIsDataVisible((prev) => !prev);
          }}
          className={`${styles.Todo__title__img} ${
            isDataVisible ? styles.turned : ""
          }`}
        />
        {todo.title} {todo.isExpired && <span>(expired)</span>}
      </h2>
      <div
        className={`${styles.Todo__data} ${
          isDataVisible ? styles.visible : ""
        }`}
      >
        {todo.description && (
          <p
            className={`${styles.Todo__data__description} ${
              todo.isCompleted || todo.isExpired
                ? styles.Todo__completed
                : styles.Todo__incompleted
            }`}
            ref={descriptionRef}
          >
            {todo.description}
          </p>
        )}
        <div className={styles.Todo__data__dates}>
          <small
            className={`${
              todo.isCompleted || todo.isExpired
                ? styles.Todo__completed
                : styles.Todo__incompleted
            }`}
          >
            Create Date: {todo.createDate}
          </small>
          {todo.endDate && (
            <small
              className={`${
                todo.isCompleted || todo.isExpired
                  ? styles.Todo__completed
                  : styles.Todo__incompleted
              }`}
            >
              End Date: {todo.endDate}
            </small>
          )}
        </div>
      </div>
      <div className={styles.Todo__buttons}>
        {todo.isExpired ? (
          <Button onClick={handleDelete}>Delete</Button>
        ) : todo.isCompleted ? (
          <>
            <Button onClick={handleDelete}>Delete</Button>
            <Button onClick={() => dispatch(toggleCompletingTodo(todo.id))}>
              Incompleted
            </Button>
          </>
        ) : (
          <>
            <Button onClick={() => setIsTodoEditing(true)}>Edit</Button>
            <Button onClick={handleDelete}>Delete</Button>
            <Button onClick={() => dispatch(toggleCompletingTodo(todo.id))}>
              Completed
            </Button>
          </>
        )}
      </div>
    </div>
  );
};

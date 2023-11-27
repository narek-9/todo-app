import React, { FC, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { editTodo } from "../../redux/slices/todosSlice";
import { getTodos } from "../../redux/selectors/todosSelectors";
import { getValidStringDate } from "../../utils/getValidStringDate";
import { replaceSpaces } from "../../utils/replaceSpaces";
import { checkIfEndDateValid } from "../../utils/checkIfEndDateValid";
import { checkIfTitleValid } from "../../utils/checkIfTitleValid";
import { todo } from "../../types";

import { Button } from "../Button";
import { FormInput } from "../FormInput";

import styles from "./TodoForm.module.scss";

interface ITodoProps {
  todo: todo;
  setIsTodoEditing: React.Dispatch<React.SetStateAction<boolean>>;
}

export const TodoForm: FC<ITodoProps> = ({ todo, setIsTodoEditing }) => {
  const [updatedTodo, setUpdatedTodo] = useState({
    id: todo.id,
    title: todo.title,
    description: todo.description,
    endDate: todo.endDate,
  });
  const [errorData, setErrorData] = useState<{
    errorText: string;
    invalidInput: "title" | "endDate" | "";
  }>({
    errorText: "",
    invalidInput: "",
  });

  const titleInputRef = useRef<HTMLInputElement>(null);
  const endDateInputRef = useRef<HTMLInputElement>(null);

  const dispatch = useDispatch();
  const todos = useSelector(getTodos);

  const handleUpdateTodo = (endDateValue: string) => {
    dispatch(
      editTodo({
        id: todo.id,
        title: replaceSpaces(updatedTodo.title),
        description: replaceSpaces(updatedTodo.description),
        endDate: endDateValue,
      })
    );

    setUpdatedTodo((prev) => ({
      ...prev,
      title: "",
      description: "",
      endDate: "",
    }));
    setIsTodoEditing(false);
  };

  const handleSubmit = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    if (
      checkIfTitleValid(
        updatedTodo.title,
        titleInputRef,
        todos,
        styles,
        setErrorData,
        todo.id
      )
    ) {
      const endDateStringValue = getValidStringDate(updatedTodo.endDate);

      if (
        checkIfEndDateValid(
          updatedTodo.endDate,
          endDateInputRef,
          styles,
          setErrorData
        )
      ) {
        handleUpdateTodo(endDateStringValue);
      }
    }
  };

  const handleChange = (newValue: string, field: string) =>
    setUpdatedTodo((prev) => ({ ...prev, [field]: newValue }));

  return (
    <form className={styles.TodoForm}>
      <label htmlFor="todoForm-title" className={styles.TodoForm__label}>
        <p>Title</p>
        {errorData.invalidInput === "title" && (
          <span className={styles.redText}>{errorData.errorText}</span>
        )}
        <FormInput
          type="text"
          value={updatedTodo.title}
          onChange={(e) => handleChange(e.target.value, "title")}
          placeholder="New Title"
          id="todoForm-title"
          autoFocus
          forwardedRef={titleInputRef}
        />
      </label>
      <label htmlFor="todoForm-description" className={styles.TodoForm__label}>
        <p>Description</p>
        <FormInput
          type="text"
          value={updatedTodo.description}
          onChange={(e) => handleChange(e.target.value, "description")}
          placeholder="New Description"
          id="todoForm-description"
        />
      </label>
      <label htmlFor="todoForm-endDate" className={styles.TodoForm__label}>
        <p>Selecte End Date</p>
        {errorData.invalidInput === "endDate" && (
          <span className={styles.redText}>{errorData.errorText}</span>
        )}
        <div className={styles.TodoForm__label__endDateWrapper}>
          <FormInput
            type="datetime-local"
            value={updatedTodo.endDate}
            onChange={(e) => handleChange(e.target.value, "endDate")}
            placeholder="New End Date"
            id="todoForm-endDate"
            forwardedRef={endDateInputRef}
          />
          <button
            className={styles.TodoForm__label__endDateWrapper__clearBtn}
            onClick={() => {
              setUpdatedTodo((prev) => ({ ...prev, endDate: "" }));
              setErrorData({ errorText: "", invalidInput: "" });
              endDateInputRef.current?.classList.remove(styles.invalidInput);
            }}
            type="button"
          >
            clear
          </button>
        </div>
      </label>
      <div className={styles.TodoForm__buttons}>
        <Button onClick={handleSubmit}>Save</Button>
        <Button onClick={() => setIsTodoEditing(false)}>Dont Edit</Button>
      </div>
    </form>
  );
};

export default TodoForm;

import { FC, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { v4 as uuidv4 } from "uuid";

import { addTodo, selectTodosPage } from "../../redux/slices/todosSlice";
import {
  resetSearchParam,
  resetSortedParam,
  resetStatusParam,
} from "../../redux/slices/filteredTodosSlice";
import { getTodos } from "../../redux/selectors/todosSelectors";
import { getValidStringDate } from "../../utils/getValidStringDate";
import { replaceSpaces } from "../../utils/replaceSpaces";
import { checkIfEndDateValid } from "../../utils/checkIfEndDateValid";
import { checkIfTitleValid } from "../../utils/checkIfTitleValid";
import { todo } from "../../types";

import { Button } from "../Button";
import { FormInput } from "../FormInput";

import styles from "./Form.module.scss";

export const Form: FC = () => {
  const [todo, setTodo] = useState<todo>({
    id: "",
    title: "",
    description: "",
    isCompleted: false,
    isExpired: false,
    createDate: "",
    endDate: "",
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

  const todos = useSelector(getTodos);
  const dispatch = useDispatch();

  const handleAddTodo = (endDateValue: string) => {
    const newTodo = {
      ...todo,
      id: uuidv4(),
      title: replaceSpaces(todo.title),
      description: replaceSpaces(todo.description),
      createDate: getValidStringDate(new Date().toString()),
      endDate: endDateValue,
    };

    dispatch(addTodo(newTodo));
    dispatch(selectTodosPage(1));
    dispatch(resetSortedParam(todos));
    dispatch(resetSearchParam(todos));
    dispatch(resetStatusParam(todos));

    setTodo((prev) => ({
      ...prev,
      id: "",
      title: "",
      description: "",
      isCompleted: false,
      createDate: "",
      endDate: "",
    }));
  };

  const handleSubmit = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();

    if (
      checkIfTitleValid(todo.title, titleInputRef, todos, styles, setErrorData)
    ) {
      const endDateStringValue = getValidStringDate(todo.endDate);

      if (
        checkIfEndDateValid(
          endDateStringValue,
          endDateInputRef,
          styles,
          setErrorData
        )
      ) {
        handleAddTodo(endDateStringValue);
      }
    }
  };

  const handleChange = (newValue: string, field: string) => {
    setTodo((prev) => ({ ...prev, [field]: newValue }));
  };

  return (
    <form className={styles.Form}>
      <label htmlFor="form-title" className={styles.Form__label}>
        <p>Title</p>
        {errorData.invalidInput === "title" && (
          <span className={styles.redText}>{errorData.errorText}</span>
        )}
        <FormInput
          type="text"
          value={todo.title}
          onChange={(e) => handleChange(e.target.value, "title")}
          id="form-title"
          autoFocus
          required
          forwardedRef={titleInputRef}
        />
      </label>
      <label htmlFor="form-description" className={styles.Form__label}>
        <p>Description</p>
        <FormInput
          type="text"
          value={todo.description}
          onChange={(e) => handleChange(e.target.value, "description")}
          id="form-description"
        />
      </label>
      <label htmlFor="form-endDate" className={styles.Form__label}>
        <p>Selecte End Date</p>
        {errorData.invalidInput === "endDate" && (
          <span className={styles.redText}>{errorData.errorText}</span>
        )}
        <div className={styles.Form__label__endDateWrapper}>
          <FormInput
            type="datetime-local"
            value={todo.endDate}
            onChange={(e) => handleChange(e.target.value, "endDate")}
            id="form-endDate"
            forwardedRef={endDateInputRef}
          />
          <button
            onClick={() => {
              setTodo((prev) => ({ ...prev, endDate: "" }));
              setErrorData({ errorText: "", invalidInput: "" });
              endDateInputRef.current?.classList.remove(styles.invalidInput);
            }}
            className={styles.Form__label__endDateWrapper__clearBtn}
            type="button"
          >
            clear
          </button>
        </div>
      </label>
      <Button onClick={handleSubmit}>Add Task</Button>
    </form>
  );
};

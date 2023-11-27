import { checkIfTitleUnique } from "./checkIfTitleUnique";
import { replaceSpaces } from "./replaceSpaces";
import { todo } from "../types";

export const checkIfTitleValid = (
  titleValue: string,
  titleInputRef: React.RefObject<HTMLInputElement>,
  todos: todo[],
  styles: CSSModuleClasses,
  setErrorData: React.Dispatch<
    React.SetStateAction<{
      errorText: string;
      invalidInput: "title" | "endDate" | "";
    }>
  >,
  ignoredId?: string
):boolean => {
  if (replaceSpaces(titleValue)) {
    if (checkIfTitleUnique(todos, replaceSpaces(titleValue), ignoredId)) {
      setErrorData({ errorText: "", invalidInput: "" });
      titleInputRef.current?.classList.remove(styles.invalidInput);
      return true;
    } else {
      setErrorData({
        errorText: "Already have the same task!",
        invalidInput: "title",
      });
      titleInputRef.current?.classList.add(styles.invalidInput);
      return false;
    }
  } else {
    setErrorData({
      errorText: "Title can't be empty!",
      invalidInput: "title",
    });
    titleInputRef.current?.classList.add(styles.invalidInput);
    return false;
  }
};

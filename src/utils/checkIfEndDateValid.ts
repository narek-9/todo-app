import { checkIfDateValid } from "./checkIfDateValid";

export const checkIfEndDateValid = (
  endDateValue: string,
  endDateInputRef: React.RefObject<HTMLInputElement>,
  styles: CSSModuleClasses,
  setErrorData: React.Dispatch<
    React.SetStateAction<{
      errorText: string;
      invalidInput: "title" | "endDate" | "";
    }>
  >
): boolean => {
  if (endDateValue.length) {
    if (checkIfDateValid(endDateValue)) {
      setErrorData({ errorText: "", invalidInput: "" });
      endDateInputRef.current?.classList.remove(styles.invalidInput);
      return true;
    } else {
      setErrorData({
        errorText: "Invalid date!",
        invalidInput: "endDate",
      });
      endDateInputRef.current?.classList.add(styles.invalidInput);
      return false;
    }
  } else {
    setErrorData({ errorText: "", invalidInput: "" });
    endDateInputRef.current?.classList.remove(styles.invalidInput);
    return true;
  }
};

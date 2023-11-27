import { FC, InputHTMLAttributes } from "react";

import styles from "./FormInput.module.scss";

interface FormInputProps extends InputHTMLAttributes<HTMLInputElement> {
  forwardedRef?: React.Ref<HTMLInputElement>;
}

export const FormInput: FC<FormInputProps> = ({ forwardedRef, ...props }) => {
  return <input className={styles.Input} ref={forwardedRef} {...props} />;
};

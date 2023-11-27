import React, { ButtonHTMLAttributes, FC } from "react";

import styles from "./Button.module.scss";

interface IButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  onClick: React.MouseEventHandler<HTMLButtonElement>;
}

export const Button: FC<IButtonProps> = ({ onClick, children, disabled }) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`${styles.Button} ${disabled ? styles.Button__disabled : ""}`}
    >
      {children}
    </button>
  );
};

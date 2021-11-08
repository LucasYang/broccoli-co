import React from "react";
import styles from "./index.module.css";

interface ButtonInterface {
  children: React.ReactElement;
  className?: string;
  onClick?: (e: React.MouseEvent<HTMLElement>) => void;
  disabled?: boolean;
}

export function Button({ children, className, ...rest }: ButtonInterface) {
  return (
    <button {...rest} className={`${styles.btn} ${className}`}>
      {children}
    </button>
  );
}

export default Button;

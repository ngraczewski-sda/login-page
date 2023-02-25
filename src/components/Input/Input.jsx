import { Error } from "../error/Error";
import styles from "./Input.module.css";

export const Input = ({ id, label, error, touched, ...props }) => {
  return (
    <div className={styles.wrapper}>
      <label className={styles.label} htmlFor={id}>
        {label}
      </label>
      <input className={styles.input} {...props} />
      {!!error && touched && <Error>{error}</Error>}
    </div>
  );
};

import styles from "./Input.module.css";

export const Input = ({ id, label, error, ...props }) => {
  return (
    <div className={styles.wrapper}>
      <label className={styles.label} htmlFor={id}>
        {label}
      </label>
      <input className={styles.input} {...props} />
      {!!error && <div className={styles.error}>{error}</div>}
    </div>
  );
};

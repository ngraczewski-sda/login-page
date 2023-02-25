import styles from "./Button.module.css";

export const Button = ({ className, ...props }) => {
  return (
    <button
      className={[styles.button, className].join(" ")}
      {...props}
    ></button>
  );
};

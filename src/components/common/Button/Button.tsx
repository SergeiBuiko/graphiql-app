import styles from './Button.module.css';

interface ButtonProps {
  text: string;
  clickHandler: () => void;
}

export const Button = ({ text, clickHandler }: ButtonProps) => {
  return (
    <div className={styles.buttonWrapper}>
      <button className={styles.button} onClick={clickHandler}>
        {text}
      </button>
    </div>
  );
};

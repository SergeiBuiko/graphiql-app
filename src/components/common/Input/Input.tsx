import styles from './Input.module.css';
import { forwardRef } from 'react';

interface InputProps {
  type?: string;
  name?: string;
  placeholder?: string;
  onInput?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  register?: unknown;
  error?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>((props, ref) => {
  return (
    <div>
      <div className={styles.inputWrapper}>
        <label className={styles.label} htmlFor={props.name}>
          {props.name}
        </label>
        <input
          className={`${styles.input} ${props.error ? styles.error : ''}`}
          type={props.type}
          placeholder={props.placeholder}
          onInput={props.onInput}
          ref={ref}
          {...props}
        />
      </div>
      {props.error && <p className={styles.errorMessage}>{props.error}</p>}
    </div>
  );
});

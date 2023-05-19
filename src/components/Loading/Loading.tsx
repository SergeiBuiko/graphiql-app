import styles from './Loading.module.css';

export const Loading = () => {
  return (
    <div className={styles.contentWrapper}>
      <p className={styles.text}>Loading ...</p>
    </div>
  );
};

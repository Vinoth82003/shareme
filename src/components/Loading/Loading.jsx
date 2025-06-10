import styles from './loading.module.css';

export const ButtonLoader = () => (
  <div className={styles.buttonLoader}>
    <div className={styles.buttonSpinner}></div>
  </div>
);

export const PageLoader = () => (
  <div className={styles.pageLoaderContainer}>
    <div className={styles.pageLoader}>
      <div className={styles.circle}></div>
      <div className={styles.circle}></div>
      <div className={styles.circle}></div>
    </div>
  </div>
);
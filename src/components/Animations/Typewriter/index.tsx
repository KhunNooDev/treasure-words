import styles from './styles.module.scss';

export default function Typewriter() {
  return (
    <div className={styles.typewriter}>
      <div className={styles.slide}><i></i></div>
      <div className={styles.paper}></div>
      <div className={styles.keyboard}></div>
    </div>
  );
}

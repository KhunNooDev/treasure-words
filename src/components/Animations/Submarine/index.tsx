import styles from './styles.module.scss';

export default function Submarine() {
  return (
    <div className={styles.sea}>
      <div className={styles.circleWrapper}>
        <div className={styles.bubble}></div>
        <div className={styles.submarineWrapper}>
          <div className={styles.submarineBody}>
            <div className={styles.window}></div>
            <div className={styles.engine}></div>
            <div className={styles.light}></div>
          </div>
          <div className={styles.helix}></div>
          <div className={styles.hat}>
            <div className={styles.ledsWrapper}>
              <div className={styles.periscope}></div>
              <div className={styles.leds}></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

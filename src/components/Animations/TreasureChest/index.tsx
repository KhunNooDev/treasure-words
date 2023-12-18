import styles from './styles.module.scss';

export default function TreasureChest() {
  return (
    <div className={styles.treasureChest}>
      <div className={styles.chest}>
        <div className={styles.lid}>
          <div className={styles.lidTop}></div>
        </div>
        <div className={styles.base}>
          <div className={styles.gold}></div>
          <div className={styles.jewel}></div>
          <div className={styles.jewel2}></div>
          <div className={styles.jewel3}></div>
          {/* Add more jewels or items as needed */}
        </div>
      </div>
    </div>
  );
}

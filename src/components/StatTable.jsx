import styles from "./styles.module.css";

function StatTable({ title, stats }) {
  return (
    <>
      <h2>{title}</h2>
      <table className={styles.table}>
        <thead>
          <tr>
            <th className={styles.th}>Month</th>
            <th className={styles.th}>Min Orders</th>
            <th className={styles.th}>Max Orders</th>
            <th className={styles.th}>Avg Orders</th>
          </tr>
        </thead>
        <tbody>
          {Object.keys(stats).map((month) => (
            <tr key={month}>
              <td className={styles.td}>{month}</td>
              <td className={styles.td}>{stats[month].min}</td>
              <td className={styles.td}>{stats[month].max}</td>
              <td className={styles.td}>{stats[month].avg}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}

export default StatTable;

import styles from "./styles.module.css";

function SalesTable({ title, data, isCurrency = false }) {
  return (
    <>
      <h2>{title}</h2>
      <table className={styles.table}>
        <thead>
          <tr>
            <th className={styles.th}>Month</th>
            <th className={styles.th}>Data</th>
          </tr>
        </thead>
        <tbody>
          {Object.keys(data).map((month) => (
            <tr key={month}>
              <td className={styles.td}>{month}</td>
              <td className={styles.td}>
                {isCurrency ? `₹${data[month].toLocaleString()}` : data[month]}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}

export default SalesTable;

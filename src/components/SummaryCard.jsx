import styles from "./styles.module.css";

function SummaryCard({ title, value }) {
  return (
    <div className={styles.summaryCard}>
      <h4>{title}</h4>
      <p>{value}</p>
    </div>
  );
}

export default SummaryCard;

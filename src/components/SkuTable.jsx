import styles from "./styles.module.css";

function SkuTable({ month, skus }) {
  return (
    <>
      <h2>SKU Details for {month}</h2>
      <table className={styles.table}>
        <thead>
          <tr>
            <th className={styles.th}>Item Name</th>
            <th className={styles.th}>Unit Price</th>
            <th className={styles.th}>Total Orders</th>
            <th className={styles.th}>Total Quantity</th>
            <th className={styles.th}>Total Price</th>
          </tr>
        </thead>
        <tbody>
          {Object.keys(skus).map((sku) => (
            <tr key={sku}>
              <td className={styles.td}>{sku}</td>
              <td className={styles.td}>₹{skus[sku].unitPrice}</td>
              <td className={styles.td}>{skus[sku].totalOrders}</td>
              <td className={styles.td}>{skus[sku].totalQuantity}</td>
              <td className={styles.td}>
                ₹{skus[sku].totalPrice.toLocaleString()}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}

export default SkuTable;

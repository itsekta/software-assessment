import { useEffect, useState } from "react";
import salesData from "../assets/sales-data.json";
import styles from "./styles.module.css";
import SummaryCard from "./SummaryCard";
import SalesTable from "./SalesTable";
import StatTable from "./StatTable";
import SkuTable from "./SkuTable";

const SalesReport = () => {
  const [totalSales, setTotalSales] = useState(0);
  const [monthlySales, setMonthlySales] = useState({});
  const [popularItems, setPopularItems] = useState({});
  const [revenueItems, setRevenueItems] = useState({});
  const [popularItemStats, setPopularItemStats] = useState({});
  const [monthSkuDetails, setMonthSkuDetails] = useState({});
  const [selectedMonth, setSelectedMonth] = useState("");

  useEffect(() => {
    const getMonth = (dateStr) => dateStr.slice(0, 7);

    let totalStoreSales = 0;
    const monthWiseSales = {};
    const monthWiseQuantity = {};
    const monthWiseRevenue = {};
    const monthWiseSkus = {};

    salesData.forEach((sale) => {
      const month = getMonth(sale.Date);
      totalStoreSales += sale["Total Price"];

      if (!monthWiseSales[month]) monthWiseSales[month] = 0;
      monthWiseSales[month] += sale["Total Price"];

      if (!monthWiseQuantity[month]) monthWiseQuantity[month] = {};
      if (!monthWiseQuantity[month][sale.SKU])
        monthWiseQuantity[month][sale.SKU] = 0;
      monthWiseQuantity[month][sale.SKU] += sale.Quantity;

      if (!monthWiseRevenue[month]) monthWiseRevenue[month] = {};
      if (!monthWiseRevenue[month][sale.SKU])
        monthWiseRevenue[month][sale.SKU] = 0;
      monthWiseRevenue[month][sale.SKU] += sale["Total Price"];

      // Gather SKU details
      if (!monthWiseSkus[month]) monthWiseSkus[month] = {};
      if (!monthWiseSkus[month][sale.SKU]) {
        monthWiseSkus[month][sale.SKU] = {
          unitPrice: sale["Unit Price"],
          totalOrders: 0,
          totalQuantity: 0,
          totalPrice: 0,
        };
      }
      monthWiseSkus[month][sale.SKU].totalOrders += 1;
      monthWiseSkus[month][sale.SKU].totalQuantity += sale.Quantity;
      monthWiseSkus[month][sale.SKU].totalPrice += sale["Total Price"];
    });

    const popularItemByMonth = {};
    const revenueItemByMonth = {};
    const popularItemOrderStats = {};

    Object.keys(monthWiseQuantity).forEach((month) => {
      const items = Object.keys(monthWiseQuantity[month]);
      let maxQuantity = 0;
      let maxRevenue = 0;
      let popularItem = "";
      let revenueItem = "";

      items.forEach((item) => {
        const quantity = monthWiseQuantity[month][item];
        const revenue = monthWiseRevenue[month][item];

        if (quantity > maxQuantity) {
          maxQuantity = quantity;
          popularItem = item;
        }

        if (revenue > maxRevenue) {
          maxRevenue = revenue;
          revenueItem = item;
        }
      });

      popularItemByMonth[month] = popularItem;
      revenueItemByMonth[month] = revenueItem;

      const quantities = Object.values(monthWiseQuantity[month]);
      const totalOrders = quantities.reduce((acc, qty) => acc + qty, 0);
      popularItemOrderStats[month] = {
        min: Math.min(...quantities),
        max: Math.max(...quantities),
        avg: (totalOrders / quantities.length).toFixed(2),
      };
    });

    setTotalSales(totalStoreSales);
    setMonthlySales(monthWiseSales);
    setPopularItems(popularItemByMonth);
    setRevenueItems(revenueItemByMonth);
    setPopularItemStats(popularItemOrderStats);
    setMonthSkuDetails(monthWiseSkus);
  }, []);

  const handleMonthChange = (e) => {
    setSelectedMonth(e.target.value);
  };

  return (
    <div className={styles.container}>
      <h2>Ice Cream Parlour: Sales Report</h2>
      {totalSales && (
        <div>
          <SummaryCard
            title="Total Sales"
            value={`$${totalSales.toFixed(2)}`}
          />
        </div>
      )}

      <SalesTable
        title="Month-wise Sales Totals"
        data={monthlySales}
        isCurrency={true}
      />
      <SalesTable
        title="Most Popular Item (by Quantity) in Each Month"
        data={popularItems}
      />
      <SalesTable
        title="Items Generating Most Revenue in Each Month"
        data={revenueItems}
      />
      <StatTable
        title="Popular Item Stats (Min, Max, Avg Orders)"
        stats={popularItemStats}
      />
      <div>
        <h2>Month wise item data:</h2>
        <label htmlFor="monthDropdown">Select Month:</label>
        <select
          id="monthDropdown"
          className={styles.dropdown}
          onChange={handleMonthChange}
        >
          <option value="">-- Select a Month --</option>
          {Object.keys(monthlySales).map((month) => (
            <option key={month} value={month}>
              {month}
            </option>
          ))}
        </select>
      </div>

      {selectedMonth && monthSkuDetails[selectedMonth] ? (
        <SkuTable month={selectedMonth} skus={monthSkuDetails[selectedMonth]} />
      ) : (
        selectedMonth && <p>No SKU data available for {selectedMonth}</p>
      )}
    </div>
  );
};

export default SalesReport;

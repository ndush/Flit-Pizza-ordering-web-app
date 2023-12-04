import React from "react";
import ProductsTable from "../components/ProductsTable";
import OrdersTable from "../components/OrdersTable";

const Dashboard = () => {
  return (
    <div className="flex">
      <div style={{ marginRight: "16px", margin: "auto" }}>
        <h2>Products Table</h2>
        <ProductsTable />
      </div>
      <div style={{ marginLeft: "16px", margin: "auto" }}>
        <h2>Orders Table</h2>
        <OrdersTable />
      </div>
    </div>
  );
};

export default Dashboard;

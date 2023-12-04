// OrdersTable.js
import React from "react";

const OrdersTable = () => {
  // Assuming you have a list of orders
  const orders = [
    // Sample order data
    {
      id: 1,
      product: "Product 1",
      quantity: 3,
      customer: "John Doe",
      total: 59.97,
    },
    // Add more order data as needed
  ];

  // Function to handle the next stage action
  const handleNextStage = (orderId) => {
    console.log(`Moving order with ID: ${orderId} to the next stage`);
  };

  return (
    <div style={{ textAlign: "center" }}>
      <table
        style={{ borderCollapse: "collapse", width: "80%", padding: "16px" }}
      >
        <thead>
          <tr>
            <th>ID</th>
            <th>Customer</th>
            <th>Total</th>
            <th>Payment</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order, index) => (
            <tr key={order.id}>
              <td style={{ border: "none" }}>{order.id}</td>
              <td style={{ border: "none" }}>{order.customer}</td>
              <td style={{ border: "none" }}>${order.total.toFixed(2)}</td>
              <td style={{ border: "none" }}>cash</td>
              <td style={{ border: "none" }}>Pending</td>
              <td
                style={{
                  border: "none",
                  borderBottom:
                    index < orders.length - 1 ? "1px solid #ddd" : "none",
                }}
              >
               
                <button
                  onClick={() => handleNextStage(order.id)}
                  style={{
                    backgroundColor: "green",
                    whiteSpace: "nowrap",
                    color: "white",
                  }}
                >
                  Next Stage
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default OrdersTable;

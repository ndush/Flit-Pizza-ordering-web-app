import React from "react";

const OrderDetails = ({ orderId, customer, address, total, cartDetails }) => {
  // Ensure that cartDetails is parsed from a JSON string
  if (typeof cartDetails === "string") {
    cartDetails = JSON.parse(cartDetails);
  }
 
  
  return (
    <div>
      <h2>Order Details</h2>
      <table>
        <thead>
          <tr>
            <th>Order ID</th>
            <th>Customer</th>
            <th>Address</th>
            <th>Total</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{orderId}</td>
            <td>{customer}</td>
            <td>{address}</td>
            <td>${total && total.toLocaleString()}</td>
          </tr>
        </tbody>
      </table>

      <table>
        <tbody>
         
          {cartDetails && cartDetails.map((item) => (
  <tr key={item.id}>
    <td>{item.name}</td>
    <td>{item.quantity}</td>
    <td>${item.price}</td>
  </tr>
))}

        </tbody>
      </table>
    </div>
  );
};

export default OrderDetails;

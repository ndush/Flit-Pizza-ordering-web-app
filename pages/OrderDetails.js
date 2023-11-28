import React from 'react';

const OrderDetails = ({ orderId, customer, address, total }) => {
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
    </div>
  );
};

export default OrderDetails;

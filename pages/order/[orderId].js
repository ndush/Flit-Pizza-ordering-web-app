// OrderDetailsPage.js
import React, { useEffect, useState } from 'react';
import OrderDetails from '../OrderDetails';
import { FaMoneyBill, FaHourglassStart, FaTruck } from 'react-icons/fa';
import Script from 'next/script';
import { useCart } from '../../components/CartContext';

const OrderDetailsPage = () => {
  const { orderDetails } = useCart();
  const [isPaid, setIsPaid] = useState(false);
  const [subtotal, setSubtotal] = useState(0);
  const [discount, setDiscount] = useState(0);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    if (orderDetails) {
      setIsPaid(orderDetails.isPaid || false);
      setSubtotal(orderDetails.subtotal || 0);
      setDiscount(orderDetails.discount || 0);
      setTotal(orderDetails.total || 0);
    }
  }, [orderDetails]);

  useEffect(() => {
    // Your logic based on the isPaid state
    // ...
  }, [isPaid]);

  const renderPaidOrder = () => {
    return (
      <div>
        <div className="payment-success-icon">✅</div>
        <div className="order-total paid">
          <h2>ORDER TOTAL</h2>
          <div>
            <p>Subtotal: ${subtotal.toLocaleString()}</p>
            <p>Discount: ${discount.toLocaleString()}</p>
            <p>Total: ${total.toLocaleString()}</p>
          </div>
          <p>Payment Status: Paid</p>
        </div>
      </div>
    );
  };

  const renderPayPalButton = () => {
    return (
      <div>
        <OrderDetails />
        <Script
          src={`https://www.paypal.com/sdk/js?client-id=YOUR_PAYPAL_CLIENT_ID`}
          strategy="beforeInteractive"
        />
        <div id="paypal-button-container"></div>
      </div>
    );
  };

  return (
    <div>
      {isPaid ? renderPaidOrder() : renderPayPalButton()}

      <div className="order-status-icons">
        <div className="status-icon-container">
          <FaMoneyBill className="status-icon" />
          <p>Payment Received</p>
        </div>
        <div className="status-icon-container">
          <FaHourglassStart className="status-icon" />
          <p>Preparing</p>
        </div>
        <div className="status-icon-container">
          <FaTruck className="status-icon" />
          <p>On the Way</p>
        </div>
      </div>
    </div>
  );
};

export default OrderDetailsPage;

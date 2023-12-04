import React, { useEffect, useState } from 'react';
import OrderDetails from '../OrderDetails';
import Script from 'next/script';
import { useCart } from '../../components/CartContext';
import { FaMoneyBill, FaHourglassStart, FaTruck } from 'react-icons/fa';

const OrderDetailsPage = ({ isOrderPaid }) => {
  const cart = useCart();
  const { state } = cart || {};
  const orderDetails = state?.orderDetails || {};
  const cartDetails = state?.cart || [];

  const [subtotal, setSubtotal] = useState(0);
  const [discount, setDiscount] = useState(0);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    const calculatedSubtotal = cartDetails.reduce((acc, item) => acc + (item.price || 0) * (item.quantity || 1), 0);
    const calculatedDiscount = 0; 
    const calculatedTotal = calculatedSubtotal - calculatedDiscount;

    setSubtotal(calculatedSubtotal);
    setDiscount(calculatedDiscount);
    setTotal(calculatedTotal);
  }, [cartDetails]);

  const renderPaidOrder = () => {
    return <></>; 
  };

  return (
    <div className="flex flex-col items-center">
      {isOrderPaid ? (
        renderPaidOrder()
      ) : (
        <>
          <div className="mx-auto flex">
           
            <div className="flex-1">
              <OrderDetails orderId={0} customer="Bella" address={0} total={89} cartDetails={cartDetails} />
            </div>

          
            <div className="cart-total" style={{ marginLeft: '20px', fontSize: '1.2em' }}>
              <h2>CART TOTAL</h2>
              <div>
                <p>Subtotal: ${subtotal.toLocaleString()}</p>
                <p>Discount: ${discount.toLocaleString()}</p>
                <p>Total: ${total.toLocaleString()}</p>
              </div>
              <button className="button">Paid</button>
            </div>

          
            <Script src={`https://www.paypal.com/sdk/js?client-id=${process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID}`} strategy="beforeInteractive" />
            <div id="paypal-button-container"></div>
          </div>
          <div className="order-status-icons mt-4">
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
           
            <div className="status-icon-container" style={{ marginRight: '20px' }}>
              <FaTruck className="status-icon" />
              <p>On the Way</p>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default OrderDetailsPage;

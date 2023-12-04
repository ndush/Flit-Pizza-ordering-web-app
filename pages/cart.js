import React, { useState, useEffect } from "react";
import { useCart, actionTypes } from "../components/CartContext";
import Script from "next/script";
import { v4 as uuidv4 } from "uuid";
import { useRouter } from "next/router";
import CashOnDeliveryForm from "./CashOnDeliveryForm";

const Cart = () => {
  const router = useRouter();
  const { cart, dispatch } = useCart();
  const [checkoutButtonText, setCheckoutButtonText] = useState("CHECKOUT NOW");
  const [paymentMethod, setPaymentMethod] = useState("");
  const [isSdkLoaded, setIsSdkLoaded] = useState(false);
  const [showCashOnDeliveryForm, setShowCashOnDeliveryForm] = useState(false);
  const [subtotal, setSubtotal] = useState(0);
  const [discount, setDiscount] = useState(0);
  const [total, setTotal] = useState(0);

  const convertPriceToNumber = (priceString) => {
    return parseFloat(priceString.replace('$', '').trim());
  };
  
  useEffect(() => {
    const calculatedSubtotal = cart.reduce(
      (acc, item) => acc + (convertPriceToNumber(item.price) || 0) * (item.quantity || 1),
      0
    );
    const calculatedDiscount = 0;
    const calculatedTotal = calculatedSubtotal - calculatedDiscount;

    setSubtotal(calculatedSubtotal);
    setDiscount(calculatedDiscount);
    setTotal(calculatedTotal);
  }, [cart]);

  useEffect(() => {
    const script = document.createElement("script");
    script.src =
      "https://www.paypal.com/sdk/js?client-id=ARn5FhcUL1S4anTD9LCDfewEkA5p3c6e-9a3iNe_aDMCF6SZvBZfCr21zm4ntAi7aYXLVUqdNNiz7DwN";
    script.async = true;

    script.onload = () => {
      setIsSdkLoaded(true);
      console.log("PayPal SDK loaded");
      if (window.onPayPalSDKReady) {
        window.onPayPalSDKReady();
      }
    };

    document.body.appendChild(script);

    return () => {
      if (script.parentNode) {
        script.parentNode.removeChild(script);
        console.log("PayPal script removed");
      }
    };
  }, []);

  useEffect(() => {
    if (isSdkLoaded) {
      renderPayPalButton();
    }
  }, [isSdkLoaded, total]);

  const renderPayPalButton = () => {
    const container = document.getElementById("paypal-button-container");

    if (!container) {
      console.error("PayPal button container not found");
      return;
    }

    const renderButton = () => {
      window.paypal
        .Buttons({
          createOrder: (data, actions) => {
            const orderId = uuidv4();
            return actions.order.create({
              purchase_units: [
                {
                  amount: {
                    currency_code: "USD",
                    value: total.toFixed(2),
                  },
                },
              ],
              invoice_id: orderId,
            });
          },
          onApprove: async (data, actions) => {
            const response = await yourPaymentProcessingFunction(data);
            console.log("Payment approved:", response);

            const orderDetails = {
              isPaid: true,
              subtotal: subtotal,
              discount: discount,
              total: total,
            };
            dispatch({ type: actionTypes.PLACE_ORDER, payload: orderDetails });
          },
        })
        .render("#paypal-button-container");

      console.log("PayPal button rendered");
    };

    if (window.paypal) {
      renderButton();
    } else {
      console.log("Waiting for PayPal SDK to load...");
      window.onPayPalSDKReady = () => {
        renderButton();
      };
    }
  };

  const yourPaymentProcessingFunction = async (data) => {
    return { status: "success" };
  };

  const handleCheckout = () => {
    if (paymentMethod === "") {
      setCheckoutButtonText("CASH ON DELIVERY");
      setPaymentMethod("");
      setShowCashOnDeliveryForm(true);
    }
  };

  const handleCashOnDeliverySubmit = async (formData) => {
    const orderedItemIds = cart.map((item) => item.id);
    dispatch({ type: "REMOVE_FROM_CART", payload: orderedItemIds });

    dispatch({ type: "CLEAR_CART" });

    setShowCashOnDeliveryForm(false);

    const orderId = generateOrderId();

    console.log("Redirecting to:", `/order/${orderId}`);

    await router.push(`/order/${orderId}`);

    console.log("Redirected successfully");
  };

  const generateOrderId = () => {
    return uuidv4();
  };

  return (
    <div className="flex justify-center">
      <Script
        src="https://www.paypal.com/sdk/js?client-id=ARn5FhcUL1S4anTD9LCDfewEkA5p3c6e-9a3iNe_aDMCF6SZvBZfCr21zm4ntAi7aYXLVUqdNNiz7DwN"
        strategy="beforeInteractive"
      />
      <div className="flex-1">
        <h1>Your Cart</h1>
        {cart.length === 0 ? (
          <p>Your cart is empty.</p>
        ) : (
          <table className="mx-auto">
            <thead>
              <tr>
                <th className="table-header">Product Image</th>
                <th className="table-header">Name</th>
                <th className="table-header">Extra</th>
                <th className="table-header">Price</th>
                <th className="table-header">Quantity</th>
                <th className="table-header">Total</th>
              </tr>
            </thead>
            <tbody>
              {cart.map((item) => (
                <React.Fragment key={item.id}>
                  <tr>
                    <td>
                      <img
                        src={item.image}
                        alt={item.name}
                        style={{ width: "50px" }}
                      />
                    </td>
                    <td>{item.name}</td>
                    <td>
                      <span>
                        <td>{item.extra}</td>
                        {item.ingredients && (
                          <p>
                            {Object.keys(item.ingredients)
                              .filter((key) => item.ingredients[key])
                              .join(", ")}
                          </p>
                        )}
                      </span>
                    </td>
                    <td>{item.price}</td>
                    <td>{item.quantity}</td>
                    <td>{convertPriceToNumber(item.price) * item.quantity}</td>
                  </tr>
                  <tr>
                    <td
                      colSpan="6"
                      style={{
                        borderBottom: "1px solid #ccc",
                        marginBottom: "10px",
                      }}
                    ></td>
                  </tr>
                </React.Fragment>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {cart.length > 0 && (
        <div
          className="cart-total"
          style={{ marginLeft: "20px", fontSize: "1.2em" }}
        >
          <h2>CART TOTAL</h2>
          <div>
            <p>Subtotal: ${subtotal.toLocaleString()}</p>
            <p>Discount: ${discount.toLocaleString()}</p>
            <p>Total: ${total.toLocaleString()}</p>
          </div>
          <button className="button" onClick={handleCheckout}>
            {checkoutButtonText}
          </button>
          {paymentMethod && <p>Payment Method: {paymentMethod}</p>}
          {isSdkLoaded && <div id="paypal-button-container"></div>}
        </div>
      )}

      {showCashOnDeliveryForm && (
        <CashOnDeliveryForm
          total={total}
          onSubmit={handleCashOnDeliverySubmit}
          onCancel={() => setShowCashOnDeliveryForm(false)}
        />
      )}
    </div>
  );
};

export default Cart;

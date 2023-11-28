// CashOnDeliveryForm.js

import React, { useState } from 'react';
import { useRouter } from 'next/router';

const CashOnDeliveryForm = ({ total, onSubmit, onCancel }) => {
  const [name, setName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [address, setAddress] = useState('');
  const [orderId, setOrderId] = useState(null);
  const router = useRouter();

  const handleSubmit = (event) => {
    event.preventDefault(); // Prevent the default form submission behavior
  
    const newOrderId = generateOrderId();
    setOrderId(newOrderId);
    onSubmit({ orderId: newOrderId, name, phoneNumber, address, total });
  
    console.log('Redirecting to:', `/order/${newOrderId}`);
  
    // Redirect to the order details page with the order ID
    router.push(`/order/${newOrderId}`);
  };
  

  // Function to generate a unique order ID (replace with your own logic)
  const generateOrderId = () => {
    return Math.floor(Math.random() * 100000).toString(); // Example: Generate a random order ID
  };

  return (
    <div className="cash-on-delivery-form-overlay fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50">
      <div className="loginContainer bg-white p-8 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-4">You will pay ${total !== undefined ? total.toLocaleString() : '$0'} on delivery</h2>
        <form className="flex flex-col" onSubmit={handleSubmit}>
          <label className="mb-2">Name Surname:</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="py-2 px-4 mb-4 border border-gray-300 rounded"
          />

          <label className="mb-2">Phone Number:</label>
          <input
            type="text"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            className="py-2 px-4 mb-4 border border-gray-300 rounded"
          />

          <label className="mb-2">Address:</label>
          <textarea
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            className="py-2 px-4 mb-4 border border-gray-300 rounded"
          />

          <div className="flex justify-center">
            <button     type="submit"
              className="button bg-yellow-500 hover:bg-yellow-400"
              onClick={handleSubmit}
            >
              Order
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CashOnDeliveryForm;

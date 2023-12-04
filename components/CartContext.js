import React, { createContext, useContext, useReducer } from 'react';

export const CartContext = createContext();

export const actionTypes = {
  ADD_TO_CART: 'ADD_TO_CART',
  CLEAR_CART: 'CLEAR_CART',
 
};

const initialState = {
  cart: [],
};

const cartReducer = (state, action) => {
  switch (action.type) {
    case actionTypes.ADD_TO_CART:
      return { ...state, cart: [...state.cart, action.payload] };
    case actionTypes.CLEAR_CART:
      return { ...state, cart: [] };
   

    default:
      return state;
  }
};

export const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, initialState);

  const addToCart = (item) => {
    dispatch({ type: actionTypes.ADD_TO_CART, payload: item });
  };

  const clearCart = () => {
    dispatch({ type: actionTypes.CLEAR_CART });
  };

  return (
    <CartContext.Provider value={{ cart: state.cart, addToCart, clearCart, dispatch }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  return useContext(CartContext);
};

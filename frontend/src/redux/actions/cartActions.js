// In cartActions.js

import axios from "axios";
import * as actions from "../constants/cartConstants";

// Action to add an item to the cart
export const addToCart = (id, qty) => async (dispatch, getState) => {
  const { data } = await axios.get(`/api/products/${id}`);

  dispatch({
    type: actions.CART_ADD_ITEM,
    payload: {
      product: data.product._id,
      name: data.product.name,
      image: data.product.image,
      price: data.product.price,
      countInStock: data.product.countInStock,
      qty,
    },
  });

  // Save cart items to localStorage
  localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems));
};

// Action to remove an item from the cart
export const removeFromCart = (id) => async (dispatch, getState) => {
  dispatch({ type: actions.CART_REMOVE_ITEM, payload: id });

  // Update localStorage with the new cart state
  localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems));
};

// Action to clear the cart (after order is placed)
export const clearCart = () => (dispatch) => {
  dispatch({ type: actions.CART_CLEAR_ITEMS });

  // Clear cart items from localStorage
  localStorage.removeItem("cartItems");
};

// Action to save the shipping address
export const saveShippingAddress = (data) => (dispatch) => {
  dispatch({ type: actions.CART_SAVE_SHIPPING_ADDRESS, payload: data });

  // Save the shipping address to localStorage
  localStorage.setItem("shippingAddress", JSON.stringify(data));
};

// Action to save the payment method
export const savePaymentMethod = (paymentMethod) => (dispatch) => {
  dispatch({ type: actions.CART_SAVE_PAYMENT_METHOD, payload: paymentMethod });

  // Save the payment method to localStorage
  localStorage.setItem("paymentMethod", JSON.stringify(paymentMethod));
};

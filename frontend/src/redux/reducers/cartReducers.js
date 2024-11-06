// In cartReducer.js

import * as actions from "../constants/cartConstants";

// Initial state for the cart
const initialState = {
  cartItems: [],        // List of items in the cart
  shippingAddress: {},  // Shipping address (empty initially)
  paymentMethod: "Cash On Delivery",  // Default payment method
};

export const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    // Add item to cart
    case actions.CART_ADD_ITEM:
      const item = action.payload;

      // Check if the item is already in the cart
      const existItem = state.cartItems.find((x) => x.product === item.product);

      if (existItem) {
        // If item exists, update the quantity
        return {
          ...state,
          cartItems: state.cartItems.map((x) =>
            x.product === existItem.product ? item : x
          ),
        };
      } else {
        // If item doesn't exist, add it to the cart
        return {
          ...state,
          cartItems: [...state.cartItems, item],
        };
      }

    // Remove item from cart
    case actions.CART_REMOVE_ITEM:
      return {
        ...state,
        cartItems: state.cartItems.filter((x) => x.product !== action.payload),
      };

    // Clear items from cart (after order is placed)
    case actions.CART_CLEAR_ITEMS:
      return {
        ...state,
        cartItems: [],
      };

    // Save shipping address
    case actions.CART_SAVE_SHIPPING_ADDRESS:
      return {
        ...state,
        shippingAddress: action.payload,
      };

    // Save payment method
    case actions.CART_SAVE_PAYMENT_METHOD:
      return {
        ...state,
        paymentMethod: action.payload,
      };

    // Default case (return current state if action doesn't match)
    default:
      return state;
  }
};

import { createStore, compose, applyMiddleware, combineReducers } from "redux";
import thunk from "redux-thunk";

// Import all reducers
import {
  productListReducer,
  productDetailsReducer,
  productCreateReducer,
  productUpdateReducer,
  productDeleteReducer,
  productReviewCreateReducer,
  productsTopRatedReducer,
} from "./redux/reducers/productReducers";

import { cartReducer } from "./redux/reducers/cartReducers";  // Corrected import
import {
  userLoginReducer,
  userRegisterReducer,
  userLoggedInReducer,
  userUpdateProfileReducer,
  usersListReducer,
  userDeleteReducer,
  userDetailsReducer,
  userUpdateReducer,
  otpVerificationReducer,
} from "./redux/reducers/userReducers";

import {
  orderCreateReducer,
  orderDetailsReducer,
  orderPayReducer,
  orderListMyOrderReducer,
  orderListOrderReducer,
  orderDeliverReducer,
} from "./redux/reducers/orderReducers";

import { wishlistReducer } from "./redux/reducers/wishlistReducer";
import { categoryListReducer } from "./redux/reducers/categoryReducers";

// Utility function to safely parse JSON from localStorage
function getLocalStorageItem(key, defaultValue) {
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : defaultValue;
  } catch (error) {
    console.error(`Error parsing ${key} from localStorage`, error);
    return defaultValue;
  }
}

// Retrieve items from localStorage safely
const cartItemsFromStorage = getLocalStorageItem("cartItems", []);
const userInfoFromStorage = getLocalStorageItem("userInfo", null);
const shippingAddressFromStorage = getLocalStorageItem("shippingAddress", {});

// Initial state setup
const initialState = {
  cart: {
    cartItems: cartItemsFromStorage,
    shippingAddress: shippingAddressFromStorage,
  },
  userLogin: { userInfo: userInfoFromStorage },
  wishlist: { wishlistItems: [] }, // Initialize wishlist state
};

// Combine all reducers
const rootReducers = combineReducers({
  productList: productListReducer,
  productDetails: productDetailsReducer,
  productCreate: productCreateReducer,
  productUpdate: productUpdateReducer,
  productDelete: productDeleteReducer,
  productReviewCreate: productReviewCreateReducer,
  productsTopRated: productsTopRatedReducer,
  cart: cartReducer,  // Corrected to use 'cartReducer'
  wishlist: wishlistReducer,
  userLogin: userLoginReducer,
  userRegister: userRegisterReducer,
  userLoggedIn: userLoggedInReducer,
  userDetails: userDetailsReducer,
  userUpdateProfile: userUpdateProfileReducer,
  usersList: usersListReducer,
  userDelete: userDeleteReducer,
  userUpdate: userUpdateReducer,
  otpVerification: otpVerificationReducer,
  orderCreate: orderCreateReducer,
  orderDetails: orderDetailsReducer,
  orderPay: orderPayReducer,
  orderListMy: orderListMyOrderReducer,
  orderListOrder: orderListOrderReducer,
  orderDeliver: orderDeliverReducer,
  categoryList: categoryListReducer,
});

// Enable Redux DevTools
const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

// Create Redux store
const store = createStore(
  rootReducers,
  initialState,
  composeEnhancer(applyMiddleware(thunk))
);

export default store;

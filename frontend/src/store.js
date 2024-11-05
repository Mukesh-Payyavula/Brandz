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

import { cartReducers } from "./redux/reducers/cartReducers";
import {
  userLoginReducer,
  userRegisterReducer,
  userLoggedInReducer,
  userUpdateProfileReducer,
  usersListReducer,
  userDeleteReducer,
  userDetailsReducer,
  userUpdateReducer,
} from "./redux/reducers/userReducers";

import {
  orderCreateReducer,
  orderDetailsReducer,
  orderPayReducer,
  orderListMyOrderReducer,
  orderListOrderReducer,
  orderDeliverReducer,
} from "./redux/reducers/orderReducers";

import { wishlistReducer } from "./redux/reducers/wishlistReducer"; // Import wishlist reducer
import { categoryListReducer } from "./redux/reducers/categoryReducers"; // Import category list reducer

// Combine all reducers
const rootReducers = combineReducers({
  productList: productListReducer,
  productDetails: productDetailsReducer,
  productCreate: productCreateReducer,
  productUpdate: productUpdateReducer,
  productDelete: productDeleteReducer,
  productReviewCreate: productReviewCreateReducer,
  productsTopRated: productsTopRatedReducer,
  cart: cartReducers,
  wishlist: wishlistReducer,
  userLogin: userLoginReducer,
  userRegister: userRegisterReducer,
  userLoggedIn: userLoggedInReducer,
  userDetails: userDetailsReducer,
  userUpdateProfile: userUpdateProfileReducer,
  usersList: usersListReducer,
  userDelete: userDeleteReducer,
  userUpdate: userUpdateReducer,
  orderCreate: orderCreateReducer,
  orderDetails: orderDetailsReducer,
  orderPay: orderPayReducer,
  orderListMy: orderListMyOrderReducer,
  orderListOrder: orderListOrderReducer,
  orderDeliver: orderDeliverReducer,
  categoryList: categoryListReducer, // Add category list reducer
});

// Enable Redux DevTools
const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

// Retrieve items from localStorage
const cartItemsFromStorage = localStorage.getItem("cartItems")
  ? JSON.parse(localStorage.getItem("cartItems"))
  : [];

const userInfoFromStorage = localStorage.getItem("userInfo")
  ? JSON.parse(localStorage.getItem("userInfo"))
  : null;

const shippingAddressFromStorage = localStorage.getItem("shippingAddress")
  ? JSON.parse(localStorage.getItem("shippingAddress"))
  : {};

// Initial state setup
const initialState = {
  cart: {
    cartItems: cartItemsFromStorage,
    shippingAddress: shippingAddressFromStorage,
  },
  userLogin: { userInfo: userInfoFromStorage },
  wishlist: { wishlistItems: [] }, // Initialize wishlist state
};

// Create Redux store
const store = createStore(
  rootReducers,
  initialState,
  composeEnhancer(applyMiddleware(thunk))
);

export default store;

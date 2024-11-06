import axios from "axios";
import * as actions from "../constants/orderConstants";
import { logout } from "./userActions";

// Create Order Action
export const createOrder = (dataOrder) => async (dispatch, getState) => {
  try {
    dispatch({ type: actions.ORDER_CREATE_REQUEST });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.post("/api/orders", dataOrder, config);

    dispatch({ type: actions.ORDER_CREATE_SUCCESS, payload: data.order });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    if (message === "not authorized, no token") {
      dispatch(logout());
    }
    dispatch({
      type: actions.ORDER_CREATE_FAILED,
      payload: message,
    });
  }
};

// Get Order Details Action
export const getOrderDetails = (id) => async (dispatch, getState) => {
  try {
    dispatch({ type: actions.ORDER_DETAILS_REQUEST });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.get(`/api/orders/${id}`, config);

    dispatch({ type: actions.ORDER_DETAILS_SUCCESS, payload: data.order });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    if (message === "not authorized, no token") {
      dispatch(logout());
    }
    dispatch({
      type: actions.ORDER_DETAILS_FAILED,
      payload: message,
    });
  }
};

// Pay Order Action
export const payOrder = (orderId, paymentResult) => async (dispatch, getState) => {
  try {
    dispatch({ type: actions.ORDER_PAY_REQUEST });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    // Handle payment based on payment method
    if (paymentResult.paymentMethod === 'COD') {
      // For COD, simply mark the order as paid without actual payment processing
      const { data } = await axios.put(
        `/api/orders/${orderId}/pay`,
        { isPaid: true }, // Update the order status
        config
      );

      dispatch({ type: actions.ORDER_PAY_SUCCESS, payload: data.order });
    } else {
      const { data } = await axios.put(
        `/api/orders/${orderId}/pay`,
        paymentResult,
        config
      );

      dispatch({ type: actions.ORDER_PAY_SUCCESS, payload: data.order });
    }
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    if (message === "not authorized, no token") {
      dispatch(logout());
    }
    dispatch({
      type: actions.ORDER_PAY_FAILED,
      payload: message,
    });
  }
};

// Deliver Order Action
export const deliverOrder = (orderId) => async (dispatch, getState) => {
  try {
    dispatch({ type: actions.ORDER_DELIVER_REQUEST });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    await axios.put(`/api/orders/${orderId}/deliver`, {}, config);

    dispatch({ type: actions.ORDER_DELIVER_SUCCESS });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    if (message === "not authorized, no token") {
      dispatch(logout());
    }
    dispatch({
      type: actions.ORDER_DELIVER_FAILED,
      payload: message,
    });
  }
};

// List My Orders Action
export const listMyOrders = () => async (dispatch, getState) => {
  try {
    dispatch({ type: actions.ORDER_LIST_MY_REQUEST });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.get(`/api/orders/myorders`, config);

    dispatch({ type: actions.ORDER_LIST_MY_SUCCESS, payload: data.orders });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    if (message === "not authorized, no token") {
      dispatch(logout());
    }
    dispatch({
      type: actions.ORDER_LIST_MY_FAILED,
      payload: message,
    });
  }
};

// List All Orders Action
export const listOrders = () => async (dispatch, getState) => {
  try {
    dispatch({ type: actions.ORDER_LIST_REQUEST });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.get(`/api/orders/`, config);

    dispatch({ type: actions.ORDER_LIST_SUCCESS, payload: data.orders });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    if (message === "not authorized, no token") {
      dispatch(logout());
    }
    dispatch({
      type: actions.ORDER_LIST_FAILED,
      payload: message,
    });
  }
};

// Order Create Action (Simplified version from initial code)
export const createOrderSimplified = (order) => async (dispatch) => {
  try {
    // Your API request to place an order
    const { data } = await axios.post("/api/orders", order); // Adjust as necessary
    dispatch({ type: actions.ORDER_CREATE_SUCCESS, payload: data });
  } catch (error) {
    const message = error.response && error.response.data.message
      ? error.response.data.message
      : error.message;
    dispatch({ type: actions.ORDER_CREATE_FAILED, payload: message });
  }
};

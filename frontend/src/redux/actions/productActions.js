import axios from "axios";
import { logout } from "./userActions";
import * as actions from "../constants/productConstants";

// List products with optional keyword, page number, and category
export const listProduct = (keyword = "", pageNumber = "", category = "") => async (dispatch) => {
  try {
    dispatch({ type: actions.PRODUCT_LIST_REQUEST });

    const { data } = await axios.get(`/api/products?keyword=${keyword}&pageNumber=${pageNumber}${category ? `&category=${category}` : ''}`);

    dispatch({
      type: actions.PRODUCT_LIST_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: actions.PRODUCT_LIST_FAIL,
      payload: error.response && error.response.data.message
        ? error.response.data.message
        : error.message,
    });
  }
};

// List products by category
export const listProductsByCategory = (category) => async (dispatch) => {
  try {
    dispatch({ type: actions.PRODUCT_LIST_REQUEST });

    const { data } = await axios.get(`/api/products/category/${category}`);

    dispatch({
      type: actions.PRODUCT_LIST_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: actions.PRODUCT_LIST_FAIL,
      payload: error.response && error.response.data.message
        ? error.response.data.message
        : error.message,
    });
  }
};

// Get product details by ID
export const listProductDetails = (id) => async (dispatch) => {
  try {
    dispatch({ type: actions.PRODUCT_DETAILS_RESET });
    dispatch({ type: actions.PRODUCT_DETAILS_REQUEST });

    const { data } = await axios.get(`/api/products/${id}`);

    dispatch({ type: actions.PRODUCT_DETAILS_SUCCESS, payload: data.product });
  } catch (error) {
    dispatch({
      type: actions.PRODUCT_DETAILS_FAIL,
      payload: error.response && error.response.data.message
        ? error.response.data.message
        : error.message,
    });
  }
};

// Delete product by ID
export const deleteProduct = (id) => async (dispatch, getState) => {
  try {
    dispatch({ type: actions.PRODUCT_DELETE_REQUEST });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    await axios.delete(`/api/products/${id}`, config);

    dispatch({ type: actions.PRODUCT_DELETE_SUCCESS });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    if (message === "not authorized, no token") {
      dispatch(logout());
    }
    dispatch({
      type: actions.PRODUCT_DELETE_FAIL,
      payload: message,
    });
  }
};

// Create a new product
export const createProduct = (dataProduct) => async (dispatch, getState) => {
  try {
    dispatch({ type: actions.PRODUCT_CREATE_REQUEST });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    await axios.post(`/api/products`, dataProduct, config);

    dispatch({ type: actions.PRODUCT_CREATE_SUCCESS });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    if (message === "not authorized, no token") {
      dispatch(logout());
    }
    dispatch({
      type: actions.PRODUCT_CREATE_FAIL,
      payload: message,
    });
  }
};

// Update an existing product
export const updateProduct = (dataProduct) => async (dispatch, getState) => {
  try {
    dispatch({ type: actions.PRODUCT_UPDATE_REQUEST });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    await axios.put(`/api/products/${dataProduct._id}`, dataProduct, config);

    dispatch({ type: actions.PRODUCT_UPDATE_SUCCESS });
    dispatch({ type: actions.PRODUCT_UPDATE_RESET });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    if (message === "not authorized, no token") {
      dispatch(logout());
    }
    dispatch({
      type: actions.PRODUCT_UPDATE_FAIL,
      payload: message,
    });
  }
};

// Create a product review
export const createProductReview = (productId, review) => async (dispatch, getState) => {
  try {
    dispatch({ type: actions.PRODUCT_CREATE_REVIEW_REQUEST });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    await axios.post(`/api/products/${productId}/reviews`, review, config);

    dispatch({ type: actions.PRODUCT_CREATE_REVIEW_SUCCESS });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    if (message === "not authorized, no token") {
      dispatch(logout());
    }
    dispatch({
      type: actions.PRODUCT_CREATE_REVIEW_FAIL,
      payload: message,
    });
  }
};

// List top-rated products
export const listTopProducts = () => async (dispatch) => {
  try {
    dispatch({ type: actions.PRODUCT_TOP_REQUEST });

    const { data } = await axios.get(`/api/products/top`);

    dispatch({ type: actions.PRODUCT_TOP_SUCCESS, payload: data.products });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({
      type: actions.PRODUCT_TOP_FAIL,
      payload: message,
    });
  }
};

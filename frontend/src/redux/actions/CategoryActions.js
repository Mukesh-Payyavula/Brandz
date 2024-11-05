import axios from 'axios';
import {
  CATEGORY_LIST_REQUEST,
  CATEGORY_LIST_SUCCESS,
  CATEGORY_LIST_FAIL,
  CATEGORY_DELETE_REQUEST,
  CATEGORY_DELETE_SUCCESS,
  CATEGORY_DELETE_FAIL,
} from '../constants/categoryConstants';

// Fetch categories
export const listCategories = () => async (dispatch) => {
  try {
    dispatch({ type: CATEGORY_LIST_REQUEST });
    const { data } = await axios.get('/api/categories');
    dispatch({ type: CATEGORY_LIST_SUCCESS, payload: data });
  } catch (error) {
    console.error("Error fetching categories:", error); // Log the error for debugging
    dispatch({
      type: CATEGORY_LIST_FAIL,
      payload: error.response && error.response.data.message ? error.response.data.message : error.message,
    });
  }
}

// Delete category action
export const deleteCategory = (id) => async (dispatch) => {
  try {
    dispatch({ type: CATEGORY_DELETE_REQUEST });
    await axios.delete(`/api/categories/${id}`);
    dispatch({ type: CATEGORY_DELETE_SUCCESS, payload: id });
  } catch (error) {
    dispatch({
      type: CATEGORY_DELETE_FAIL,
      payload: error.response && error.response.data.message ? error.response.data.message : error.message,
    });
  }
};

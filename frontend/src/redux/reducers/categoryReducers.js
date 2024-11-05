import {
  CATEGORY_LIST_REQUEST,
  CATEGORY_LIST_SUCCESS,
  CATEGORY_LIST_FAIL,
  CATEGORY_DELETE_REQUEST,
  CATEGORY_DELETE_SUCCESS,
  CATEGORY_DELETE_FAIL,
} from '../constants/categoryConstants';

// Initial state
const initialState = {
  categories: [],
  loading: false,
  error: null,
};

// Category list reducer
export const categoryListReducer = (state = initialState, action) => {
  switch (action.type) {
    case CATEGORY_LIST_REQUEST:
      return { ...state, loading: true };
    case CATEGORY_LIST_SUCCESS:
      return { loading: false, categories: action.payload, error: null };
    case CATEGORY_LIST_FAIL:
      return { loading: false, categories: [], error: action.payload };
    case CATEGORY_DELETE_REQUEST:
      return { ...state, loading: true };
    case CATEGORY_DELETE_SUCCESS:
      return {
        ...state,
        loading: false,
        categories: state.categories.filter((category) => category._id !== action.payload),
      };
    case CATEGORY_DELETE_FAIL:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

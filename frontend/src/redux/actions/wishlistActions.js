// actions/wishlistActions.js

import * as actions from "../constants/wishlistConstants";

export const addToWishlist = (product) => (dispatch, getState) => {
  dispatch({
    type: actions.WISHLIST_ADD_ITEM,
    payload: product,
  });

  // Optionally save to local storage
  localStorage.setItem("wishlistItems", JSON.stringify(getState().wishlist.wishlistItems));
};

export const removeFromWishlist = (productId) => (dispatch, getState) => {
  dispatch({
    type: actions.WISHLIST_REMOVE_ITEM,
    payload: productId,
  });

  // Optionally save to local storage
  localStorage.setItem("wishlistItems", JSON.stringify(getState().wishlist.wishlistItems));
};

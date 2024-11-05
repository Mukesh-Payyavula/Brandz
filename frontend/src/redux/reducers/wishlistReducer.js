// reducers/wishlistReducer.js
import * as actions from "../constants/wishlistConstants";

export const wishlistReducer = (
  state = { wishlistItems: [] },
  action
) => {
  switch (action.type) {
    case actions.WISHLIST_ADD_ITEM:
      const item = action.payload;

      const existItem = state.wishlistItems.find((x) => x.product === item.product);

      console.log('Current state before adding:', state);
      console.log('Adding item:', item);

      if (existItem) {
        return {
          ...state,
          wishlistItems: state.wishlistItems.map((x) =>
            x.product === existItem.product ? item : x
          ),
        };
      } else {
        return {
          ...state,
          wishlistItems: [...state.wishlistItems, item],
        };
      }

    case actions.WISHLIST_REMOVE_ITEM:
      console.log('Removing item with ID:', action.payload);
      return {
        ...state,
        wishlistItems: state.wishlistItems.filter((x) => x.product !== action.payload),
      };

    default:
      return state;
  }
};

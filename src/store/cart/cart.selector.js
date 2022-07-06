import { createSelector } from "reselect";

export const selectCartReducer = (state) => state.cart;

export const selectCartItems = createSelector(
  [selectCartReducer],
  (cartReducer) => cartReducer.cartItems
);

export const selectCartToggle = createSelector(
  [selectCartReducer],
  (cartReducer) => cartReducer.cartToggle
);

export const selectCartCount = createSelector([selectCartItems], (cartItems) =>
  cartItems.reduce((total, cartItem) => total + cartItem.quantity, 0)
);

export const selectCartTotal = createSelector([selectCartItems], (cartItems) =>
  cartItems.reduce(
    (total, cartItem) => (total += cartItem.quantity * cartItem.price),
    0
  )
);

import { CART_ACTION_TYPES } from "./cart.types";

const INITIAL_STATE = {
  cartItems: [],
  cartToggle: false,
};

export const cartReducer = (state = INITIAL_STATE, action = {}) => {
  const { type, payload } = action;

  switch (type) {
    case CART_ACTION_TYPES.SET_CART_ITEMS:
      return {
        ...state,
        cartItems: payload,
      };

    case CART_ACTION_TYPES.CART_TOGGLE:
      return {
        ...state,
        cartToggle: payload,
      };

    default:
      return state;
  }
};

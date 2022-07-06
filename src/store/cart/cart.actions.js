import { createAction } from "../../utils/reducer/reducer.utils";
import { CART_ACTION_TYPES } from "./cart.types";

const addCartItem = (cartItems, productToAdd) => {
  const isItemInCart = cartItems.filter((item) => item.id === productToAdd.id);

  if (isItemInCart.length) {
    return cartItems.map((cartItem) =>
      cartItem.id === productToAdd.id
        ? { ...cartItem, quantity: cartItem.quantity + 1 }
        : cartItem
    );
  } else {
    return [
      ...cartItems,
      {
        ...productToAdd,
        quantity: 1,
      },
    ];
  }
};

const decreaseQuantity = (cartItems, productToDecrease) => {
  if (productToDecrease.quantity > 1) {
    return cartItems.map((cartItem) =>
      cartItem.id === productToDecrease.id
        ? { ...cartItem, quantity: cartItem.quantity - 1 }
        : cartItem
    );
  } else {
    return cartItems.filter((cartItem) => cartItem.id !== productToDecrease.id);
  }
};

const clearCartItem = (cartItems, productToRemove) => {
  return cartItems.filter((cartItem) => cartItem.id !== productToRemove.id);
};

export const setCartToggle = (bool) =>
  createAction(CART_ACTION_TYPES.CART_TOGGLE, bool);

export const addItemToCart = (cartItems, productToAdd) => {
  const newCartItems = addCartItem(cartItems, productToAdd);
  return createAction(CART_ACTION_TYPES.SET_CART_ITEMS, newCartItems);
};

export const decreaseCartItemQuantity = (cartItems, productToDecrease) => {
  const newCartItems = decreaseQuantity(cartItems, productToDecrease);
  return createAction(CART_ACTION_TYPES.SET_CART_ITEMS, newCartItems);
};

export const clearItemFromCart = (cartItems, productToRemove) => {
  const newCartItems = clearCartItem(cartItems, productToRemove);
  return createAction(CART_ACTION_TYPES.SET_CART_ITEMS, newCartItems);
};

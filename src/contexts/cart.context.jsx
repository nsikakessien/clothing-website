import { createContext, useState, useEffect } from "react";

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

export const CartContext = createContext({
  cartItems: [],
  addItemToCart: () => {},
  cartToggle: false,
  setCartToggle: () => {},
  cartCount: 0,
  decreaseQuantity: () => {},
  clearItemFromCart: () => {},
  cartTotal: 0,
});

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [cartToggle, setCartToggle] = useState(false);
  const [cartCount, setCartCount] = useState(0);
  const [cartTotal, setCartTotal] = useState(0);

  useEffect(() => {
    const newCartCount = cartItems.reduce(
      (total, cartItem) => total + cartItem.quantity,
      0
    );
    setCartCount(newCartCount);

    const newCartTotal = cartItems.reduce(
      (total, cartItem) => (total += cartItem.quantity * cartItem.price),
      0
    );
    setCartTotal(newCartTotal);
  }, [cartItems]);

  const addItemToCart = (productToAdd) => {
    setCartItems(addCartItem(cartItems, productToAdd));
  };

  const decreaseCartItemQuantity = (productToDecrease) => {
    setCartItems(decreaseQuantity(cartItems, productToDecrease));
  };

  const clearItemFromCart = (productToRemove) => {
    setCartItems(clearCartItem(cartItems, productToRemove));
  };

  const value = {
    addItemToCart,
    cartItems,
    cartToggle,
    setCartToggle,
    cartCount,
    cartTotal,
    decreaseCartItemQuantity,
    clearItemFromCart,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

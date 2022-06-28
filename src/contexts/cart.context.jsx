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

export const CartContext = createContext({
  cartItems: [],
  addItemToCart: () => {},
  cartToggle: false,
  setCartToggle: () => {},
  cartCount: 0,
});

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [cartToggle, setCartToggle] = useState(false);
  const [cartCount, setCartCount] = useState(0);

  useEffect(() => {
    const newCartCount = cartItems.reduce(
      (total, cartItem) => total + cartItem.quantity,
      0
    );
    setCartCount(newCartCount);
  }, [cartItems]);

  const addItemToCart = (productToAdd) => {
    setCartItems(addCartItem(cartItems, productToAdd));
  };

  const value = {
    addItemToCart,
    cartItems,
    cartToggle,
    setCartToggle,
    cartCount,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
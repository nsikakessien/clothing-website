import { createContext, useState } from "react";

export const CartContext = createContext({
  items: [],
  setItems: () => null,
  cartToggle: false,
  setCartToggle: () => null,
});

export const CartProvider = ({ children }) => {
  const [items, setItems] = useState([]);
  const [cartToggle, setCartToggle] = useState(false);
  const value = { items, setItems, cartToggle, setCartToggle };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

import { useSelector, useDispatch } from "react-redux";
import { ReactComponent as ShoppingIcon } from "../../assets/shopping-bag.svg";
import { setCartToggle } from "../../store/cart/cart.actions";
import {
  selectCartCount,
  selectCartToggle,
} from "../../store/cart/cart.selector";

import "./cart-icon.styles";
import { CartIconContainer, ItemCount } from "./cart-icon.styles";

const CartIcon = () => {
  const dispatch = useDispatch();
  const cartToggle = useSelector(selectCartToggle);
  const cartCount = useSelector(selectCartCount);

  const toggleIsCartOpen = () => dispatch(setCartToggle(!cartToggle));

  return (
    <CartIconContainer onClick={toggleIsCartOpen}>
      <ShoppingIcon className="shopping-icon" />
      <ItemCount>{cartCount}</ItemCount>
    </CartIconContainer>
  );
};

export default CartIcon;

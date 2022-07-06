import { Fragment } from "react";

import { useSelector } from "react-redux";

import { Outlet } from "react-router-dom";
import {
  NavigationContainer,
  LogoContainer,
  NavLinks,
  NavLink,
} from "./navigation.styles";
import { ReactComponent as CrownLogo } from "../../assets/crown.svg";
import { signOutUserAuth } from "../../utils/firebase/firebase.utils";
import CartIcon from "../../components/cart-icon/cart-icon.component";
import CartDropdown from "../../components/cart-dropdown/cart-dropdown.component";
import { selectCurrentUser } from "../../store/user/user.selector";
import { selectCartToggle } from "../../store/cart/cart.selector";

const Navigation = () => {
  const currentUser = useSelector(selectCurrentUser);
  const cartToggle = useSelector(selectCartToggle);

  return (
    <Fragment>
      <NavigationContainer>
        <LogoContainer to="/">
          <CrownLogo />
        </LogoContainer>
        <NavLinks>
          <NavLink to="/shop">SHOP</NavLink>

          {currentUser ? (
            <NavLink as="span" onClick={signOutUserAuth}>
              SIGN OUT
            </NavLink>
          ) : (
            <NavLink to="/auth">SIGN IN</NavLink>
          )}
          <CartIcon />
        </NavLinks>
        {cartToggle && <CartDropdown />}
      </NavigationContainer>
      <Outlet />
    </Fragment>
  );
};

export default Navigation;

import { useDispatch, useSelector } from "react-redux";

import { setToggleCart } from "../../store/cart/cart.action";
import {
  selectToggleCart,
  selectCartCount,
} from "../../store/cart/cart.selector";

import { ShoppingIcon, CartIconContainer, ItemCount } from "./cart-icon.styles";

const CartIcon = () => {
  const dispatch = useDispatch();
  const toggleCart = useSelector(selectToggleCart);
  const cartCount = useSelector(selectCartCount);

  const handleIsToggleOpen = () => dispatch(setToggleCart(!toggleCart));

  return (
    <CartIconContainer onClick={handleIsToggleOpen}>
      <ShoppingIcon className="shopping-icon" />
      <ItemCount className="item-count">{cartCount}</ItemCount>
    </CartIconContainer>
  );
};

export default CartIcon;

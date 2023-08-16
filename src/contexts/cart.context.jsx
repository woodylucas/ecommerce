import {
  createContext,
  useState,
  useMemo,
  useEffect,
  useCallback,
} from "react";

export const CartContext = createContext({
  isCartOpen: false,
  cartItems: [],
  cartCount: 0,
  setIsToggle: () => {},
  addItemsToCart: () => {},
  removeItemFromCart: () => {},
});

const addCartItem = (cartItems, productToAdd) => {
  // find if cart Items contains product to add.
  const existingCartItem = cartItems.find(
    (cartItem) => cartItem.id === productToAdd.id
  );
  // if found, increment quantity
  if (existingCartItem) {
    return cartItems.map((cartItem) =>
      cartItem.id === productToAdd.id
        ? { ...cartItem, quantity: cartItem.quantity + 1 }
        : cartItem
    );
  }
  // return new array w/ modified cart Item
  return [...cartItems, { ...productToAdd, quantity: 1 }];
};

const removeCartItem = (cartItems, itemToRemove) => {
  return cartItems
    .map((cartItem) =>
      cartItem.id === itemToRemove.id
        ? { ...cartItem, quantity: cartItem.quantity - 1 }
        : cartItem
    )
    .filter((item) => item.quantity > 0);
};

export const CartProvider = ({ children }) => {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [cartCount, setCartCount] = useState(0);

  const getCartCount = useCallback(() => {
    const newCartCount = cartItems.reduce(
      (total, cartItem) => total + cartItem.quantity,
      0
    );
    setCartCount(newCartCount);
  }, [cartItems]);

  useEffect(() => {
    getCartCount();
  }, [getCartCount]);

  const addItemsToCart = useCallback((productToAdd) => {
    setCartItems((prevCartItems) => addCartItem(prevCartItems, productToAdd));
  }, []);

  const removeItemFromCart = useCallback((productToRemove) => {
    setCartItems((prevCartItems) =>
      removeCartItem(prevCartItems, productToRemove)
    );
  }, []);

  const value = useMemo(() => {
    return {
      isCartOpen,
      setIsCartOpen,
      addItemsToCart,
      removeItemFromCart,
      cartItems,
      cartCount,
    };
  }, [isCartOpen, addItemsToCart, removeItemFromCart, cartItems, cartCount]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

import {
  createContext,
  useState,
  useMemo,
  useEffect,
  useCallback,
} from "react";

export const CartContext = createContext({
  isCartOpen: false,
  setIsToggle: () => {},
  cartItems: [],
  addItemsToCart: () => {},
  cartCount: 0,
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
    setCartItems((prevCartItem) => addCartItem(prevCartItem, productToAdd));
  }, []);

  const value = useMemo(() => {
    return {
      isCartOpen,
      setIsCartOpen,
      addItemsToCart,
      cartItems,
      cartCount,
    };
  }, [isCartOpen, addItemsToCart, cartItems, cartCount]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

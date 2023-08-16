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
  cartTotal: 0,
  setIsToggle: () => {},
  addItemsToCart: () => {},
  removeItemFromCart: () => {},
  cleartItemFromCart: () => {},
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

const removeCartItem = (cartItems, productToRemove) => {
  return cartItems
    .map((cartItem) =>
      cartItem.id === productToRemove.id
        ? { ...cartItem, quantity: cartItem.quantity - 1 }
        : cartItem
    )
    .filter((item) => item.quantity > 0);
};

const clearCartItem = (cartItems, productToClear) => {
  return cartItems.filter((cartItem) => cartItem.id !== productToClear.id);
};

export const CartProvider = ({ children }) => {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [cartCount, setCartCount] = useState(0);
  const [cartTotal, setCartTotal] = useState(0);

  const getCartCount = useCallback(() => {
    const newCartCount = cartItems.reduce(
      (total, cartItem) => total + cartItem.quantity,
      0
    );
    setCartCount(newCartCount);
  }, [cartItems]);

  const getCartTotal = useCallback(() => {
    const newCartTotal = cartItems.reduce(
      (total, cartItem) => total + cartItem.quantity * cartItem.price,
      0
    );
    setCartTotal(newCartTotal);
  }, [cartItems]);

  useEffect(() => {
    getCartCount();
  }, [getCartCount]);

  useEffect(() => {
    getCartTotal();
  }, [getCartTotal]);

  const addItemsToCart = useCallback((productToAdd) => {
    setCartItems((prevCartItems) => addCartItem(prevCartItems, productToAdd));
  }, []);

  const removeItemFromCart = useCallback((productToRemove) => {
    setCartItems((prevCartItems) =>
      removeCartItem(prevCartItems, productToRemove)
    );
  }, []);

  const cleartItemFromCart = useCallback((productToClear) => {
    setCartItems((prevCartItems) =>
      clearCartItem(prevCartItems, productToClear)
    );
  }, []);

  const value = useMemo(() => {
    return {
      cartItems,
      isCartOpen,
      cartCount,
      cartTotal,
      setIsCartOpen,
      addItemsToCart,
      removeItemFromCart,
      cleartItemFromCart,
    };
  }, [
    cartItems,
    isCartOpen,
    cartCount,
    cartTotal,
    addItemsToCart,
    removeItemFromCart,
    cleartItemFromCart,
  ]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

import { createContext, useMemo, useCallback, useReducer } from "react";

import { createAction } from "../utils/reducer/reducer.utils";

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

const CART_ACTION_TYPES = {
  SET_CART_ITEMS: "SET_CART_ITEMS",
  SET_IS_CART_OPEN: "SET_IS_CART_OPEN",
};

const INITAL_STATE = {
  isCartOpen: false,
  cartItems: [],
  cartCount: 0,
  cartTotal: 0,
};

const cartReducer = (state, action) => {
  const { type, payload } = action;

  switch (type) {
    case CART_ACTION_TYPES.SET_CART_ITEMS:
      return {
        ...state,
        ...payload,
      };
    case CART_ACTION_TYPES.SET_IS_CART_OPEN:
      return {
        ...state,
        isCartOpen: payload,
      };

    default:
      throw new Error(`Unhandled type ${type} in cartReducer`);
  }
};

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
  const [{ cartItems, isCartOpen, cartCount, cartTotal }, dispatch] =
    useReducer(cartReducer, INITAL_STATE);

  const updateCartItemsReducer = useCallback(
    (newCartItems) => {
      const newCartCount = cartItems.reduce(
        (total, cartItem) => total + cartItem.quantity,
        0
      );

      const newCartTotal = cartItems.reduce(
        (total, cartItem) => total + cartItem.quantity * cartItem.price,
        0
      );

      dispatch(
        createAction(CART_ACTION_TYPES.SET_CART_ITEMS, {
          cartItems: newCartItems,
          cartTotal: newCartTotal,
          cartCount: newCartCount,
        })
      );
    },
    [cartItems]
  );

  const addItemsToCart = useCallback(
    (productToAdd) => {
      const newCartItems = addCartItem(cartItems, productToAdd);
      updateCartItemsReducer(newCartItems);
    },
    [cartItems, updateCartItemsReducer]
  );

  const removeItemFromCart = useCallback(
    (productToRemove) => {
      const newCartItems = removeCartItem(cartItems, productToRemove);
      updateCartItemsReducer(newCartItems);
    },
    [cartItems, updateCartItemsReducer]
  );

  const cleartItemFromCart = useCallback(
    (productToClear) => {
      const newCartItems = clearCartItem(cartItems, productToClear);
      updateCartItemsReducer(newCartItems);
    },
    [cartItems, updateCartItemsReducer]
  );

  const setIsCartOpen = (bool) => {
    dispatch({ type: CART_ACTION_TYPES.SET_IS_CART_OPEN, payload: bool });
  };

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

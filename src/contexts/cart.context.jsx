import { createContext, useState, useMemo } from "react";

export const CartContext = createContext({
  isCartOpen: false,
  setIsToggle: () => {},
});

export const CartProvider = ({ children }) => {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const value = useMemo(() => {
    return {
      isCartOpen,
      setIsCartOpen,
    };
  }, [isCartOpen]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

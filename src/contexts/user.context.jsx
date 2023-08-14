import { createContext, useMemo, useState } from "react";

// as the actual value you want to access
export const UserContext = createContext({
  currentUser: null,
  setCurrentUser: () => null,
});

// the actual component

export const UserProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  // The provider is allowing all its children components to access the values inside its useState
  const value = useMemo(() => {
    return { currentUser, setCurrentUser };
  }, [currentUser]);

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

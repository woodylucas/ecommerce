import { createContext, useMemo, useState, useEffect } from "react";

import {
  onAuthStateChangedListener,
  createUserDocumentFromAuth,
} from "../../src/utils/firebase/firebase.utils";

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

  useEffect(() => {
    const unsubscribe = onAuthStateChangedListener((user) => {
      if (user) {
        createUserDocumentFromAuth(user);
      }
      setCurrentUser(user);
    });
    return unsubscribe;
  }, []);

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

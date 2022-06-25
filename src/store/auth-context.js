import React, { useCallback, useState } from "react";

const AuthContext = React.createContext({
  isLoggedIn: undefined,
  login: () => {},
  logout: () => {},
  user: {},
});

export const AuthContextProvider = (props) => {
  const [isLoggedIn, setIsLoggedIn] = useState(undefined);
  const [user, setUser] = useState({});

  const loginHandler = useCallback((userObj) => {
    setUser(userObj);
    setIsLoggedIn(true);
  }, []);

  const logoutHandler = useCallback(() => {
    setIsLoggedIn(false);
  }, []);

  const contextValue = {
    isLoggedIn,
    login: loginHandler,
    logout: logoutHandler,
    user,
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContext;

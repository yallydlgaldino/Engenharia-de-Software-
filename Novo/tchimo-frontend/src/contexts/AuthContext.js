import React, { createContext, useState } from 'react';
import { useHistory } from 'react-router-dom';

const AuthContext = createContext();
const { Provider } = AuthContext;

const AuthProvider = ({ children }) => {
  const history = useHistory();

  const token = localStorage.getItem('token');
  const email = localStorage.getItem('email');
  const expiresIn = localStorage.getItem('expires_in');

  const [authState, setAuthState] = useState({
    token,
    expiresIn,
    email: email ? JSON.parse(email) : {}
  });

  const setAuthInfo = ({ token, email, expires_in : expiresIn }) => {
    localStorage.setItem('token', token);
    localStorage.setItem('email', JSON.stringify(email));
    localStorage.setItem('expires_in', expiresIn);

    setAuthState({
      token,
      email,
      expiresIn
    });
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('email');
    localStorage.removeItem('expires_in');
    setAuthState({});
    history.push('/login');
  };

  const isAuthenticated = () => {
    if (!authState.token || !authState.expiresIn) {
      return false;
    }
    return (
      new Date().getTime() / 1000 < authState.expiresIn
    );
  };

  return (
    <Provider
      value={{
        authState,
        setAuthState: authInfo => setAuthInfo(authInfo),
        logout,
        isAuthenticated
      }}
    >
      {children}
    </Provider>
  );
};

export { AuthContext, AuthProvider };
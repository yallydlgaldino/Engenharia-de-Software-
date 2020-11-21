import React, { createContext, useState } from 'react';
import { useHistory } from 'react-router-dom';

const AuthContext = createContext();
const { Provider } = AuthContext;

const AuthProvider = ({ children }) => {
  const history = useHistory();

  const token = localStorage.getItem('token');
  const idUser = localStorage.getItem('idUser');
  const expiresIn = localStorage.getItem('expires_in');

  const [authState, setAuthState] = useState({
    token,
    expiresIn,
    idUser: idUser ? JSON.parse(idUser) : {}
  });

  console.log(authState)

  const setAuthInfo = ({ token, idUser, expires_in : expiresIn }) => {
    localStorage.setItem('token', token);
    localStorage.setItem('idUser', JSON.stringify(idUser));
    localStorage.setItem('expires_in', expiresIn);

    setAuthState({
      token,
      idUser,
      expiresIn
    });
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('idUser');
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
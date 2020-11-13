import React, { createContext, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from './AuthContext';

const AuthFetchContext = createContext();
const { Provider } = AuthFetchContext;

const AuthFetchProvider = ({ children }) => {
  const authContext = useContext(AuthContext);

  const authFetch = axios.create({
    baseURL: 'http://tchimo-webservice.herokuapp.com/api/'
  });

  authFetch.interceptors.request.use(
    config => {
      config.headers.Authorization = `Bearer ${authContext.authState.token}`;
      return config;
    },
    error => {
      return Promise.reject(error);
    }
  );

  authFetch.interceptors.response.use(
    response => {
      return response;
    },
    error => {
      const code =
        error && error.response ? error.response.status : 0;
      return Promise.reject({error, code});
    }
  );

  return (
    <Provider
      value={{
        authFetch
      }}
    >
      {children}
    </Provider>
  );
};

export { AuthFetchContext, AuthFetchProvider };
import React, { createContext, useContext } from 'react';
import { useHistory } from 'react-router-dom'
import { toast } from 'react-toastify';
import axios, { CancelToken } from 'axios';

import { AuthContext } from './AuthContext';

const AuthFetchContext = createContext();
const { Provider } = AuthFetchContext;

const AuthFetchProvider = ({ children }) => {
  const authContext = useContext(AuthContext);
  const history = useHistory()
  
  const authFetch = axios.create({
    baseURL: 'http://tchimo-webservice.herokuapp.com/api/'
  });

  authFetch.interceptors.request.use(
    config => {
      if (authContext.isAuthenticated()) {
        config.headers.Authorization = `Bearer ${authContext.authState.token}`;
        return config;
      }
      
      history.push('/login')
    
      toast.error("Sua sessão expirou.", {
        autoClose: 2000
      })

      return {
        ...config,
        cancelToken: new CancelToken((cancel) => cancel('Expired Token'))
      };
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
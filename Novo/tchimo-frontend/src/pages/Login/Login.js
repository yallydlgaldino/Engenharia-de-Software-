import React, { useState, useContext } from 'react'
import { Redirect, Link } from 'react-router-dom'
import { useFormik } from 'formik'
import axios from 'axios'
import * as Yup from 'yup'

import { AuthContext } from '../../contexts/AuthContext' 

const LoginSchema = Yup.object().shape({
  email: Yup.string().required('Email is required'),
  password: Yup.string().required('Password is required')
});

const Login = () => {
  const authContext = useContext(AuthContext);

  const [loginSuccess, setLoginSuccess] = useState('')
  const [loginError, setLoginError] = useState('')
  const [redirectOnLogin, setRedirectOnLogin] = useState(false)
  const [loginLoading, setLoginLoading] = useState(false)

  const submitCredentials = async credentials => {

    const publicAxios = axios.create({
      baseURL: 'http://tchimo-webservice.herokuapp.com/api/'
    })

    try {
      setLoginLoading(true)
      
      const { data } = await publicAxios.post(
        `usuarios/login`,
        credentials
      )

      authContext.setAuthState(data)
      setLoginSuccess(data.message)
      setLoginError('')

      setTimeout(() => {
        setRedirectOnLogin(true)
      }, 500)
    } catch (error) {
      console.log(error);
      setLoginLoading(false)
      const { data } = error.response
      setLoginError(data.message)
      setLoginSuccess('')
    }
  };

  const formik = useFormik({
    initialValues: {
      email: '',
      password: ''
    },
    onSubmit: values => {
      submitCredentials(values)
    },
  });
  return (
    <>
      {loginError != '' && <p>Houve um erro no login</p>}
      {loginSuccess != '' && <p>Login realizado com sucesso</p>}
      
      <form onSubmit={formik.handleSubmit}>
        <label htmlFor="email">Email</label>
        <input
          id="email"
          name="email"
          type="email"
          onChange={formik.handleChange}
          value={formik.values.email}
        />
        <label htmlFor="password">Senha</label>
        <input
          id="password"
          name="password"
          type="password"
          onChange={formik.handleChange}
          value={formik.values.password}
        />
        <button type="submit">entrar</button>
      </form>

      <Link to="/signup">Ainda não se cadastrou ?</Link>
    </>
  );
};

export default Login;
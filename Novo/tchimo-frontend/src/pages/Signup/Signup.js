import React, { useState, useContext } from 'react'
import { Redirect, Link } from 'react-router-dom'
import { useFormik } from 'formik'
import axios from 'axios'
import * as Yup from 'yup'

import { AuthContext } from '../../contexts/AuthContext' 

const SignupSchema = Yup.object().shape({
  email: Yup.string().required('Email is required'),
  password: Yup.string().required('Password is required')
});

const Signup = () => {
  const authContext = useContext(AuthContext);

  const [signupSuccess, setSignupSuccess] = useState('')
  const [signupError, setSignupError] = useState('')
  const [redirectOnLogin, setRedirectOnLogin] = useState(false)

  const submitCredentials = async credentials => {

    const publicAxios = axios.create({
      baseURL: 'http://tchimo-webservice.herokuapp.com/api/'
    })

    try {
      console.log(credentials);

      const { data } = await publicAxios.post(
        `usuarios/adiciona`,
        credentials
      )

      setSignupSuccess(data.message)
      setSignupError('')

      setTimeout(() => {
        setRedirectOnLogin(true)
      }, 500)
    } catch (error) {
      console.log(error);
      const { data } = error.response
      setSignupError(data.message)
      setSignupSuccess('')
    }
  };

  const formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      password: '',
      confirmPassword: ''
    },
    onSubmit: values => {
      submitCredentials(values)
    },
  });
  return (
    <>
      <form onSubmit={formik.handleSubmit}>
        <label htmlFor="name">Nome</label>
        <input
          id="name"
          name="name"
          type="text"
          onChange={formik.handleChange}
          value={formik.values.name}
        />
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
        <label htmlFor="confirmPassword">Confirme a Senha</label>
        <input
          id="confirmPassword"
          name="confirmPassword"
          type="confirmPassword"
          onChange={formik.handleChange}
          value={formik.values.confirmPassword}
        />
        <button type="submit">cadastrar</button>
      </form>

      <Link to="/login">Já possui um cadastro ?</Link>
    </>
  );
};

export default Signup;
import React, { useState, useContext } from 'react'
import { Redirect, Link } from 'react-router-dom'
import { Formik, Form, ErrorMessage, Field } from 'formik'
import * as Yup from 'yup'
import { publicFetch } from '../../util/fetch'
import { AuthContext } from '../../contexts/AuthContext' 

import PeopleIcon from '../../static/images/people.svg'
import ArrowIcon from '../../static/images/arrow.svg'

import '../../App.css'

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

    try {
      setLoginLoading(true)
      
      const { data } = await publicFetch.post(
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


  return (
    <>
      {loginError != '' && <p>Houve um erro no login</p>}
      {loginSuccess != '' && <p>Login realizado com sucesso</p>}

      <Formik 
        initialValues={{
            email: '',
            password: '',
        }}
        validationSchema={LoginSchema}
        onSubmit={ values => {
            submitCredentials(values)
        }}
      >
        {({ errors, touched }) => (
            <Form>

                <label htmlFor="email">Email</label>
                <Field id="email" name="email"/>
                <ErrorMessage name="email" component="span" />

                <label htmlFor="password">Senha</label>
                <Field id="password" type="password" name="password"/>
                <ErrorMessage name="password" component="span"/>

                <button type="submit" className="button">
                  <img src={PeopleIcon} alt="People Icon" />
                    <span>entrar</span>
                  <img src={ArrowIcon} alt="Arrow Icon" />
                </button>
            </Form>
        )}
      </Formik>

      <Link to="/signup">Ainda não se cadastrou ?</Link>
    </>
  );
};

export default Login;
import React, { useState, useContext } from 'react'
import { Redirect, Link } from 'react-router-dom'
import { Formik, Form, ErrorMessage, Field } from 'formik'
import * as Yup from 'yup'
import { publicFetch } from '../../util/fetch'
import { AuthContext } from '../../contexts/AuthContext' 

import Logo from '../../static/images/logo.svg'
import EnterIcon from '../../static/images/enter.svg'
import ArrowIcon from '../../static/images/arrow.svg'

import '../../App.css'
import styles from './Login.module.css'

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

      <div className={styles.logoContainer}>
        <img src={Logo} className={styles.logo} alt="Tchimo Logo" />
      </div>

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
            <Form className="loginForm" autocomplete="off">
                <div className="fieldContainer">
                  <label htmlFor="email">Email:</label>
                  <Field id="email" name="email" className="field" placeholder="tchimo@domain.com" />
                  <div><ErrorMessage name="email" component="span" className="errorMessage" placeholder="tchimo@domain.com" /></div> 
                </div>

                <div className="fieldContainer">
                  <label htmlFor="password">Senha:</label>
                  <Field id="password" type="password" name="password" className="field" placeholder="senha" />
                  <div><ErrorMessage name="password" component="span" className="errorMessage" /></div>
                </div>

                <button type="submit" className="button">
                  <img src={EnterIcon} alt="Enter Icon" />
                    <span>entrar</span>
                  <img src={ArrowIcon} alt="Arrow Icon" />
                </button>
            </Form>
        )}
      </Formik>
      
      <div className="footer">
        <Link to="/signup" className="questionLink">Ainda não se cadastrou ?</Link>
      </div>
    </>
  );
};

export default Login;
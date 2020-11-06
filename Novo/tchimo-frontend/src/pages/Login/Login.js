import React, { useState, useContext } from 'react'
import { Redirect, Link } from 'react-router-dom'
import { Formik, Form, ErrorMessage, Field } from 'formik'
import * as Yup from 'yup'
import { publicFetch } from '../../util/fetch'
import { toast } from 'react-toastify';
import { AuthContext } from '../../contexts/AuthContext' 

import Logo from '../../static/images/logo.svg'
import VpnKeyIcon from '@material-ui/icons/VpnKey';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos'

import '../../App.css'
import styles from './Login.module.css'
import 'react-toastify/dist/ReactToastify.css';

const LoginSchema = Yup.object().shape({
  email: Yup.string().required('O email é obrigatório'),
  password: Yup.string().required('A senha é obrigatória')
});

const Login = () => {
  const authContext = useContext(AuthContext);

  const [loginSuccess, setLoginSuccess] = useState('')
  const [loginError, setLoginError] = useState('')
  const [redirectOnLogin, setRedirectOnLogin] = useState(authContext.isAuthenticated())

  const submitCredentials = async credentials => {

    try {
      
      const { data } = await publicFetch.post(
        `usuarios/login`,
        credentials
      )

      authContext.setAuthState(data)
      toast.success("Login realizado com sucesso", {
        autoClose: 2000
      })

      setTimeout(() => {
        setRedirectOnLogin(true)
      }, 500)
    } catch (error) {
      const { data } = error.response
      toast.error(JSON.stringify(data.token).replaceAll("\"", ""), {
        autoClose: 2000
      })
    }
  };

  return (
    <>
      {redirectOnLogin && <Redirect to="/classes" />}

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
            <Form className="loginForm">
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
                  <VpnKeyIcon />
                  <span>entrar</span>
                  <ArrowForwardIosIcon />
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
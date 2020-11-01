import React, { useState, useContext } from 'react'
import { Redirect, Link } from 'react-router-dom'
import { Formik, Form, ErrorMessage, Field } from 'formik'
import axios from 'axios'
import * as Yup from 'yup'

import { AuthContext } from '../../contexts/AuthContext' 

const SignupSchema = Yup.object().shape({
    name: Yup.string()
        .min(2, 'Too Short!')
        .max(40, 'Too Long!')
        .required('Required'),
    email: Yup.string().email('Invalid email').required('Required'),
    password: Yup.string()
        .min(8, 'Too Short!')
        .max(20, 'Too Long!')
        .required('Required'),
    confirmPassword: Yup.string()
        .min(8, 'Too Short!')
        .max(20, 'Too Long!')
        .required('Required'),
});

const Signup = () => {
  const authContext = useContext(AuthContext);

  const [signupSuccess, setSignupSuccess] = useState('')
  const [signupError, setSignupError] = useState('')
  const [redirectOnLogin, setRedirectOnLogin] = useState(false)

  const submitCredentials = async signupData => {

    const publicAxios = axios.create({
      baseURL: 'http://tchimo-webservice.herokuapp.com/api/'
    })

    if (signupData.password === signupData.confirmPassword) {
        const credentials = {name: signupData.name, email: signupData.email, password: signupData.password}
        
        try {
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
    } else {
        alert("Senhas incompatíveis...")
    }
  };

  return (
    <>
      <Formik 
        initialValues={{
            name: '',
            email: '',
            password: '',
            confirmPassword: ''
        }}
        validationSchema={SignupSchema}
        onSubmit={ values => {
            submitCredentials(values)
        }}
      >
        {({ errors, touched }) => (
            <Form>
                <label htmlFor="name">Nome</label>
                <Field id="name" name="name"/>
                <ErrorMessage name="name" component="span" />

                <label htmlFor="email">Email</label>
                <Field id="email" name="email"/>
                <ErrorMessage name="email" component="span" />

                <label htmlFor="password">Senha</label>
                <Field id="password" type="password" name="password"/>
                <ErrorMessage name="password" component="span"/>

                <label htmlFor="confirmPassword">Confirme a Senha</label>
                <Field id="confirmPassword" type="password" name="confirmPassword"/>
                <ErrorMessage name="confirmPassword" component="span"/>

                <button type="submit">cadastrar</button>
            </Form>
        )}
      </Formik>

      <Link to="/login">Já possui um cadastro ?</Link>
    </>
  );
};

export default Signup;
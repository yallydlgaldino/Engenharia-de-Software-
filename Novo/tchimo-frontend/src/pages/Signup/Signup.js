import React, { useState, useContext } from 'react'
import { Redirect, Link } from 'react-router-dom'
import { Formik, Form, ErrorMessage, Field } from 'formik'
import * as Yup from 'yup'
import { publicFetch } from '../../util/fetch'

import { AuthContext } from '../../contexts/AuthContext' 

import EnterIcon from '../../static/images/enter.svg'
import ArrowIcon from '../../static/images/arrow.svg'

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

    if (signupData.password === signupData.confirmPassword) {
        const credentials = {name: signupData.name, email: signupData.email, password: signupData.password}
        
        try {
            const { data } = await publicFetch.post(
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
      <p>Cadastre-se</p>

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
                <div className="fieldContainer">
                  <label htmlFor="name">Nome:</label>
                  <Field id="name" name="name" className="field" placeholder="nome" />
                  <div><ErrorMessage name="name" component="span" className="errorMessage" /></div> 
                </div>

                <div className="fieldContainer">
                  <label htmlFor="email">Email:</label>
                  <Field id="email" name="email" className="field" placeholder="tchimo@domain.com" />
                  <div><ErrorMessage name="email" component="span" className="errorMessage" /></div> 
                </div>

                <div className="fieldContainer">
                  <label htmlFor="password">Senha:</label>
                  <Field id="password" type="password" name="password" className="field" placeholder="senha" />
                  <div><ErrorMessage name="password" component="span" className="errorMessage" /></div>
                </div>

                <div className="fieldContainer">
                  <label htmlFor="confirmPassword">Confirme a Senha:</label>
                  <Field id="confirmPassword" type="password" name="confirmPassword" className="field" placeholder="senha" />
                  <div><ErrorMessage name="confirmPassword" component="span" className="errorMessage" /></div>
                </div>

                <button type="submit" className="button">
                  <img src={EnterIcon} alt="Enter Icon" />
                    <span>cadastrar</span>
                  <img src={ArrowIcon} alt="Arrow Icon" />
                </button>
            </Form>
        )}
      </Formik>

      <div className="footer">
        <Link to="/login" className="questionLink">Já possui um cadastro ?</Link>
      </div>
    </>
  );
};

export default Signup;
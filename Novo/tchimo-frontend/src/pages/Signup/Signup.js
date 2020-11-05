import React, { useState, useContext } from 'react'
import { Redirect, Link } from 'react-router-dom'
import { Formik, Form, ErrorMessage, Field } from 'formik'
import * as Yup from 'yup'
import { publicFetch } from '../../util/fetch'
import { toast } from 'react-toastify';

import { AuthContext } from '../../contexts/AuthContext' 

import EnterIcon from '../../static/images/enter.svg'
import ArrowIcon from '../../static/images/arrow.svg'

import TchimoHeader from '../../components/TchimoHeader/TchimoHeader'

const SignupSchema = Yup.object().shape({
    name: Yup.string()
        .min(2, 'Número de caracteres menor que 2')
        .max(40, 'Número de caracteres maior que 40')
        .required('O nome é obrigatório'),
    email: Yup.string()
        .email('O email é inválido')
        .required('O email é obrigatório'),
    password: Yup.string()
        .min(8, 'Número de caracteres menor que 8')
        .max(20, 'Número de caracteres maior que 20')
        .required('A senha é obrigatória'),
    passwordConfirmation: Yup.string()
        .oneOf([Yup.ref('password'), null], 'Senhas devem ser as mesmas')
        .required('A confirmação de senha é obrigatória')
});

const Signup = () => {
  const authContext = useContext(AuthContext);

  const [signupSuccess, setSignupSuccess] = useState('')
  const [signupError, setSignupError] = useState('')
  const [redirectOnLogin, setRedirectOnLogin] = useState(false)

  const submitCredentials = async signupData => {
    const credentials = {name: signupData.name, email: signupData.email, password: signupData.password}
    
    try {
        const { data } = await publicFetch.post(
            `usuarios/adiciona`,
            credentials
        )

        setSignupSuccess(data.message)
        setSignupError('')

        toast.success("Cadastro realizado com sucesso", {
          autoClose: 2000
        })

        setTimeout(() => {
            setRedirectOnLogin(true)
        }, 500)
    } catch (error) {
      toast.error("Erro: Já existe usuário com esse email.", {
        autoClose: 2000
      })
    }
  };

  return (
    <>
      <TchimoHeader />

      <p className="session">Cadastre-se</p>

      <Formik 
        initialValues={{
            name: '',
            email: '',
            password: '',
            passwordConfirmation: ''
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
                  <label htmlFor="passwordConfirmation">Confirme a Senha:</label>
                  <Field id="passwordConfirmation" type="password" name="passwordConfirmation" className="field" placeholder="senha" />
                  <div><ErrorMessage name="passwordConfirmation" component="span" className="errorMessage" /></div>
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
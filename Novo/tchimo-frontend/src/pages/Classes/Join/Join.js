import React, { useState, useContext } from 'react'
import { Formik, Form, ErrorMessage, Field } from 'formik'
import * as Yup from 'yup'
import { publicFetch } from '../../../util/fetch'
import '../../../App.css'
import styles from './Join.module.css'

import PeopleIcon from '@material-ui/icons/People'
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos'
import Logo from '../../../static/images/logo.svg'

import TchimoHeader from '../../../components/TchimoHeader/TchimoHeader'
import TabbedMenu from '../../../components/TabbedMenu/TabbedMenu'

const JoinSchema = Yup.object().shape({
  code: Yup.string().required('O código é obrigatório')
});

const Join = () => {

  const [joinSuccess, setJoinSuccess] = useState('')
  const [joinError, setJoinError] = useState('')
  const [redirectOnLogin, setRedirectOnLogin] = useState(false)

  const submitJoin = async code => {
    try {      
      const { data } = await publicFetch.post(
        `usuarios/`,
        code
      )

      setJoinSuccess(data.message)
      setJoinError('')

      setTimeout(() => {
        setRedirectOnLogin(true)
      }, 500)
    } catch (error) {
      console.log(error);
      const { data } = error.response
      setJoinError(data.message)
      setJoinSuccess('')
    }
  };


  return (
    <>
      <TchimoHeader />

      {joinError !== '' && <p>Houve um erro na sua solicitação!</p>}
      {joinSuccess !== '' && <p>Bem vindo a sua sala!</p>}

      <div className={styles.logoContainer}>
        <img className={styles.logo} src={Logo} alt="Tchimo Logo" />
      </div>

      <Formik 
        initialValues={{
            code: ''
        }}
        validationSchema={JoinSchema}
        onSubmit={ values => {
            submitJoin(values)
        }}
      >
        {({ errors, touched }) => (
            <Form>
                <div className="fieldContainer">
                  <label htmlFor="code">Código da Sala:</label>
                  <Field id="code" name="code" className="field" placeholder="código da turma" />
                  <div><ErrorMessage name="code" component="span" className="errorMessage" /></div> 
                </div>

                <button type="submit" className="button">
                  <PeopleIcon />
                  <span>entrar</span>
                  <ArrowForwardIosIcon />
                </button>
            </Form>
        )}
      </Formik>
      
      <TabbedMenu />
    </>
  );
};

export default Join;
import React, { useState, useContext } from 'react'
import { Formik, Form, ErrorMessage, Field } from 'formik'
import * as Yup from 'yup'
import { publicFetch } from '../../../util/fetch'

import TchimoHeader from '../../../components/TchimoHeader/TchimoHeader'
import TabbedMenu from '../../../components/TabbedMenu/TabbedMenu'

const JoinSchema = Yup.object().shape({
  code: Yup.string().required('Code is required')
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
                <label htmlFor="code">Código da Sala</label>
                <Field id="code" name="code"/>
                <ErrorMessage name="code" component="span" />

                <button type="submit">entrar</button>
            </Form>
        )}
      </Formik>
      
      <TabbedMenu />
    </>
  );
};

export default Join;
import React, { useContext } from 'react'
import { useHistory } from "react-router-dom";
import { Formik, Form, ErrorMessage, Field } from 'formik'
import * as Yup from 'yup'
import { AuthFetchContext } from '../../../contexts/AuthFetchContext'
import { toast } from 'react-toastify';

import '../../../App.css'
import styles from './Join.module.css'

import PeopleIcon from '@material-ui/icons/People'
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos'
import Logo from '../../../static/images/logo.svg'

import TchimoHeader from '../../../components/TchimoHeader/TchimoHeader'
import TabbedMenu from '../../../components/TabbedMenu/TabbedMenu'

const JoinSchema = Yup.object().shape({
  id: Yup.string().required('O código é obrigatório')
});

const Join = () => {

  const { authFetch } = useContext(AuthFetchContext)
  const history = useHistory()

  const submitJoin = async ({id}) => {
    try {      
      const { data } = await authFetch.post(`turmas/${id}`)

      toast.success(`Bem vindo a turma de código ${id}!`, {
        autoClose: 2000
      })

      history.push(`/classes/${id}`)
    } catch (error) {
      toast.error(`Ocorreu um erro no participação. Tente novamente.`, {
        autoClose: 2000
      })
    }
  };


  return (
    <>
      <TchimoHeader />

      <div className={styles.logoContainer}>
        <img className={styles.logo} src={Logo} alt="Tchimo Logo" />
      </div>

      <Formik 
        initialValues={{
          id: ''
        }}
        validationSchema={JoinSchema}
        onSubmit={ values => {
          submitJoin(values)
        }}
      >
        {({ errors, touched }) => (
            <Form>
                <div className="fieldContainer">
                  <label htmlFor="id">Código da Sala:</label>
                  <Field id="code" name="id" className="field" placeholder="código da turma" />
                  <div><ErrorMessage name="id" component="span" className="errorMessage" /></div> 
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
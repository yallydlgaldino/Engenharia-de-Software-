import React, { useState, useContext } from 'react'
import { Formik, Form, ErrorMessage, Field } from 'formik'
import * as Yup from 'yup'
import { AuthFetchContext } from '../../../contexts/AuthFetchContext'
import { toast } from 'react-toastify';

import '../../../App.css'

import styles from './Register.module.css'

import PeopleIcon from '@material-ui/icons/People'
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos'

import TchimoHeader from '../../../components/TchimoHeader/TchimoHeader'
import TabbedMenu from '../../../components/TabbedMenu/TabbedMenu'

const RegisterSchema = Yup.object().shape({
    name: Yup.string()
        .min(2, 'Nome contém menos de 2 caracteres.')
        .max(50, 'Nome contém mais de 50 caracteres.')
        .required('O campo é obrigatório.'),
    quantityOfGroups: Yup.number()
        .min(1, '1 grupo é o mínimo.')
        .max(50, '50 grupos é o máximo.')
        .required('O campo é obrigatório.'),
    formationStrategy: Yup.string()
        .required('O campo é obrigatório'),
    endingStrategy: Yup.string()
        .required('O campo é obrigatório'),
    endTime: Yup.number()
        .min(0, "Quantidade de horas negativa.")
        .when('endingStrategy', {
            is: 'automatica',
            then: fieldSchema => fieldSchema.required('Especifique uma quantidade de horas.'),
        }),
    minutes: Yup.number()
        .min(0, "Quantidade de minutos negativa.")
        .max(60, "Quantidade de minutos maior que 60.")
        .when('endingStrategy', {
            is: 'automatica',
            then: fieldSchema => fieldSchema.required('Especifique uma quantidade de minutos'),
        }),
});

const Register = () => {

  const { authFetch } = useContext(AuthFetchContext)
  const [redirectOnRegister, setRedirectOnRegister] = useState(false)

  const submitRegister = async registerData => {

    try {
        const { data } = await authFetch.post(`turmas`, registerData)
        
        toast.success(`Cadastro realizado com sucesso. ${data}`, {
            autoClose: 20000
        })

        setTimeout(() => {
            setRedirectOnRegister(true)
        }, 500)
    } catch (error) {
        toast.error(`Ocorreu um erro no cadastro. Tente novamente. ${error}`, {
            autoClose: 2000
        })

        console.log(error)
    }
  };

  return (
    <>
      <TchimoHeader />

      <p className="session">Cadastro de Turma</p>

      <Formik 
        initialValues={{
            name: '',
            quantityOfGroups: 1,
            formationStrategy: 'UNIFORME',
            endingStrategy: 'MANUAL',
            endTime: 0,
            minutes: 0
        }}
        validationSchema={RegisterSchema}
        onSubmit={ values => {
            submitRegister(values)
        }}
      >
        {({ errors, touched }) => (
            <Form className={styles.registerForm}>
                <div className="fieldContainer">
                  <label htmlFor="name">Nome:</label>
                  <Field id="name" name="name" className="field" placeholder="nome da turma" />
                  <div><ErrorMessage name="name" component="span" className="errorMessage" /></div> 
                </div>

                <div className="fieldContainer">
                  <label htmlFor="quantityOfGroups">Quantidade de Grupos:</label>
                  <Field type="number" id="quantityOfGroups" name="quantityOfGroups" className="field" />
                  <div><ErrorMessage name="quantityOfGroups" component="span" className="errorMessage" /></div> 
                </div>

                <p className="smallSession">Estratégias de Formação</p>

                <div role="group" className={styles.formationRadioGroup} aria-labelledby="formationStrategy">
                    <div className={styles.radioContainer}>
                        <Field type="radio" name="formationStrategy" value="UNIFORME" />
                        <label>Uniforme</label>
                        <p>
                            Limita o número de pessoas  nos grupos com base na quantidade de pessoas 
                            na sala.
                        </p>
                    </div>
    
                    <div className={styles.radioContainer}>
                        <Field type="radio" name="formationStrategy" value="VARIAVEL" />
                        <label>Variável</label>
                        <p>Não limita o número de pessoas por grupo.</p>
                    </div>
                </div>
                <ErrorMessage name="formationStrategy" component="span" className="errorMessage"/>

                <p className="smallSession">Encerramento de Formação</p>

                <div role="group" className={styles.endingRadioGroup} aria-labelledby="endingStrategy">
                    <div className={styles.radioContainer}>
                        <Field type="radio" name="endingStrategy" value="MANUAL" />
                        <label>Manual</label>
                        <p>Você deverá encerrar a formação manualmente.</p>
                    </div>

                    <div className={styles.radioContainer}>
                        <Field type="radio" name="endingStrategy" value="CRONOMETRO" />
                        <label>Automática</label>
                        <p>A formação deve ocorrer por:</p>
                        <p className={styles.automaticOptionsContainer}>
                            <Field type="number" name="endTime" className={styles.automaticOption} /> horas e
                            <Field type="number" name="minutes" className={styles.automaticOption} /> min 
                            <ErrorMessage name="endTime" component="span" className="errorMessage" />
                            <ErrorMessage name="minutes" component="span" className="errorMessage" />
                        </p>
                    </div>
                </div>
                <ErrorMessage name="endingRadioGroup" component="span" className="errorMessage" />

                <button type="submit" className="button">
                    <PeopleIcon />
                    <span>criar turma</span>
                    <ArrowForwardIosIcon />
                </button>
            </Form>
        )}
      </Formik>

      <TabbedMenu />
    </>
  );
};

export default Register;
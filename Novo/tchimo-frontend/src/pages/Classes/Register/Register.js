import React, { useState, useContext } from 'react'
import { Redirect, Link } from 'react-router-dom'
import { Formik, Form, ErrorMessage, Field } from 'formik'
import * as Yup from 'yup'
import { publicFetch } from '../../../util/fetch'
import '../../../App.css'

import styles from './Register.module.css'

import PeopleIcon from '../../../static/images/people.svg'
import ArrowIcon from '../../../static/images/arrow.svg'

import TchimoHeader from '../../../components/TchimoHeader/TchimoHeader'

const RegisterSchema = Yup.object().shape({
    name: Yup.string()
        .min(2, 'Too Short!')
        .max(50, 'Too Long!')
        .required('Required'),
    quantityOfGroups: Yup.number()
        .min(1, 'Too Short!')
        .max(50, 'Too Long!')
        .required('Required'),
    formationRadioGroup: Yup.string()
        .required('Required'),
    endingRadioGroup: Yup.string()
        .required('Required'),
    automaticHour: Yup.number().when('endingRadioGroup', {
        is: 'automatica',
        then: fieldSchema => fieldSchema.required('Amount of hour is required'),
    }),
    automaticMin: Yup.number().when('endingRadioGroup', {
        is: 'automatica',
        then: fieldSchema => fieldSchema.required('Amount of minutes is required'),
    }),
});

const Register = () => {

  const [registerSuccess, setRegisterSuccess] = useState('')
  const [registerError, setRegisterError] = useState('')
  const [redirectOnRegister, setRedirectOnRegister] = useState(false)

  const submitRegister = async registerData => {
    console.log(registerData);

    try {
        const { data } = await publicFetch.post(
            `usuarios/adiciona`,
            registerData
        )

        setRegisterSuccess(data.message)
        setRegisterError('')

        setTimeout(() => {
            setRedirectOnRegister(true)
        }, 500)
    } catch (error) {
        console.log(error);
        const { data } = error.response
        setRegisterError(data.message)
        setRegisterSuccess('')
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
            formationRadioGroup: 'uniforme',
            endingRadioGroup: 'manual',
            automaticEndHour: 0,
            automaticEndMin: 0
        }}
        validationSchema={RegisterSchema}
        onSubmit={ values => {
            submitRegister(values)
        }}
      >
        {({ errors, touched }) => (
            <Form>
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

                <div role="group" aria-labelledby="formationRadioGroup">
                    <div className={styles.radioContainer}>
                        <Field type="radio" name="formationRadioGroup" value="uniforme" />
                        <label>Uniforme</label>
                        <p>
                            Limita o número de pessoas  nos grupos com base na quantidade de pessoas 
                            na sala.
                        </p>
                    </div>
    
                    <div className={styles.radioContainer}>
                        <Field type="radio" name="formationRadioGroup" value="variavel" />
                        <label>Variável</label>
                        <p>Não limita o número de pessoas por grupo.</p>
                    </div>
                </div>
                <ErrorMessage name="formationRadioGroup" component="span"/>

                <p className="smallSession">Encerramento de Formação</p>

                <div role="group" aria-labelledby="endingRadioGroup">
                    <div className={styles.radioContainer}>
                        <Field type="radio" name="endingRadioGroup" value="manual" />
                        <label>Manual</label>
                        <p>Você deverá encerrar a formação manualmente.</p>
                    </div>

                    <div className={styles.radioContainer}>
                        <Field type="radio" name="endingRadioGroup" value="automatica" />
                        <label>Automática</label>
                        <p>A formação deve ocorrer por:</p>
                        <p className={styles.automaticOptionsContainer}>
                            <Field type="number" name="automaticEndHour" className={styles.automaticOption}/> horas e
                            <Field type="number" name="automaticEndMin" className={styles.automaticOption} /> min 
                        </p>
                    </div>
                </div>
                <ErrorMessage name="endingRadioGroup" component="span"/>

                <Link to="/login" className="button">
                    <img src={PeopleIcon} alt="People Icon" />
                    <span>criar turma</span>
                    <img src={ArrowIcon} alt="Arrow Icon" />
                </Link>
            </Form>
        )}
      </Formik>
    </>
  );
};

export default Register;
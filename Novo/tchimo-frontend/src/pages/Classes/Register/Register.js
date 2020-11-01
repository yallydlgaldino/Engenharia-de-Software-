import React, { useState, useContext } from 'react'
import { Redirect, Link } from 'react-router-dom'
import { Formik, Form, ErrorMessage, Field } from 'formik'
import * as Yup from 'yup'
import { publicFetch } from '../../../util/fetch'

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
      <p>Cadastro de Sala</p>

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
                <label htmlFor="name">Nome</label>
                <Field id="name" name="name"/>
                <ErrorMessage name="name" component="span" />

                <label htmlFor="quantityOfGroups">Quantidade de Grupos</label>
                <Field type="number" id="quantityOfGroups" name="quantityOfGroups"/>
                <ErrorMessage name="quantityOfGroups" component="span" />

                <p>Estratégias de Formação</p>

                <div role="group" aria-labelledby="formationRadioGroup">
                    <label>
                        <Field type="radio" name="formationRadioGroup" value="uniforme" />
                        Uniforme
                    </label>
                    <label>
                        <Field type="radio" name="formationRadioGroup" value="variavel" />
                        Variável
                    </label>
                </div>
                <ErrorMessage name="formationRadioGroup" component="span"/>

                <p>Encerramento de Formação</p>

                <div role="group" aria-labelledby="endingRadioGroup">
                    <label>
                        <Field type="radio" name="endingRadioGroup" value="manual" />
                        Manual
                    </label>
                    <label>
                        <Field type="radio" name="endingRadioGroup" value="automatica" />
                        Automática
                    </label>
                    <span>A formação deve ocorrer por: </span>
                    <Field type="number" name="automaticEndHour" /> horas e
                    <Field type="number" name="automaticEndMin" /> min
                </div>
                <ErrorMessage name="endingRadioGroup" component="span"/>

                <button type="submit">criar sala</button>
            </Form>
        )}
      </Formik>
    </>
  );
};

export default Register;
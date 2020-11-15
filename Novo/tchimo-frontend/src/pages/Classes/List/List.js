import React, { useState, useContext, useEffect }  from 'react'
import { Link } from "react-router-dom";
import { AuthFetchContext } from '../../../contexts/AuthFetchContext'
import { toast } from 'react-toastify'

import TchimoHeader from '../../../components/TchimoHeader/TchimoHeader'
import TabbedMenu from '../../../components/TabbedMenu/TabbedMenu'
import Spinner from '../../../components/Spinner'

import '../../../App.css'
import styles from './List.module.css'

function List() {

    const [isLoaded, setLoaded] = useState(false)
    const [classrooms, setClassrooms] = useState([])

    const { authFetch } = useContext(AuthFetchContext)
    
    const fetchList = async () => {
        const { data }  = await authFetch.get(`turmas`)
        setClassrooms(data)
        setLoaded(true)
    }

    useEffect(() => {
      
      try {
        fetchList()
      } catch(error) {
        clearInterval(intervalId)
        toast.error(`Ocorreu um erro na atualização.`, {
          autoClose: 2000
        })
      }

      const intervalId = setInterval(async () => {
        try {
          fetchList()
        } catch(error) {
          clearInterval(intervalId)
          toast.error(`Ocorreu um erro na atualização.`, {
            autoClose: 2000
          })
        }
      }, 5000)

      return () => clearInterval(intervalId)
    
    }, [])

    const generateClassroomsMarkup = (classroomsArray) => classroomsArray.map(classroom => (
        <div className={styles.classContainer} key={classroom.id}>
            <span className={styles.className}>{classroom.name}</span>
            <span className={styles.classCode}>CÓDIGO: {classroom.id}</span>
            <span className={styles.classInfo}>{classroom.integrantes.length} membro(s) - {classroom.totalGroups} grupo(s)</span>
            <div className={styles.classOptions}>
                <Link to={`/classes/${classroom.id}`} className={styles.classSolicitation}>
                    Acessar
                </Link>
                { !classroom.usuario ? 
                    <button className={styles.classSolicitation}>
                        Sair da Turma
                    </button>
                    : null
                }
                { classroom.endingStrategy === "MANUAL" ? 
                    <button className={styles.classSolicitation}>
                        Encerrar Formação
                    </button>
                    : null
                }
                { true ? 
                    <button className={styles.classSolicitation}>
                        Distribuir
                    </button>
                    : null
                }
            </div>
        </div>
    ))

    return (
        <>
            <TchimoHeader />

            { isLoaded ? 
                <>
                    <p className="session">Salas</p>
                    <div className={styles.classesContainer}>
                        {generateClassroomsMarkup(classrooms)}
                    </div>
                </>
                :      
                <div className={styles.transitionScreen}>
                    <Spinner size={55} color='#316993' />
                </div>
            }

            <TabbedMenu />
        </>
    )
}

export default List
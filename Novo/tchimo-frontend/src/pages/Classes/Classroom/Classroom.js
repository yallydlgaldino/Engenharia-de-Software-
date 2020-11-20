import React, { useState, useEffect, useContext } from 'react'
import { PDFDownloadLink } from '@react-pdf/renderer'
import { useParams, useHistory } from "react-router-dom";
import { AuthFetchContext } from '../../../contexts/AuthFetchContext'
import { toast } from 'react-toastify'

import getNormalizedText from '../../../util/text_normalizer'
import TchimoHeader from '../../../components/TchimoHeader/TchimoHeader'
import TabbedMenu from '../../../components/TabbedMenu/TabbedMenu'
import GroupListPDF from '../../../components/GroupListPDF'

import CloudDownloadIcon from '@material-ui/icons/CloudDownload';
import AddIcon from '@material-ui/icons/Add';
import PeopleIcon from '@material-ui/icons/People';
import SupervisedUserCircleIcon from '@material-ui/icons/SupervisedUserCircle';
import ListIcon from '@material-ui/icons/List';
import NotificationsActiveIcon from '@material-ui/icons/NotificationsActive';

import styles from './Classroom.module.css'

import Spinner from '../../../components/Spinner'

import '.././../../App.css'
import Countdown from '../../../components/Countdown';
import ConfirmationButton from '../../../components/ConfirmationButton/ConfirmationButton';

function Classroom(props) {
    const [showDownloadLink, setHideDownloadLink] = useState(false)

    const [isLoaded, setLoaded] = useState(false)
    const [notFound, setNotFound] = useState(false)

    const [groups, setGroups] = useState([])
    const [classroomName, setClassroomName] = useState("")
    const [endTimestamp, setEndTimestamp] = useState(0)
    const [formationStrategy, setFormationStrategy] = useState("")
    const [endingStrategy, setEndingStrategy] = useState("")

    const { authFetch } = useContext(AuthFetchContext)

    const {code} = useParams()
    
    const fetchClassroom = async () => {
      const { data } = await authFetch.get(
        `turmas/${code}`
      )

      setClassroomName(data.name)

      setGroups([
        {
          name: 'Grupo 1',
          members: [
            'Wesley Santos',
            'Angela',
            'Caio Medeiros'
          ]
        },
        {
          name: 'Grupo 2',
          members: [
            'Wesley Santos',
          ]
        }
      ]);

      setEndTimestamp(data.endDate)
      setFormationStrategy(data.formationStrategy)
      setEndingStrategy(data.endingStrategy)

      setLoaded(true)

      setHideDownloadLink(true)
    }

    useEffect(() => {
      
      try {
        fetchClassroom()
      } catch(error) {
        setNotFound(true)
        toast.error(`Ocorreu um erro na atualização.`, {
          autoClose: 2000
        })
      }

      const intervalId = setInterval(async () => {
        try {
          fetchClassroom()
        } catch(error) {
          setNotFound(true)
          clearInterval(intervalId)
          toast.error(`Ocorreu um erro na atualização.`, {
            autoClose: 2000
          })
        }
      }, 5000)

      return () => clearInterval(intervalId)
    
    }, [])

    return (
        <>
          <TchimoHeader />

          { isLoaded ? 
            <>
              <p className="session">{classroomName}</p>

              <div className={styles.header}>
                <span className={styles.timeUntilEnd}> PRAZO: {
                  endingStrategy === "CRONOMETRO" && (endTimestamp - (new Date().getTime() / 1000) > 0) ? 
                    <Countdown time={endTimestamp - (new Date().getTime() / 1000)}/>
                  :
                    'Indeterminado'
                }</span>
                {showDownloadLink ?
                  <PDFDownloadLink 
                    document={<GroupListPDF name={classroomName} groups={groups} />} 
                    fileName={getNormalizedText(`tchimo-${classroomName}-${new Date().toLocaleDateString()}`)} 
                    className={styles.pdfButton}>
                      {({ blob, url, loading, error }) => (loading ? <span><Spinner size="1em" color="white" /></span> : <span><CloudDownloadIcon /></span>)}
                  </PDFDownloadLink> : 
                  <span className={styles.pdfButton}>
                    <Spinner size="1em" color="white" />
                  </span>
                }
              </div>
    
              <div className={styles.groupsContainer}>
                <div className={styles.groupContainer}>
                  <div className={styles.groupHeader}>
                    <span className={styles.groupName}>Grupo 1</span>
                  </div>
                  <div className={styles.membersContainer}>
                    <span className={styles.memberName}> 1. Wesley Santos </span>
                    <span className={styles.memberName}> 2. Angela </span>
                  </div>
                  <div className={styles.groupOptions}>
                    {/* <button className={styles.groupSolicitation}>
                      Solicitar Junção
                    </button> */}
                    {/* <button className={styles.groupSolicitation}>
                      Solicitar Participação
                    </button> */}
                    <ConfirmationButton className={styles.groupSolicitation}>
                      Sair de Grupo
                    </ConfirmationButton>
                  </div>
                </div>
    
                <button className="button">
                  <AddIcon />
                  <span>criar grupo</span>
                  <PeopleIcon />
                </button>
              </div>

              <TabbedMenu 
                customData={{ code }}
                customLinks={
                  [
                    {
                      url: '/classes',
                      icon: <PeopleIcon />,
                      label: 'Turmas'
                    },
                    {
                      url: `/classes/${code}`,
                      icon: <SupervisedUserCircleIcon />,
                      label: 'Grupos'
                    },
                    {
                      url: `/classes/${code}/members`,
                      icon: <ListIcon />,
                      label: 'Membros'
                    },
                    {
                      url: '/notifications',
                      icon: <NotificationsActiveIcon />,
                      label: 'Notificações'
                    }
                  ]
                }
              />
            </>
            :
            <>
              <div className={styles.transitionScreen}>
                { !notFound ? 
                    <Spinner size={55} color='#316993' />
                  :
                    <p>Turma não encontrada :(</p>
                }
              </div>
              <TabbedMenu />
            </>
          }
          
          
        </>
    )
}

export default Classroom
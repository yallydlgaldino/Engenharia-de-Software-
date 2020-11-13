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
    
    useEffect(() => {

      const intervalId = setInterval(async () => {
        try {
          const { data } = await authFetch.get(
            `turma/${code}`
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

          setEndTimestamp(data.endTimestamp)
          setFormationStrategy(data.formationStrategy)
          setEndingStrategy(data.endingStrategy)

          setLoaded(true)
        } catch(error) {
          setNotFound(true)
          clearInterval(intervalId)
        }

        setHideDownloadLink(true)
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
                <span className={styles.timeUntilEnd}> PRAZO: 00:30:00</span>
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
                    <span className={styles.groupSolicitation}>
                      Solicitar Participação
                    </span>
                  </div>
                </div>
    
                <div className={styles.groupContainer}>
                  <div className={styles.groupHeader}>
                    <span className={styles.groupName}>Grupo 2</span>
                  </div>
                  <div className={styles.membersContainer}>
                    <span className={styles.memberName}> 1. Wesley Santos </span>
                    <span className={styles.memberName}> 2. Angela </span>
                  </div>
                  <div className={styles.groupOptions}>
                    <span className={styles.groupSolicitation}>
                      Solicitar Participação
                    </span>
                  </div>
                </div>
    
                <div className={styles.groupContainer}>
                  <div className={styles.groupHeader}>
                    <span className={styles.groupName}>Grupo 3</span>
                  </div>
                  <div className={styles.membersContainer}>
                    <span className={styles.memberName}> 1. Wesley Santos </span>
                    <span className={styles.memberName}> 2. Angela </span>
                  </div>
                  <div className={styles.groupOptions}>
                    <span className={styles.groupSolicitation}>
                      Solicitar Participação
                    </span>
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
              <p className="session">{!notFound ? 'Carregando...' : 'Turma não foi encontrada.'}</p>
              <TabbedMenu />
            </>
          }
          
          
        </>
    )
}

export default Classroom
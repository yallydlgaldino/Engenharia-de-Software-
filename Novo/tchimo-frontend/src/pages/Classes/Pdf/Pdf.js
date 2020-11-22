import React, { useState, useEffect, useContext } from 'react'
import { PDFDownloadLink } from '@react-pdf/renderer'
import { useParams } from "react-router-dom";
import { AuthFetchContext } from '../../../contexts/AuthFetchContext'
import { toast } from 'react-toastify'

import getNormalizedText from '../../../util/textNormalizer'
import TchimoHeader from '../../../components/TchimoHeader/TchimoHeader'
import TabbedMenu from '../../../components/TabbedMenu/TabbedMenu'
import GroupListPDF from '../../../components/GroupListPDF'

import CloudDownloadIcon from '@material-ui/icons/CloudDownload';
import PeopleIcon from '@material-ui/icons/People';
import SupervisedUserCircleIcon from '@material-ui/icons/SupervisedUserCircle';
import ListIcon from '@material-ui/icons/List';
import NotificationsActiveIcon from '@material-ui/icons/NotificationsActive';

import styles from './Pdf.module.css'

import Spinner from '../../../components/Spinner'

import '.././../../App.css'

function Classroom(props) {
    const [isLoaded, setLoaded] = useState(false)
    const [notFound, setNotFound] = useState(false)

    const [groups, setGroups] = useState([])
    const [classroomName, setClassroomName] = useState("")

    const { authFetch } = useContext(AuthFetchContext)

    const {code} = useParams()

    useEffect(() => {
      const fetchClassroom = async () => {
        try {
          const { data } = await authFetch.get(
            `turmas/${code}`
          )
          setClassroomName(data.name)
          setGroups(data.groups)
          setLoaded(true)
        } catch (error) {
          setNotFound(true)
          toast.error(`Ocorreu um erro ao procurar a sala.`, {
            autoClose: 2000
          })
        }
      }

      fetchClassroom()
    }, [])

    return (
        <>
          <TchimoHeader />

          { isLoaded ? 
            <>
              <p className="session">Listagem de grupos em PDF</p>

              <PDFDownloadLink 
                document={<GroupListPDF name={classroomName} groups={groups} />} 
                fileName={getNormalizedText(`tchimo-${classroomName}-${new Date().toLocaleDateString()}`)} 
                className={styles.pdfButton}>
                    {({ blob, url, loading, error }) => (loading ? <span><Spinner size="1em" color="white" /></span> : <span>DOWNLOAD</span>)}
              </PDFDownloadLink> 

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
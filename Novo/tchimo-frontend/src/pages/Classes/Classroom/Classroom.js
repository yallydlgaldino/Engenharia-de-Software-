import React, { useState, useEffect, useContext } from 'react'
import { useParams, Link } from "react-router-dom";
import { AuthFetchContext } from '../../../contexts/AuthFetchContext'
import { toast } from 'react-toastify'

import TchimoHeader from '../../../components/TchimoHeader/TchimoHeader'
import TabbedMenu from '../../../components/TabbedMenu/TabbedMenu'

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
    const [isLoaded, setLoaded] = useState(false)
    const [notFound, setNotFound] = useState(false)
    const [locked, setLocked] = useState(false)

    const [groups, setGroups] = useState([])
    const [membersWithoutGroup, setMembersWithoutGroup] = useState([])
    const [classroomName, setClassroomName] = useState("")
    const [endTimestamp, setEndTimestamp] = useState(0)
    const [formationStrategy, setFormationStrategy] = useState("")
    const [endingStrategy, setEndingStrategy] = useState("")

    const { authFetch } = useContext(AuthFetchContext)

    const {code} = useParams()

    useEffect(() => {
      const fetchClassroom = async (intervalId) => {
        try {
          const { data } = await authFetch.get(
            `turmas/${code}`
          )
          
          setClassroomName(data.name)
          setGroups(data.groups)
          setEndTimestamp(data.endDate)
          setFormationStrategy(data.formationStrategy)
          setEndingStrategy(data.endingStrategy)
          setMembersWithoutGroup(data.integrantesSemGrupo)
          setLocked(data.locked)

          setLoaded(true)
        } catch (error) {
          setNotFound(true)
          toast.error(`Ocorreu um erro ao procurar a sala.`, {
            autoClose: 2000
          })
          if (intervalId != null) {
            clearInterval(intervalId)
          }
        }
      }

      fetchClassroom()
      
      const intervalId = setInterval(async () => {
        fetchClassroom(intervalId)
      }, 5000)

      return () => clearInterval(intervalId)
    }, [code, classroomName, endTimestamp, formationStrategy, endingStrategy, JSON.stringify(groups), JSON.stringify(membersWithoutGroup)])

    const createGroup = async () => {
      try {
        await authFetch.post(
          `turmas/${code}/grupos`
        )
        toast.success("Grupo criado com sucesso.", {
          autoClose: 2000
        })
      } catch (error) {
        toast.error(`Ocorreu um erro ao criar grupo.`, {
          autoClose: 2000
        })
      }
    }

    const sendSolicitation = async (idTurma, idGrupo, idUser) => {
      try {
        await authFetch.post(
          `turmas/solicitations`, {
            id_turma: idTurma,
            id_group: idGrupo,
            type: "ENTRY-GROUP",
            id_user: idUser
          }
        )
        toast.success("Solicitação de participação enviada.", {
          autoClose: 2000
        })
      } catch (error) {
        toast.error(`Houve um erro ao solicitar.`, {
          autoClose: 2000
        })
      }
    }

    const sendLeave = async (idGrupo) => {
      console.log(idGrupo)
      try {
        await authFetch.delete(
          `turmas/${code}/grupos/${idGrupo}`
        )
        toast.success("Você saiu do grupo com sucesso.", {
          autoClose: 2000
        })
      } catch (error) {
        toast.error(`Houve um erro ao sair de grupo.`, {
          autoClose: 2000
        })
      }
    }

    const generateGroupsMarkup = (groupsArray) => groupsArray.map((group, index) => (
      <div className={styles.groupContainer} key={index}>
        <div className={styles.groupHeader}>
        <span className={styles.groupName}>Grupo {index + 1}</span>
        </div>
        <div className={styles.membersContainer}>
          { group.members.map((member, index) => (
              <span className={styles.memberName} id={member.id} key={index}> {index + 1}. {member.name} </span>
          )) }
        </div>
        <div className={styles.groupOptions}>
          { membersWithoutGroup.length != 0 && localStorage.getItem('idUser') != null && membersWithoutGroup.some(m => m.id == localStorage.getItem('idUser')) ? 
            <button className={styles.groupSolicitation} onClick={() => sendSolicitation(code, group.idGroup, localStorage.getItem('idUser'))}>
              Solicitar Participação
            </button> 
            :
            null
          }
          { group.members.some(m => m.id == localStorage.getItem('idUser')) ?
            <ConfirmationButton className={styles.groupSolicitation} action={() => sendLeave(group.idGroup)}>
              Sair de Grupo
            </ConfirmationButton>
            :
            null
          }
        </div>
      </div>
    ))
    
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
                    locked ? 'Encerrado' : 'Indeterminado'
                }</span>
                <Link to={`/classes/${code}/download`} className={styles.pdfButton}><CloudDownloadIcon /></Link>
              </div>
    
              <div className={styles.groupsContainer}>
                {generateGroupsMarkup(groups).length !== 0 ? 
                    generateGroupsMarkup(groups)
                    :
                    null
                }
    
                <button className="button" onClick={createGroup}>
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
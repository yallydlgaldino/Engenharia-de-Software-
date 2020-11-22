import React, { useContext, useState, useEffect } from 'react'
import { useParams } from "react-router-dom";
import { AuthFetchContext } from '../../../contexts/AuthFetchContext'
import { toast } from 'react-toastify'

import TchimoHeader from '../../../components/TchimoHeader/TchimoHeader'
import TabbedMenu from '../../../components/TabbedMenu/TabbedMenu'
import Spinner from '../../../components/Spinner'

import PeopleIcon from '@material-ui/icons/People';
import SupervisedUserCircleIcon from '@material-ui/icons/SupervisedUserCircle';
import ListIcon from '@material-ui/icons/List';
import NotificationsActiveIcon from '@material-ui/icons/NotificationsActive';
import EmailIcon from '@material-ui/icons/Email';

import '.././../../App.css'
import styles from './Members.module.css'

function Members(props) {

    const {code} = useParams()
    const { authFetch } = useContext(AuthFetchContext)

    const [notFound, setNotFound] = useState(false)
    const [allClassMembers, setAllClassMembers] = useState([])
    const [groups, setGroups] = useState([])
    const [membersWithoutGroup, setMembersWithoutGroup] = useState([])
    const [isLoaded, setLoaded] = useState(false)

    const userId = localStorage.getItem("idUser")

    useEffect(() => {
      const fetchMembers = async (intervalId) => {
        try {
          const { data } = await authFetch.get(
            `turmas/${code}`
          )
          
          setAllClassMembers(data.integrantes)
          setMembersWithoutGroup(data.integrantesSemGrupo)
          setGroups(data.groups)
          setLoaded(true)
        } catch (error) {
          setNotFound(true)
          toast.error(`Ocorreu um erro ao procurar membros.`, {
            autoClose: 2000
          })
          if (intervalId != null) {
            clearInterval(intervalId)
          }
        }
      }

      fetchMembers()
      
      const intervalId = setInterval(async () => {
        fetchMembers(intervalId)
      }, 5000)

      return () => clearInterval(intervalId)
    }, [code])

    const sendInvitation = async (idTurma, idGrupo, idUser) => {
      console.log(idTurma)
      console.log(idGrupo)
      console.log(idUser)
      try {
        await authFetch.post(
          `turmas/invite`, {
            id_user: idUser,
            id_turma: idTurma,
            id_group: idGrupo,
            type: "SEND-INVITATION"
          }
        )
        toast.success("Convite enviado.", {
          autoClose: 2000
        })
      } catch (error) {
        toast.error(`Houve um erro ao convidar integrante.`, {
          autoClose: 2000
        })
      }
    }

    const isManager = (userId, groups) => {
      let groupId = null
      groups.forEach(group => {
        if (group.idUserManager == userId) {
          groupId = group.idGroup
        }
      })
      return groupId
    } 

    const generateMembersMarkup = (membersArray) => membersArray.map((member, index) => (
      <div className={`${styles.memberContainer} ${ (membersWithoutGroup.some(m => m.id === member.id)) ? styles.active : ''}`} key={index}>
        <span className={styles.memberName}>{member.name}</span>
        { isManager(userId, groups) !== null && (membersWithoutGroup.some(m => m.id === member.id)) ?
          <button onClick={() => sendInvitation(code, isManager(userId, groups), member.id)}><EmailIcon /></button>
          :
          null
        }
      </div>
    ))

    return (
        <>
          <TchimoHeader />

          <p className="session">Membros da Turma</p>

          { isLoaded ? 
            <>
              <div className={styles.membersContainer}>
                {generateMembersMarkup(allClassMembers).length !== 0 ? 
                  generateMembersMarkup(allClassMembers) 
                  : 
                  null
                }
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
                  <p>Membros não encontrados :(</p>
                }
              </div>
              <TabbedMenu />
            </>
          }
        </>
    )
}

export default Members
import React, { useState, useEffect, useContext } from 'react'

import { useHistory } from "react-router-dom";

import PeopleIcon from '@material-ui/icons/People';
import SupervisedUserCircleIcon from '@material-ui/icons/SupervisedUserCircle';
import ListIcon from '@material-ui/icons/List';
import NotificationsActiveIcon from '@material-ui/icons/NotificationsActive';

import TchimoHeader from '../../components/TchimoHeader/TchimoHeader'
import TabbedMenu from '../../components/TabbedMenu/TabbedMenu'
import Spinner from '../../components/Spinner'

import { AuthFetchContext } from '../../contexts/AuthFetchContext'

import { toast } from 'react-toastify'

import '../../App.css'
import styles from './Notifications.module.css'

function Notifications() {

  const history = useHistory()

  const historyState = history.location.state

  const [notifications, setNotifications] = useState([])
  const [isLoaded, setLoaded] = useState(false)
  const [notFound, setNotFound] = useState(false)

  const { authFetch } = useContext(AuthFetchContext)

  useEffect(() => {
    const fetchNotifications = async (intervalId) => {
      try {
        const { data } = await authFetch.get(
          `usuarios/notifications`
        )
        
        setLoaded(true)
        setNotifications(data)

      } catch (error) {
        setNotFound(true)
        toast.error(`Ocorreu um erro ao procurar suas notificações.`, {
          autoClose: 2000
        })
        if (intervalId != null) {
          clearInterval(intervalId)
        }
      }
    }

    fetchNotifications()
    
    const intervalId = setInterval(async () => {
      fetchNotifications(intervalId)
    }, 5000)

    return () => clearInterval(intervalId)
  }, [])

  const sendResponse = async (idNotification, response) => {
    try {
      await authFetch.post(
        `turmas/response`, {
          id_notification: idNotification,
          procedure: response
        }
      )
      toast.success("Resposta enviada.", {
        autoClose: 2000
      })
    } catch (error) {
      toast.error(`Houve um erro ao responder a solicitação.`, {
        autoClose: 2000
      })
    }
  }

  const generateNotificationsMarkup = (notificationsArray) => notificationsArray.map((notification, index) => (
    <div className={styles.notificationContainer} key={index}>
      <span className={styles.text}>
        {notification.type == "ENTRY-GROUP" ? `${notification.user.name} te pediu para participar no seu grupo de ${notification.name_turma}` : null }
      </span>
      <div className={styles.options}> 
        <button className={`${styles.acceptButton} ${styles.option}`} onClick={() => sendResponse(notification.id, true)}>aceitar</button>
        <button className={`${styles.removeButton} ${styles.option}`} onClick={() => sendResponse(notification.id, false)}>remover</button>
      </div>
    </div>
  ))

  return (
    <>
      <TchimoHeader />

      <p className="session">Notificações</p>

      { isLoaded ? 
        <>
          <div className={styles.notificationsContainer}>
            {generateNotificationsMarkup(notifications).length !== 0 ? 
                generateNotificationsMarkup(notifications) 
                : 
                null
            }
          </div>

          { 
            (historyState == null || historyState.from.customData == null || historyState.from.customData.code == null) ?
              <TabbedMenu />
            :
              <TabbedMenu 
                customLinks={
                  [
                    {
                      url: '/classes',
                      icon: <PeopleIcon />,
                      label: 'Turmas'
                    },
                    {
                      url: `/classes/${historyState.from.customData.code}`,
                      icon: <SupervisedUserCircleIcon />,
                      label: 'Grupos'
                    },
                    {
                      url: `/classes/${historyState.from.customData.code}/members`,
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
          }
        </>
        :
        <>
          <div className={styles.transitionScreen}>
            { !notFound ? 
                <Spinner size={55} color='#316993' />
              :
                <p>Nenhuma notificação encontrada :(</p>
            }
          </div>
          <TabbedMenu />
        </>
      }
    </>
  )
}

export default Notifications
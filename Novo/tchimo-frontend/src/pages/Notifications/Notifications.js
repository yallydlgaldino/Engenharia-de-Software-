import React from 'react'

import { useHistory } from "react-router-dom";

import PeopleIcon from '@material-ui/icons/People';
import SupervisedUserCircleIcon from '@material-ui/icons/SupervisedUserCircle';
import ListIcon from '@material-ui/icons/List';
import NotificationsActiveIcon from '@material-ui/icons/NotificationsActive';

import TchimoHeader from '../../components/TchimoHeader/TchimoHeader'
import TabbedMenu from '../../components/TabbedMenu/TabbedMenu'
 
import '../../App.css'
import styles from './Notifications.module.css'

function Notifications() {

  const history = useHistory()

  const historyState = history.location.state

  return (
    <>
      <TchimoHeader />
      
      <p className="session">Notificações</p>
      
      <div className={styles.notificationsContainer}>
        <div className={styles.notificationContainer}>
          <span className={styles.text}>
            Você foi convidado pelo grupo 1 da sala de engenharia de software. 
          </span>
          <div className={styles.options}> 
            <button className={`${styles.acceptButton} ${styles.option}`}>aceitar</button>
            <button className={`${styles.removeButton} ${styles.option}`}>remover</button>
          </div>
        </div>

        <div className={styles.notificationContainer}>
          <span className={styles.text}>
            O grupo 2 de engenharia de software solicitou uma junção com o seu grupo. 
          </span>
          <div className={styles.options}> 
            <button className={`${styles.acceptButton} ${styles.option}`}>aceitar</button>
            <button className={`${styles.removeButton} ${styles.option}`}>remover</button>
          </div>
        </div>

        <div className={styles.notificationContainer}>
          <span className={styles.text}>
            O grupo 3 aceitou sua solicitação de participação. 
          </span>
        </div>
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
  )
}

export default Notifications
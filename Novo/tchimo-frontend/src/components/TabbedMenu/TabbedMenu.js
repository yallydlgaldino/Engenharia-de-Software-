import React, { useEffect } from 'react'

import { useHistory, useLocation } from "react-router-dom";

import PeopleIcon from '@material-ui/icons/People'
import AddCircleIcon from '@material-ui/icons/AddCircle'
import EmojiPeopleIcon from '@material-ui/icons/EmojiPeople'
import NotificationsActiveIcon from '@material-ui/icons/NotificationsActive';

import styles from './TabbedMenu.module.css'

function TabbedMenu(props) {

  const history = useHistory()
  const location = useLocation()

  const redirect = (path) => history.push(path)

  const isCurrentPath = (path) => location.pathname === path

  return (
      <ul className={styles.tabbedMenu}>
        <li 
          onClick={() => redirect('/classes')} 
          className={isCurrentPath('/classes') ? styles.selectedTab : null }
        >
          <PeopleIcon />
          <span>Turmas</span>
        </li>
        <li 
          onClick={() => redirect('/classes/register')} 
          className={isCurrentPath('/classes/register') ? styles.selectedTab : null }
        >
          <AddCircleIcon />
          <span>Criar Turma</span>
        </li>
        <li 
          onClick={() => redirect('/classes/join')} 
          className={isCurrentPath('/classes/join') ? styles.selectedTab : null }
        >
          <EmojiPeopleIcon />
          <span>Participar</span>
        </li>
        <li 
          onClick={() => redirect('/notifications')} 
          className={isCurrentPath('/notifications') ? styles.selectedTab : null }
        >
          <NotificationsActiveIcon /> 
          <span>Notificações</span>
        </li>
      </ul>
  )
}

export default TabbedMenu
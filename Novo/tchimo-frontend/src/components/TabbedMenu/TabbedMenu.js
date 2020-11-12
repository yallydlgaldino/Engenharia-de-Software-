import React from 'react'

import { useHistory, useLocation } from "react-router-dom";

import PeopleIcon from '@material-ui/icons/People'
import AddCircleIcon from '@material-ui/icons/AddCircle'
import EmojiPeopleIcon from '@material-ui/icons/EmojiPeople'
import NotificationsActiveIcon from '@material-ui/icons/NotificationsActive';

import styles from './TabbedMenu.module.css'

const defaultLinks = [
  {
    url: '/classes',
    icon: <PeopleIcon />,
    label: 'Turmas'
  },
  {
    url: '/classes/register',
    icon: <AddCircleIcon />,
    label: 'Criar Turma'
  },
  {
    url: '/classes/join',
    icon: <EmojiPeopleIcon />,
    label: 'Participar'
  },
  {
    url: '/notifications',
    icon: <NotificationsActiveIcon />,
    label: 'Notificações'
  }
]

function TabbedMenu(props) {

  const history = useHistory()
  const location = useLocation()

  const redirect = (path) => {
    history.push(
      path, 
      {
        from: (props.customLinks == null) ? 'default' : { customData: props.customData }
      }
    )
  }

  const isCurrentPath = (path) => location.pathname === path

  const generateLinksMarkup = (links) => (
    links.map((link, index) => (
      <li 
        onClick={() => redirect(link.url)} 
        className={isCurrentPath(link.url) ? styles.selectedTab : null }
        key={index}
      >
        {link.icon}
        <span>{link.label}</span>
      </li>
    ))
  )

  return (
      <ul className={styles.tabbedMenu}>
        { (props.customLinks == null) ? 
            generateLinksMarkup(defaultLinks)
          : 
            generateLinksMarkup(props.customLinks)
        }
      </ul>
  )
}

export default TabbedMenu
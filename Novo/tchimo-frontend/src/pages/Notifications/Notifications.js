import React from 'react'

import { useHistory } from "react-router-dom";

import PeopleIcon from '@material-ui/icons/People';
import SupervisedUserCircleIcon from '@material-ui/icons/SupervisedUserCircle';
import ListIcon from '@material-ui/icons/List';
import NotificationsActiveIcon from '@material-ui/icons/NotificationsActive';

import TchimoHeader from '../../components/TchimoHeader/TchimoHeader'
import TabbedMenu from '../../components/TabbedMenu/TabbedMenu'
 
function Notifications() {

  const history = useHistory()

  const historyCustomData = history.location.state.from.customData

  return (
    <>
      <TchimoHeader />
      
      <p>Notificações</p>
      
      { 
        (historyCustomData == null || historyCustomData.code == null) ?
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
                  url: `/classes/${historyCustomData.code}`,
                  icon: <SupervisedUserCircleIcon />,
                  label: 'Grupos'
                },
                {
                  url: `/classes/${historyCustomData.code}/members`,
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
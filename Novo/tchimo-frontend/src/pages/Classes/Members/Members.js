import React from 'react'
import { useParams } from "react-router-dom";

import TchimoHeader from '../../../components/TchimoHeader/TchimoHeader'
import TabbedMenu from '../../../components/TabbedMenu/TabbedMenu'

import PeopleIcon from '@material-ui/icons/People';
import SupervisedUserCircleIcon from '@material-ui/icons/SupervisedUserCircle';
import ListIcon from '@material-ui/icons/List';
import NotificationsActiveIcon from '@material-ui/icons/NotificationsActive';
import EmailIcon from '@material-ui/icons/Email';

import '.././../../App.css'
import styles from './Members.module.css'

function Members(props) {

    const {code} = useParams()

    return (
        <>
          <TchimoHeader />

          <p className="session">Membros da Turma</p>
          
          <div className={styles.membersContainer}>
            <div className={`${styles.memberContainer} ${styles.active}`}>
              <span className={styles.memberName}>Wesley Santos</span>
              <button><EmailIcon /></button>
            </div>

            <div className={`${styles.memberContainer} ${styles.active}`}>
              <span className={styles.memberName}>Gabriel Silva</span>
              <button><EmailIcon /></button>
            </div>

            <div className={`${styles.memberContainer} ${styles.invite}`}>
              <span className={styles.memberName}>Gustavo Mattos</span>
            </div>
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
    )
}

export default Members
import React from 'react'

import {Link} from 'react-router-dom'

import Logo from '../../static/images/logo.svg'
import EmojiPeopleIcon from '@material-ui/icons/EmojiPeople';
import PeopleIcon from '@material-ui/icons/People'
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos'

import styles from './Home.module.css'
import '../../App.css'

function Home() {
    return (
        <div className={styles.Home}>
            <div className={styles.logoContainer}>
                <img className={styles.logo} src={Logo} alt="Tchimo Logo" />
            </div>
            
            <div className={styles.introductionContainer}> 
                <p className={styles.introduction}> 
                    Bem vind@ à mais nova e rápida maneira de formar grupos! 
                </p>
            </div>
            
            <div className={styles.optionsContainer}> 
                <Link to={{ pathname: "/login", state: { nextRoute: '/classes/register' } }} className={`${styles.option} button`}>
                    <PeopleIcon />
                    <span>criar sala</span>
                    <ArrowForwardIosIcon />
                </Link>
                <Link to={{ pathname: "/login", state: { nextRoute: '/classes/join' } }} className={`${styles.option} button`}>
                    <EmojiPeopleIcon />
                    <span>participar</span>
                    <ArrowForwardIosIcon />
                </Link>
            </div>
        </div>
    )
}

export default Home
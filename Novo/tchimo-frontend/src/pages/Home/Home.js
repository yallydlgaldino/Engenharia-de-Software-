import React from 'react'

import {Link} from 'react-router-dom'

import Logo from '../../static/images/logo.svg'
import PeopleIcon from '../../static/images/people.svg'
import JoinIcon from '../../static/images/join.svg'
import ArrowIcon from '../../static/images/arrow.svg'

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
                <Link to="/login" className="button">
                    <img src={PeopleIcon} alt="People Icon" />
                    <span>criar sala</span>
                    <img src={ArrowIcon} alt="Arrow Icon" />
                </Link>
                <Link to="/login" className="button">
                    <img src={JoinIcon} alt="People Icon" />
                    <span>participar</span>
                    <img src={ArrowIcon} alt="Arrow Icon" />
                </Link>
            </div>
        </div>
    )
}

export default Home
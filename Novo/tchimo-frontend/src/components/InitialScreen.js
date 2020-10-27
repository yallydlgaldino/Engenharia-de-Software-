import React from 'react'

import Logo from '../static/images/logo.svg'
import PeopleIcon from '../static/images/people.svg'
import JoinIcon from '../static/images/join.svg'
import ArrowIcon from '../static/images/arrow.svg'

import styles from './InitialScreen.module.css'

function InitialScreen() {
    return (
        <div className={styles.initialScreen}>
            <div className={styles.logoContainer}>
                <img className={styles.logo} src={Logo} alt="Tchimo Logo" />
            </div>
            
            <div className={styles.introductionContainer}> 
                <p className={styles.introduction}> 
                    Bem vind@ à mais nova e rápida maneira de formar grupos! 
                </p>
            </div>
            
            <div className={styles.optionsContainer}> 
                <button className={styles.button}>
                    <img src={PeopleIcon} alt="People Icon" />
                    <span>criar sala</span>
                    <img src={ArrowIcon} alt="People Icon" />
                </button>
                <button className={styles.button}>
                    <img src={JoinIcon} alt="People Icon" />
                    <span>participar</span>
                    <img src={ArrowIcon} alt="People Icon" />
                </button>
            </div>
        </div>
    )
}

export default InitialScreen
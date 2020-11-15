import React, { useContext } from 'react'
import { AuthContext } from '../../contexts/AuthContext'
import { Link, useHistory } from 'react-router-dom'

import MiniLogo from '../../static/images/mini_logo.svg'

import styles from './TchimoHeader.module.css'

function TchimoHeader() {

    const history = useHistory()
    const { logout, isAuthenticated } = useContext(AuthContext)

    const logoutHandler = () => {
        logout()
        history.push('/login') 
    }

    return (
        <nav className={styles.Header}>
            <Link to="/" className={styles.Link}>
                <img src={MiniLogo} alt="Mini version of the logo" />
                <span>Tchimo</span>
            </Link>
            { isAuthenticated() ?
                <button className={styles.logoutBtn} onClick={() => logoutHandler()}>
                    sair
                </button>
                :
                null
            }
        </nav>
    )
}

export default TchimoHeader
import React from 'react'

import { Link } from 'react-router-dom'

import MiniLogo from '../../static/images/mini_logo.svg'

import styles from './TchimoHeader.module.css'

function TchimoHeader() {
    return (
        <nav className={styles.Header}>
            <Link to="/" className={styles.Link}>
                <img src={MiniLogo} alt="Mini version of the logo" />
                <span>Tchimo</span>
            </Link>
        </nav>
    )
}

export default TchimoHeader
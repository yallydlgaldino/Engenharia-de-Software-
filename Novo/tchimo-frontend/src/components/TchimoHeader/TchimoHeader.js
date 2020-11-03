import React from 'react'

import MiniLogo from '../../static/images/mini_logo.svg'

import styles from './TchimoHeader.module.css'

function TchimoHeader() {
    return (
        <nav className={styles.Header}>
            <img src={MiniLogo} alt="Mini version of the logo" />
            <span>Tchimo</span>
        </nav>
    )
}

export default TchimoHeader
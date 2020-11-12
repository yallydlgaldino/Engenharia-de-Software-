import React from 'react'
import TchimoHeader from '../../../components/TchimoHeader/TchimoHeader'
import TabbedMenu from '../../../components/TabbedMenu/TabbedMenu'

import '../../../App.css'
import styles from './List.module.css'

function List() {
    return (
        <>
            <TchimoHeader />
            <p className="session">Salas</p>

            <div className={styles.classesContainer}>
                <div className={styles.classContainer}>
                    <span className={styles.className}>Engenharia de Software</span>
                    <span className={styles.classCode}>CÓDIGO: 989347</span>
                    <span className={styles.classInfo}>22 membros - 2 grupos</span>
                    <div className={styles.classOptions}>
                        <span className={styles.classSolicitation}>
                            Sair da Turma
                        </span>
                    </div>
                </div>

                <div className={styles.classContainer}>
                    <span className={styles.className}>Engenharia de Software</span>
                    <span className={styles.classCode}>CÓDIGO: 989347</span>
                    <span className={styles.classInfo}>22 membros - 2 grupos</span>
                    <div className={styles.classOptions}>
                        <span className={styles.classSolicitation}>
                            Sair da Turma
                        </span>
                    </div>
                </div>

                <div className={styles.classContainer}>
                    <span className={styles.className}>Engenharia de Software</span>
                    <span className={styles.classCode}>CÓDIGO: 989347</span>
                    <span className={styles.classInfo}>22 membros - 2 grupos</span>
                    <div className={styles.classOptions}>
                        <span className={styles.classSolicitation}>
                            Sair da Turma
                        </span>
                    </div>
                </div>
            </div>

            <TabbedMenu />
        </>
    )
}

export default List
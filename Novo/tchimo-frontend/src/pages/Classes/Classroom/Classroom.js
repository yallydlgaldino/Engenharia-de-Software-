import React, { useState, useEffect } from 'react'
import { PDFDownloadLink } from '@react-pdf/renderer'

import getNormalizedText from '../../../util/text_normalizer'
import TchimoHeader from '../../../components/TchimoHeader/TchimoHeader'
import TabbedMenu from '../../../components/TabbedMenu/TabbedMenu'
import GroupListPDF from '../../../components/GroupListPDF'

import CloudDownloadIcon from '@material-ui/icons/CloudDownload';

import styles from './Classroom.module.css'

import Spinner from '../../../components/Spinner'

import '.././../../App.css'

function Classroom(props) {
    const [showDownloadLink, setHideDownloadLink] = useState(false)
    const [classroomData, setClassroomData] = useState({})

    useEffect(() => {
      setTimeout(() => {
        setClassroomData({
          name: 'Engenharia de Software',
          groups: [
            {
              name: 'Grupo 1',
              members: [
                'Wesley Santos',
                'Angela',
                'Caio Medeiros'
              ]
            },
            {
              name: 'Grupo 2',
              members: [
                'Wesley Santos',
              ]
            },
            {
              name: 'Grupo 3',
              members: [
                'Wesley Santos',
                'Ricardo',
                'Vinicius',
                'Gilmar',
                'Igor'
              ]
            },
            {
              name: 'Grupo 4',
              members: [
                'Wesley Santos',
                'Ricardo',
                'Vinicius',
                'Gilmar',
                'Igor'
              ]
            },
            {
              name: 'Grupo 5',
              members: [
                'Wesley Santos',
                'Ricardo',
                'Igor'
              ]
            },
            {
              name: 'Grupo 6',
              members: [
                'Wesley Santos',
                'Ricardo',
                'Vinicius',
                'Gilmar',
                'Wesley Santos',
                'Ricardo',
                'Vinicius',
                'Gilmar',
                'Wesley Santos',
                'Ricardo',
                'Vinicius',
                'Ricardo',
                'Vinicius',
                'Gilmar',
              ]
            }
          ]
        })
        setHideDownloadLink(true)
      }, 50)
    }, [])

    return (
        <>
          <TchimoHeader />

          <p className="session">Engenharia de Software</p>

          <div className={styles.header}>
            <span className={styles.timeUntilEnd}> PRAZO: 00:30:00</span>
            {showDownloadLink ?
              <PDFDownloadLink 
                document={<GroupListPDF data={classroomData} />} 
                fileName={getNormalizedText(`tchimo-${classroomData.name}-${new Date().toLocaleDateString()}`)} 
                className={styles.pdfButton}>
                  {({ blob, url, loading, error }) => (loading ? <span><Spinner size="1em" color="white" /></span> : <span><CloudDownloadIcon /></span>)}
              </PDFDownloadLink> : 
              <span className={styles.pdfButton}>
                <Spinner size="1em" color="white" />
              </span>
            }
          </div>

          <div className={styles.groupsContainer}>
            <div className={styles.groupContainer}>
              <div className={styles.groupHeader}>
                <span className={styles.groupName}>Grupo 1</span>
              </div>
              <div className={styles.membersContainer}>
                <span className={styles.memberName}> 1. Wesley Santos </span>
                <span className={styles.memberName}> 2. Angela </span>
              </div>
              <div className={styles.groupOptions}>
                <span className={styles.groupSolicitation}>
                  Solicitar Participação
                </span>
              </div>
            </div>

            <div className={styles.groupContainer}>
              <div className={styles.groupHeader}>
                <span className={styles.groupName}>Grupo 2</span>
              </div>
              <div className={styles.membersContainer}>
                <span className={styles.memberName}> 1. Wesley Santos </span>
                <span className={styles.memberName}> 2. Angela </span>
              </div>
              <div className={styles.groupOptions}>
                <span className={styles.groupSolicitation}>
                  Solicitar Participação
                </span>
              </div>
            </div>

            <div className={styles.groupContainer}>
              <div className={styles.groupHeader}>
                <span className={styles.groupName}>Grupo 3</span>
              </div>
              <div className={styles.membersContainer}>
                <span className={styles.memberName}> 1. Wesley Santos </span>
                <span className={styles.memberName}> 2. Angela </span>
              </div>
              <div className={styles.groupOptions}>
                <span className={styles.groupSolicitation}>
                  Solicitar Participação
                </span>
              </div>
            </div>
          </div>
          
          <TabbedMenu />
        </>
    )
}

export default Classroom
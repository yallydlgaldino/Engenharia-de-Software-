import React from 'react'
import { PDFDownloadLink } from '@react-pdf/renderer'

import MyDocument from '../../../components/MyDocument'

function Classroom(props) {
    return (
        <PDFDownloadLink document={<MyDocument />} fileName="groups.pdf">
            {({ blob, url, loading, error }) => (loading ? 'Loading document...' : 'Download now!')}
        </PDFDownloadLink>
    )
}

export default Classroom
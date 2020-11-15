import React, { useState } from 'react'

import styles from './ConfirmationButton.module.css'

const ConfirmationButton = (props) => {
  
  const [ready, setReadyState] = useState(false)

  const confirm = () => {
    if (ready) {
        props.action()
    } else {
        setReadyState(true)
        setTimeout(() => setReadyState(false), 1500)
    }
  };

  return (
    <button className={ready ? `${props.className} ${styles.confirm} ${styles.default}` : `${styles.default} ${props.className}`} onClick={() => confirm()}>
      { ready ? 'Clique para confirmar': <>{props.children}</> }
    </button>
  );
};

export default ConfirmationButton;
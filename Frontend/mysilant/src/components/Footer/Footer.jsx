import React from 'react'
import styles from './Footer.module.scss'
import Contacts from '../Header/Contacts/Contacts'

export default function Footer() {
  return (
    <div className={styles.footer}>
        <Contacts/>
        <div className={styles.copyright}>&copy; &laquo;Мой Силант&raquo; 2023</div>
    </div>
  )
}

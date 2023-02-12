import React from 'react'
import styles from './Contacts.module.css'
import telegram_logo from './telegram-logo.svg'

export default function Contacts() {
  return (
    <div className={styles.contacts}>
        <a href="tel:+78152201209">+7-8152-20-12-09</a>
        <a href="https://t.me/+78152201209" target="_blank" rel="noreferrer">
            <img src={telegram_logo} alt="Telegram" className={styles.telegram_logo}/>
        </a>
    </div>
  )
}

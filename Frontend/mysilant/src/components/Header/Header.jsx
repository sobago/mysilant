import React from 'react'
import styles from './Header.module.scss'

import Login from './Login/Login';
import Logo from './Logo/Logo';
import Contacts from './Contacts/Contacts';

export default function Header(props) {
  return (
    <header className={styles.header}>
        <div className={styles.header_up}>
            <Logo/>
            <Contacts/>
            <Login
              isLoggedIn={props.isLoggedIn}
              setIsLoggedIn={props.setIsLoggedIn}
              userGroup={props.userGroup}
              setUserGroup={props.setUserGroup}
            />
        </div>
        <div className={styles.header_bottom}>
            <h1>Электронная сервисная книжка &laquo;Мой Силант&raquo;</h1>
        </div>
        
    </header>
  )
}

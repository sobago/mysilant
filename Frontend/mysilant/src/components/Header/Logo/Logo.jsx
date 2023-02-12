import React from 'react';
import styles from './Logo.module.scss';
import logo_accent from './Logotype_accent.svg';
import logo from './Logotype.svg';

export default function Logo() {
  return (
    <div className={styles.logo}>
        <img src={logo_accent} alt="" className={styles.logo_accent}/>
        <img src={logo} alt="" className={styles.logo_img}/>
    </div>
  )
}

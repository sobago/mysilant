import styles from './DirDescription.module.scss'
import React from 'react'
import { useEffect, useState } from 'react';

export default function DirDescription(props) {
    const {dirID, directory} = props
    const [obj, setObj] = useState({})
    
    useEffect(() => {
      if (directory && dirID) {
        setObj(directory.find(obj => obj.id === +dirID))
      }
    }, [dirID, directory])
    
  return (
    <>
        {obj.description && <span className={styles.description}>{obj['description']}</span>}
    </>
  )
}
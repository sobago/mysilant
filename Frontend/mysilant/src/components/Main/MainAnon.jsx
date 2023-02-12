import React from 'react'
import styles from './MainAnon.module.scss'
import { useState } from 'react'

function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
  }

export default function Main_anon () {
    const [loading, setLoading] = useState(false)
    const [formMachineNumber, setFormMachineNumber] = useState('')
    const [machineInfo, setMachineInfo] = useState()
    const [error, setError] = useState('')
    const csrftoken = getCookie('csrftoken')

    const submitHandler = e => {
        e.preventDefault();
        setLoading(true);
        fetch(
            'http://localhost:8000/api/get_machine_id/',
            {
              method: 'post',
              headers: {
                'Content-Type': 'application/json;charset=utf-8',
                'X-CSRFToken': csrftoken,
              },
              body: JSON.stringify({
                machine_number: formMachineNumber,
              }),
              credentials: 'include',
            }
        )
        .then(response => {
          if (response.ok) {
            return response.json()
          } else {
            setMachineInfo(null)
            throw Error(`${response.status} ${response.statusText}`)
          }
        })
        .then((res) => {
          setMachineInfo(res)
          setError(null)
        })
        .catch(err => {
          setError(`${err}`)
          console.log(err);
        })
        .finally(setLoading(false))
    }

  return (
    <main className={styles.main}>
        <h3>Проверьте комплектацию и технические характеристики техники Силант:</h3>
        <form onSubmit={submitHandler}>
            <input type="text"
            name="machine_number"
            placeholder='Серийный номер машины'
            value={formMachineNumber}
            onChange={e => setFormMachineNumber(e.target.value)} />
            <input type="submit" value="Поиск" />
        </form>
        {loading ? <p>Загрузка...</p> : null}
        {error ? 
          error === 'Error: 404 Not Found' ?
            <p className={styles.error_message}>Машина не найдена</p> :
          <p className={styles.error_message}>{error}</p> 
          : null}
        {!error && machineInfo ?
          <ul>
            <li>Модель машины: {machineInfo.data.machine_model.title}</li>
            {machineInfo.data.machine_model.description ? 
              <li className={styles.description}>{machineInfo.data.machine_model.description}</li>
            : null}
            <li className={styles.mb10}>Серийный номер: {machineInfo.data.machine_number}</li>
            <li>Модель двигателя: {machineInfo.data.engine_model.title}</li>
            {machineInfo.data.engine_model.description ? 
              <li className={styles.description}>{machineInfo.data.engine_model.description}</li>
            : null}
            <li className={styles.mb10}>Серийный номер двигателя: {machineInfo.data.engine_number}</li>
            <li>Модель трансмиссии: {machineInfo.data.transmission_model.title}</li>
            {machineInfo.data.transmission_model.description ? 
              <li className={styles.description}>{machineInfo.data.transmission_model.description}</li>
            : null}
            <li className={styles.mb10}>Серийный номер трансмиссии: {machineInfo.data.transmission_number}</li>
            <li>Модель управляемого моста: {machineInfo.data.steer_axle_model.title}</li>
            {machineInfo.data.steer_axle_model.description ? 
              <li className={styles.description}>{machineInfo.data.steer_axle_model.description}</li>
            : null}
            <li className={styles.mb10}>Серийный номер правляемого моста: {machineInfo.data.steer_axle_number}</li>
            <li>Модель ведущего моста: {machineInfo.data.drive_axle_model.title}</li>
            {machineInfo.data.drive_axle_model.description ? 
              <li className={styles.description}>{machineInfo.data.drive_axle_model.description}</li>
            : null}
            <li>Серийный номер ведущего моста: {machineInfo.data.drive_axle_number}</li>
           </ul>
          : null}
    </main>
  )
}

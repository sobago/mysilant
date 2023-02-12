import styles from './MachineDetail.module.scss'
import React, { useState } from 'react'

import MachineDetailGeneral from './MachineDetailGeneral/MachineDetailGeneral';
import MachineTO from './MachineTO/MachineTO';
import MachineComplaints from './MachineComplaints/MachineComplaints';


export default function MachineDetail(props) {
  const {directory, userGroup, users, setMachinePage, machineProp, machines} = props
  const [machinedetail_page, setMachinedetail_page] = useState('general')

  return (
    <div className={styles.detail}>
    {machinedetail_page === 'general' ? 
        <h3>Информация о комплектации и технических характеристиках:</h3>
    : null}
    {machinedetail_page === 'tos' ? 
        <h3>Информация о проведенных ТО:</h3>
    : null}
    {machinedetail_page === 'complaints' ? 
        <h3>Информация о рекламациях:</h3>
    : null}
    
    <div className={styles.general_info}>
        <div className={styles.machine}>Машина: {directory.find(item => item.id === machineProp.machine_model).title}</div>
        <div className={styles.serial}>Заводской номер: {machineProp.machine_number}</div>
        <button type="button" className={styles.close_button} title="Закрыть" onClick={(e) => {e.preventDefault(); setMachinePage('machine_list')}}>X</button>
    </div>
    <div className={styles.tabs}>
        <button onClick={e => {e.preventDefault(); setMachinedetail_page('general')}}>Общая информация</button>
        <button onClick={e => {e.preventDefault(); setMachinedetail_page('tos')}}>Техническое обслуживание</button>
        <button onClick={e => {e.preventDefault(); setMachinedetail_page('complaints')}}>Рекламации</button>
    </div>
    {machinedetail_page === 'tos' ? 
      <>
        <MachineTO directory={directory}
        users={users}
        machineProp={machineProp}
        machines={machines}/>
      </>
        : null}
    {machinedetail_page === 'complaints' ? 
        <MachineComplaints directory={directory}
        users={users}
        machineProp={machineProp}
        machines={machines}
        userGroup={userGroup}/>
        : null}
    {machinedetail_page === 'general' ? 
        <MachineDetailGeneral directory={directory}
        userGroup={userGroup}
        users={users}
        machineProp={machineProp}/>
    : null}
        
    </div>
    
  )
}


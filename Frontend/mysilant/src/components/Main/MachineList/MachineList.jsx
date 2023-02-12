import styles from './MachineList.module.scss'
import React, { useState, Suspense } from 'react'
import MachineFilter from './MachineFilter/MachineFilter'

const MachineDetail = React.lazy(() => import('./MachineDetail/MachineDetail'));


function getCookie(name) {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(';').shift();
}

export default function MachineList(props) {
  const [machinePage, setMachinePage] = useState('machine_list')
  const [machineDetail, setMachineDetail] = useState({})
  const {directory, userGroup, users, setFilters, setUpdateList, loading, fetchError, setFetchError, updateList, machines} = props
  const csrftoken = getCookie('csrftoken')
  

  const machineDetailHandler = (e, machine) => {
    e.preventDefault();
    setMachineDetail(machine);
    setMachinePage('machine_detail');
  }

  const machineDeleteHandler = (e, machine_number) => {
    e.preventDefault();
    if (window.confirm(`Вы уверены, что хотите удалить машину ${machine_number}?`)) {
      fetch(`http://localhost:8000/api/machines/${e.target.value}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            'X-CSRFToken': csrftoken,
        },
        credentials: 'include',
        }
    )
    .then(response => {
        if (response.ok) {
            return response
        } else {
            throw Error(`${response.status} ${response.statusText}`)
        }
    })
    .then(data => {
      setFetchError('');
      setUpdateList(updateList + 1)
    })
    .catch(error => {
      setFetchError(`Произошла ошибка. ${error}`);
      console.log(error)
    });
    }
    
  }

  return (
  <>
  {machinePage === 'machine_list' ?
    <>
      <MachineFilter setFilters={setFilters}/>
      <div className={styles.before_table}>
        <div className={styles.counter}>Всего: {machines.length}</div>
        {!!fetchError ? <div className={styles.error}>{fetchError}</div> : null}
      </div>
      
      <div className={styles.table_container}>
      <table className={styles.table_machines}>
          <thead>
          <tr>
              <th>Модель</th>
              <th>Зав. № машины</th>
              <th>Модель двигателя</th>
              <th>Зав. № двигателя</th>
              <th>Модель трансмиссии</th>
              <th>Зав. № трансмиссии</th>
              <th>Модель управляемого моста</th>
              <th>Зав. № управляемого моста</th>
              <th>Модель ведущего моста</th>
              <th>Зав. № ведущего моста</th>
              <th>Дата отгрузки c завода</th>
              <th>Покупатель</th>
              <th>Грузополучатель</th>
              <th>Адрес поставки (эксплуатации)</th>
              <th>Комплектация (доп. опции)</th>
              <th>Сервисная компания</th>
              {userGroup === 'Менеджер'?
                <th>X</th> : null}
          </tr>
          </thead>
          {loading ? 
                <tbody>
                    <tr><td colSpan={10}>Загрузка...</td></tr>
                </tbody>
            :
          <tbody>
          {!!machines.length > 0 && Object.entries(users).length > 0 && Object.entries(directory).length > 0? 
            machines.map(item => (
              <tr key={item.id}>
                  <td onClick={(e) => machineDetailHandler(e, item)}>
                    {directory.find(obj => obj.id === item.machine_model).title}</td>
                  <td onClick={(e) => machineDetailHandler(e, item)}>
                    {item.machine_number}</td>
                  <td onClick={(e) => machineDetailHandler(e, item)}>
                    {directory.find(obj => obj.id === item.engine_model).title}</td>
                  <td onClick={(e) => machineDetailHandler(e, item)}>
                    {item.engine_number}</td>
                  <td onClick={(e) => machineDetailHandler(e, item)}>
                    {directory.find(obj => obj.id === item.transmission_model).title}</td>
                  <td onClick={(e) => machineDetailHandler(e, item)}>
                    {item.transmission_number}</td>
                  <td onClick={(e) => machineDetailHandler(e, item)}>
                    {directory.find(obj => obj.id === item.steer_axle_model).title}</td>
                  <td onClick={(e) => machineDetailHandler(e, item)}>
                    {item.steer_axle_number}</td>
                  <td onClick={(e) => machineDetailHandler(e, item)}>
                    {directory.find(obj => obj.id === item.drive_axle_model).title}</td>
                  <td onClick={(e) => machineDetailHandler(e, item)}>
                    {item.drive_axle_number}</td>
                  <td onClick={(e) => machineDetailHandler(e, item)}>
                    {new Date(item.shipping_date).toLocaleDateString()}</td>
                  <td onClick={(e) => machineDetailHandler(e, item)}>
                    {users.find(obj => obj.id === item.customer).first_name}</td>
                  <td onClick={(e) => machineDetailHandler(e, item)}>
                    {item.consignee}</td>
                  <td onClick={(e) => machineDetailHandler(e, item)}>
                    {item.delivery_address}</td>
                  <td className={styles.additional} onClick={(e) => machineDetailHandler(e, item)}>
                    {item.additional}</td>
                  <td onClick={(e) => machineDetailHandler(e, item)}>
                    {users.find(obj => obj.id === item.service_center).first_name}</td>
                  {userGroup === 'Менеджер'?
                    <td>
                      <button type='button'
                              className={styles.delete_button}
                              value={item.id}
                              title='Удалить'
                              onClick={e => machineDeleteHandler(e, item.machine_number)}>x</button>
                    </td> : null}
              </tr>
            ))
            : <tr><td colSpan={10}>Машины не найдены</td></tr>}
          </tbody>
          }
      </table>
      </div>
    </>
    : null}
    {machinePage === 'machine_detail' ? 
    <Suspense>
      <MachineDetail setMachinePage={setMachinePage}
      machineProp={machineDetail}
      directory={directory}
      userGroup={props.userGroup}
      users={users}
      machines={machines}/>
    </Suspense>
    : null}
  </>
  )
}

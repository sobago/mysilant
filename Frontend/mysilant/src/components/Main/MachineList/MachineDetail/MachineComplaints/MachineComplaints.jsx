import styles from './MachineComplaints.module.scss';
import React, { useState, useEffect } from 'react';
import ComplaintsDetail from '../../../Manage/AllComplaints/ComplaintsDetail/ComplaintsDetail';


export default function MachineComplaints(props) {
    const {directory, users, machineProp, machines, userGroup} = props
    const [complaintsList, setComplaintsList] = useState({})
    const [fetchError, setFetchError] = useState('')
    const [loading, setLoading] = useState(false)
    const [complaintsPage, setComplaintsPage] = useState('complaints_list');
    const [complaintDetailItem, setComplaintDetailItem] = useState({});
    const [updateList, setUpdateList] = useState(0);

    useEffect(() => {
        setLoading(true);
        fetch(
            `http://localhost:8000/api/complaints/?machine=${machineProp.machine_number}`,
            {
                headers: {
                    'Content-Type': 'application/json;charset=utf-8',
                },
                credentials: 'include',
            }
        )
        .then(response => {
            if (response.ok) {
                return response.json()
            } else {
                throw Error(`${response.status} ${response.statusText}`)
            }
        })
        .then(resp => {
            setComplaintsList(resp);
            setFetchError('');
            setLoading(false);
        })
        .catch(error => {
            setFetchError(`Произошла ошибка. ${error}`);
            console.log(error);
            setLoading(false);
        })
    }, [machineProp]);

    const complaintDetailHandler = (e, item) => {
        e.preventDefault();
        setComplaintDetailItem(item);
        setComplaintsPage('complaints_detail');
      };


    const complaintCreateHandler = (e, item) => {
        e.preventDefault();
        setComplaintDetailItem(item);
        setComplaintsPage('complaints_create');
      };

  return (
    <div className={styles.machine_complaints}>
        {complaintsPage === 'complaints_create' ? 
        <ComplaintsDetail directory={directory}
        complaintDetailItem={{
          id: 0,
          date: (new Date()).toISOString().split('T')[0],
          description: "",
          downtime:0,
          duration:0,
          machine_number: "",
          spares: "",
          machine: complaintDetailItem.id,
          recovery_method: 0,
          recovery_date: (new Date()).toISOString().split('T')[0],
          service_center: 0,
          unit: 0,
        }}
        users={users}
        machines={machines}
        setComplaintsPage={setComplaintsPage}
        complaintsPage={complaintsPage}
        setUpdateList={setUpdateList}
        />
      :null}
      {complaintsPage === 'complaints_detail' ? 
        <ComplaintsDetail directory={directory}
          complaintDetailItem={complaintDetailItem}
          userGroup={userGroup}
          users={users}
          machines={machines}
          setComplaintsPage={setComplaintsPage}
          complaintsPage={complaintsPage}
          setUpdateList={setUpdateList}
          updateList={updateList}
          />
      :null}
      {complaintsPage === 'complaints_list'? <>
      {userGroup === 'Менеджер' || userGroup === 'Сервисная организация' ?
        <button type='button'
            className={styles.add_btn}
            onClick={e => complaintCreateHandler(e, machineProp)}>
            + Добавить рекламацию
        </button>
      :null}
      <div className={styles.table_container}>
        <table className={styles.table_complaints}>
            <thead>
                <tr>
                    <th>Дата отказа</th>
                    <th>Узел отказа</th>
                    <th>Описание отказа</th>
                    <th>Способ восстановления</th>
                    <th>Используемые запчасти</th>
                    <th>Дата восстановления</th>
                    <th>Время простоя техники</th>
                    <th>Наработка, м/час</th>
                </tr>
            </thead>
            {loading ? 
                <tbody>
                    <tr><td colSpan={7}>Загрузка...</td></tr>
                </tbody>
            :
            <tbody>
                {complaintsList.length > 0 && Object.entries(users).length > 0 && Object.entries(directory).length > 0 ? 
                    complaintsList.map(item => (
                        <tr key={item.id}>
                            {userGroup === 'Менеджер' || userGroup === 'Сервисная организация' ? <>
                            <td className={styles.active} onClick={e => complaintDetailHandler(e, item)}>
                                {new Date(item.date).toLocaleDateString()}
                            </td>
                            <td className={styles.active} onClick={e => complaintDetailHandler(e, item)}
                                title={directory.find(obj => obj.id === item.unit).description}>
                                {directory.find(obj => obj.id === item.unit).title}
                            </td>
                            <td className={styles.active} onClick={e => complaintDetailHandler(e, item)}>{item.description}</td>
                            <td className={styles.active} onClick={e => complaintDetailHandler(e, item)}
                                title={directory.find(obj => obj.id === item.recovery_method).description}>
                                {directory.find(obj => obj.id === item.recovery_method).title}
                            </td>
                            <td className={styles.active} onClick={e => complaintDetailHandler(e, item)}>{item.spares}</td>
                            <td className={styles.active} onClick={e => complaintDetailHandler(e, item)}>{new Date(item.recovery_date).toLocaleDateString()}</td>
                            <td className={styles.active} onClick={e => complaintDetailHandler(e, item)}>{item.downtime}</td>
                            <td className={styles.active} onClick={e => complaintDetailHandler(e, item)}>{item.duration}</td>
                            </>:<>
                            <td>{new Date(item.date).toLocaleDateString()}</td>
                            <td title={directory.find(obj => obj.id === item.unit).description}>
                                {directory.find(obj => obj.id === item.unit).title}
                            </td>
                            <td>{item.description}</td>
                            <td title={directory.find(obj => obj.id === item.recovery_method).description}>
                                {directory.find(obj => obj.id === item.recovery_method).title}
                            </td>
                            <td>{item.spares}</td>
                            <td>{new Date(item.recovery_date).toLocaleDateString()}</td>
                            <td>{item.downtime}</td>
                            <td>{item.duration}</td>
                            </>}
                            
                            
                            
                            
                        </tr>
                    ))
                : <tr><td colSpan={8}>Рекламации не найдены</td></tr>}
                {!!fetchError ? 
                    <tr><td colSpan={7} className={styles.error_message}>{fetchError}</td></tr>
                : null}
            </tbody>
            }
        </table>
        </div>
      </>: null}
    </div>
  )
}

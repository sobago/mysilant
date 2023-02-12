import styles from './AllComplaints.module.scss';
import React, { useState, useEffect } from 'react';
import ComplaintsFilter from './ComplaintsFilter/ComplaintsFilter';
import ComplaintsDetail from './ComplaintsDetail/ComplaintsDetail';
import { sortData } from '../../../../helpers';

export default function AllTO(props) {
    const {directory, users, userGroup, machines} = props;
    const [complaintsList, setComplaintsList] = useState({});
    const [fetchError, setFetchError] = useState('');
    const [loading, setLoading] = useState(false);
    const [filters, setFilters] = useState('');
    const [complaintsPage, setComplaintsPage] = useState('complaints_list');
    const [complaintDetailItem, setComplaintDetailItem] = useState({});
    const [updateList, setUpdateList] = useState(0);

    useEffect(() => {
        setLoading(true);
        fetch(
            `http://localhost:8000/api/complaints/${filters}`,
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
    }, [filters, updateList]);

    const complaintDetailHandler = (e, item) => {
      e.preventDefault();
      setComplaintDetailItem(item);
      setComplaintsPage('complaints_detail');
    };

    const [objectDirection]= useState({})
    const sortingTable = (field) => {

        if (objectDirection.hasOwnProperty(field)) {
        objectDirection[field] = !objectDirection[field];
        sortData(field, complaintsList, setComplaintsList, directory, objectDirection[field] === true ? "increase" : "decrease")
        } else {
        objectDirection[field] = true;
        sortData(field, complaintsList, setComplaintsList, directory, objectDirection[field] === true ? "increase" : "decrease")
        }
    }

  return (
    <div className={styles.machine_to}>
      {complaintsPage === 'complaints_create' ? 
        <ComplaintsDetail directory={directory}
        complaintDetailItem={{
          date: (new Date()).toISOString().split('T')[0],
          description: "",
          downtime:0,
          duration:0,
          machine_number: "",
          spares: "",
          machine: 0,
          recovery_method: 0,
          recovery_date: (new Date()).toISOString().split('T')[0],
          service_center: 0,
          unit: 0,
        }}
        userGroup={userGroup}
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
      <button type='button'
        className={styles.add_btn}
        onClick={e => {e.preventDefault(); setComplaintsPage('complaints_create')}}>
          + Добавить рекламацию
      </button>
      <ComplaintsFilter setFilters={setFilters}/>
      <div className={styles.table_container}>
        <table className={styles.table_to}>
            <thead>
                <tr>
                    <th onClick={() => sortingTable('date')}>Дата отказа</th>
                    <th onClick={() => sortingTable('machine_number')}>Зав. № машины</th>
                    <th onClick={() => sortingTable('unit')}>Узел отказа</th>
                    <th>Описание отказа</th>
                    <th onClick={() => sortingTable('recovery_method')}>Способ восстановления</th>
                    <th>Используемые запасные части</th>
                    <th onClick={() => sortingTable('recovery_date')}>Дата восстановления</th>
                    <th onClick={() => sortingTable('downtime')}>Время простоя техники</th>
                    <th onClick={() => sortingTable('duration')}>Наработка, м/час</th>
                    <th>Сервисная организация</th>
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
                            <td onClick={e => complaintDetailHandler(e, item)}>
                                {new Date(item.date).toLocaleDateString()}
                            </td>
                            <td onClick={e => complaintDetailHandler(e, item)}>
                                {item.machine_number}
                            </td>
                            <td onClick={e => complaintDetailHandler(e, item)}>
                                {directory.find(obj => obj.id === item.unit).title}
                            </td>
                            <td onClick={e => complaintDetailHandler(e, item)}>
                                {item.description}
                            </td>
                            <td onClick={e => complaintDetailHandler(e, item)}>
                                {directory.find(obj => obj.id === item.recovery_method).title}
                            </td>
                            <td onClick={e => complaintDetailHandler(e, item)}>
                                {item.spares}
                            </td>
                            <td onClick={e => complaintDetailHandler(e, item)}>
                                {new Date(item.recovery_date).toLocaleDateString()}
                            </td>
                            <td onClick={e => complaintDetailHandler(e, item)}>
                                {item.downtime}                            </td>
                            <td onClick={e => complaintDetailHandler(e, item)}>
                                {item.duration}
                            </td>
                            <td onClick={e => complaintDetailHandler(e, item)}>
                                {users.find(obj => obj.id === item.service_center).first_name}
                            </td>
                        </tr>
                    ))
                : 
                    <tr><td colSpan={7}>ТО не найдены</td></tr>
                }
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

import styles from './AllTO.module.scss';
import React, { useState, useEffect } from 'react';
import TOFilter from './TOFilter/TOFilter';
import TODetail from './TODetail/TODetail';
import { sortData } from '../../../../helpers';

export default function AllTO(props) {
    const {directory, users, userGroup, machines} = props;
    const [toList, setToList] = useState({});
    const [fetchError, setFetchError] = useState('');
    const [loading, setLoading] = useState(false);
    const [filters, setFilters] = useState('');
    const [toPage, setToPage] = useState('to_list');
    const [toDetailItem, setToDetailItem] = useState({});
    const [updateList, setUpdateList] = useState(0);

    useEffect(() => {
        setLoading(true);
        fetch(
            `http://localhost:8000/api/to/${filters}`,
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
            setToList(resp);
            setFetchError('');
            setLoading(false);
        })
        .catch(error => {
            setFetchError(`Произошла ошибка. ${error}`);
            console.log(error);
            setLoading(false);
        })
    }, [filters, updateList]);

    const toDetailHandler = (e, item) => {
      e.preventDefault();
      setToDetailItem(item);
      setToPage('to_detail');
    };

    const [objectDirection]= useState({})
    const sortingTable = (field) => {

        if (objectDirection.hasOwnProperty(field)) {
        objectDirection[field] = !objectDirection[field];
        sortData(field, toList, setToList, directory, objectDirection[field] === true ? "increase" : "decrease")
        } else {
        objectDirection[field] = true;
        sortData(field, toList, setToList, directory, objectDirection[field] === true ? "increase" : "decrease")
        }
    }

  return (
    <div className={styles.machine_to}>
      {toPage === 'to_create' ? 
        <TODetail directory={directory}
        toProp={{
          date: (new Date()).toISOString().split('T')[0],
          duration: 0,
          id:0,
          machine:0,
          machine_number: "",
          order: "",
          order_date: (new Date()).toISOString().split('T')[0],
          service_center: 0,
          service_type: 0,
        }}
        userGroup={userGroup}
        users={users}
        machines={machines}
        setToPage={setToPage}
        toPage={toPage}
        updateList={updateList}
        setUpdateList={setUpdateList}
        />
      :null}
      {toPage === 'to_detail' ? 
        <TODetail directory={directory}
          toProp={toDetailItem}
          userGroup={userGroup}
          users={users}
          machines={machines}
          setToPage={setToPage}
          toPage={toPage}
          setUpdateList={setUpdateList}
          updateList={updateList}
          />
      :null}
      {toPage === 'to_list'? <>
      <button type='button'
        className={styles.add_btn}
        onClick={e => {e.preventDefault(); setToPage('to_create')}}>
          + Добавить ТО
      </button>
      <TOFilter setFilters={setFilters}/>
      <div className={styles.table_container}>
        <table className={styles.table_to}>
            <thead>
                <tr>
                    <th onClick={() => sortingTable('order_date')}>Дата заказ-наряда</th>
                    <th onClick={() => sortingTable('order')}>№ заказ-наряда</th>
                    <th onClick={() => sortingTable('machine_number')}>Зав. № машины</th>
                    <th onClick={() => sortingTable('service_type')}>Вид ТО</th>
                    <th onClick={() => sortingTable('date')}>Дата проведения ТО</th>
                    <th onClick={() => sortingTable('duration')}>Наработка, м/час</th>
                    <th>Организация, проводившая ТО</th>
                </tr>
            </thead>
            {loading ? 
                <tbody>
                    <tr><td colSpan={7}>Загрузка...</td></tr>
                </tbody>
            :
            <tbody>
                {toList.length > 0 && Object.entries(users).length > 0 && Object.entries(directory).length > 0 ? 
                    toList.map(item => (
                        <tr key={item.id}>
                            <td onClick={e => toDetailHandler(e, item)}>{new Date(item.order_date).toLocaleDateString()}</td>
                            <td onClick={e => toDetailHandler(e, item)}>{item.order}</td>
                            <td onClick={e => toDetailHandler(e, item)}>{item.machine_number}</td>
                            <td onClick={e => toDetailHandler(e, item)}>{directory.find(obj => obj.id === item.service_type).title}</td>
                            <td onClick={e => toDetailHandler(e, item)}>{new Date(item.date).toLocaleDateString()}</td>
                            <td onClick={e => toDetailHandler(e, item)}>{item.duration}</td>
                            <td onClick={e => toDetailHandler(e, item)}>{users.find(obj => obj.id === item.service_center).first_name}</td>
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

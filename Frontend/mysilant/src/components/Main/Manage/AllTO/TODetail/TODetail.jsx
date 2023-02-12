import styles from './TODetail.module.scss';
import React, { useState, useEffect } from 'react'
import DirDescription from '../TODetail/DirDescription/DirDescription'

function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
  }

export default function TODetail(props) {
    const {directory,
        users,
        toProp,
        machines,
        setToPage,
        toPage,
        setUpdateList,
        updateList
    } = props
    const [toItem, setToItem] = useState({})
    const [toID, setToID] = useState()
    const [toDate, setToDate] = useState('')
    const [toDuration, setToDuration] = useState(0)
    const [toOrder, setToOrder] = useState('')
    const [toOrderDate, setToOrderDate] = useState('')
    const [machine, setMachine] = useState()
    const [serviceType, setServiceType] = useState()
    const [serviceCenter, setServiceCenter] = useState(0)
    const [fetchStatus, setFetchStatus] = useState({})
    const [loading, setLoading] = useState(false)
    const csrftoken = getCookie('csrftoken')
    
    useEffect(() => {
      if (toProp.hasOwnProperty('id')) {
        setToItem({...toProp});
      };
    }, [toProp]);

    useEffect(() => {
      if (toItem.hasOwnProperty('id')) {
          setToID(toItem.id)
          setToDate(toItem.date);
          setToDuration(toItem.duration)
          setToOrder(toItem.order);
          setToOrderDate(toItem.order_date);
          setMachine(toItem.machine);
          setServiceType(toItem.service_type);
          setServiceCenter(toItem.service_center);
        }
      }, [toItem]);
    
    const updateTo = (e) => {
      e.preventDefault();
      setLoading(true);
      fetch(`http://localhost:8000/api/to/${toID}`, {
          method: 'PUT',
          headers: {
              'Content-Type': 'application/json',
              'X-CSRFToken': csrftoken,
          },
      
          body: JSON.stringify({
                "date": toDate,
                "duration": toDuration,
                "order": toOrder,
                "order_date": toOrderDate,
                "service_type": serviceType,
                "service_center": serviceCenter,
                "machine": machine
              }),
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
      .then(data => {
          setToItem(data);
          setFetchStatus({
              'className' : styles.status_ok,
              'statusText': 'Данные обновлены'});
          setUpdateList(updateList + 1);
      })
      .catch(error => {
          setFetchStatus({
              'className' : styles.status_error,
              'statusText': `Данные не обновлены, ошибка \n ${error}`})
          console.log(error)
      })
      .finally(() => {
          setLoading(false)
      });

    }

    const createTo = (e) => {
      e.preventDefault();
      setLoading(true);
      fetch(`http://localhost:8000/api/to/`, {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
              'X-CSRFToken': csrftoken,
          },
      
          body: JSON.stringify({
                "date": toDate,
                "duration": toDuration,
                "order": toOrder,
                "order_date": toOrderDate,
                "service_type": serviceType,
                "service_center": serviceCenter,
                "machine": machine
              }),
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
      .then(data => {
          setToItem(data);
          setFetchStatus({
              'className' : styles.status_ok,
              'statusText': 'Запись добавлена'});
          setUpdateList(updateList + 1);
      })
      .catch(error => {
          setFetchStatus({
              'className' : styles.status_error,
              'statusText': `Запись не добавлена, ошибка \n ${error}`})
          console.log(error)
      })
      .finally(() => {
          setLoading(false)
      });
    };

    const submitHandler = (e) => {
        if (toPage === 'to_detail') {
            updateTo(e);
        } else if (toPage === 'to_create') {
            createTo(e);
        }
    };

    const toDeleteHandler = (e, to_item) => {
        e.preventDefault();
        if (window.confirm(`Вы уверены, что хотите удалить заказ-наряд ${to_item.order}?`)) {
          fetch(`http://localhost:8000/api/to/${to_item.id}`, {
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
          setUpdateList(updateList + 1)
          setToPage('to_list')
        })
        .catch(error => {
            setFetchStatus({
                'className' : styles.status_error,
                'statusText': `Произошла ошибка \n ${error}`});
          console.log(error)
        });
        }
        
      }


  return (
    <div className={styles.to_detail}>
        {toPage === 'to_create'? 
            <h3>ДОБАВЛЕНИЕ НОВОГО ТО.</h3>
        :null}
        <button type="button" className={styles.close_button} title="Закрыть" onClick={(e) => {e.preventDefault(); setToPage('to_list')}}>X</button>
        <form autoComplete='off' onSubmit={submitHandler}>
            <label>Дата заказ-наряда:
                <input type="date"
                    name="order_date" id=""
                    value={toOrderDate}
                    onChange={e => setToOrderDate(e.target.value)}/>
            </label>
            
            <label>№ заказ-наряда:
                <input type="text"
                    name="order" id=""
                    value={toOrder}
                    onChange={e => setToOrder(e.target.value)}/>
            </label>
            <label>Машина:
                <select
                    value={machine}
                    onChange={e => setMachine(e.target.value)} name="" id="">
                        <option value={0} disabled>== Выберите из списка ==</option>
                            {machines.map(item => (
                                <option key={item.id} value={item.id}>
                                    {item.machine_number} &nbsp;
                                    {directory.find(it => it.id === item.machine_model).title}
                                </option>
                            ))}
                </select>
            </label>
            <label>Вид ТО:
                <select
                    value={serviceType}
                    onChange={e => setServiceType(e.target.value)} name="" id="">
                        <option value={0} disabled>== Выберите из списка ==</option>
                            {directory.map(item => (
                                (item.name === 'STP') ?
                                    <option key={item.id} value={item.id}>
                                    {item.title}
                                    </option>
                                :null
                            ))}
                </select>
            </label>
            <DirDescription dirID={serviceType} directory={directory}/>
            <label>Дата проведения ТО:
                <input type="date"
                    name="date" id=""
                    value={toDate}
                    onChange={e => setToDate(e.target.value)}/>
            </label>
            <label>Наработка, м/час:
                <input type="text"
                    name="duration" id=""
                    value={toDuration}
                    onChange={e => setToDuration(e.target.value)}/>
            </label>
            <label>Сервисная компания:
                {Object.entries(users).length > 0 ? 
                <select
                value={serviceCenter}
                onChange={e => setServiceCenter(e.target.value)} name="" id="">
                    <option value={0} disabled>== Выберите из списка ==</option>
                    {users.map(item => (
                        (item.groups.includes(2)) ? 
                            <option key={item.id} value={item.id}>{item.first_name} {item.last_name}</option>
                        : null
                    ))}
                </select>
                : null
                }
            </label>

            <div className={styles.submit}>
                {toPage === 'to_detail' ? <>
                    <button type="submit" name='submit'>Изменить</button>
                    <button type="button"
                        name='delete'
                        onClick={(e) => toDeleteHandler(e, toItem)}>Удалить</button>
                    </>
                :null}
                {toPage === 'to_create' ? 
                    <button type="submit" name='submit'>Добавить</button>
                :null}
                
                {loading ? <div className={styles.status_ok}>Загрузка...</div> : null}
                {fetchStatus ? <div className={fetchStatus.className}>{fetchStatus.statusText}</div> : null}
            </div>
            
        </form>
    </div>
  )
}

import styles from './ComplaintsDetail.module.scss';
import React, { useState, useEffect } from 'react'
import DirDescription from './DirDescription/DirDescription'

function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
  }

export default function ComplaintsDetail(props) {
    const {directory,
        users,
        complaintDetailItem,
        machines,
        setComplaintsPage,
        complaintsPage,
        setUpdateList,
        updateList
    } = props
    const [complaintItem, setComplaintItem] = useState({})
    const [complaintID, setComplaintID] = useState(0)
    const [complaintDate, setComplaintDate] = useState('')
    const [complaintDescription, setComplaintDescription] = useState('')
    const [downtime, setDowntime] = useState(0)
    const [complaintDuration, setComplaintDuration] = useState(0)
    const [machine, setMachine] = useState(0)
    const [recoveryDate, setRecoveryDate] = useState('')
    const [recoveryMethod, setRecoveryMethod] = useState(0)
    const [serviceCenter, setServiceCenter] = useState(0)
    const [spares, setSpares] = useState('')
    const [unit, setUnit] = useState(0)
    const [fetchStatus, setFetchStatus] = useState({})
    const [loading, setLoading] = useState(false)
    const csrftoken = getCookie('csrftoken')
    
    useEffect(() => {
      if (complaintDetailItem.hasOwnProperty('id')) {
        setComplaintItem({...complaintDetailItem});
      };
    }, [complaintDetailItem]);

    useEffect(() => {
      if (complaintItem.hasOwnProperty('id')) {
          setComplaintID(complaintItem.id)
          setComplaintDate(complaintItem.date);
          setComplaintDescription(complaintItem.description);
          setDowntime(complaintItem.downtime);
          setComplaintDuration(complaintItem.duration);
          setMachine(complaintItem.machine);
          setRecoveryDate(complaintItem.recovery_date);
          setRecoveryMethod(complaintItem.recovery_method);
          setServiceCenter(complaintItem.service_center);
          setSpares(complaintItem.spares);
          setUnit(complaintItem.unit);
        }
      }, [complaintItem]);
    
    const updateComplaint = (e) => {
      e.preventDefault();
      setLoading(true);
      fetch(`http://localhost:8000/api/complaints/${complaintID}`, {
          method: 'PUT',
          headers: {
              'Content-Type': 'application/json',
              'X-CSRFToken': csrftoken,
          },
      
          body: JSON.stringify({
                "date": complaintDate,
                "duration": complaintDuration,
                "description": complaintDescription,
                "spares": spares,
                "recovery_date": recoveryDate,
                "downtime": downtime,
                "unit": unit,
                "recovery_method": recoveryMethod,
                "machine": machine,
                "service_center": serviceCenter
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
          setComplaintItem(data);
          setFetchStatus({
              'className' : styles.status_ok,
              'statusText': 'Данные обновлены'});
          setUpdateList('');
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

    const createComplaint = (e) => {
      e.preventDefault();
      setLoading(true);
      fetch(`http://localhost:8000/api/complaints/`, {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
              'X-CSRFToken': csrftoken,
          },
      
          body: JSON.stringify({
            "date": complaintDate,
            "duration": complaintDuration,
            "description": complaintDescription,
            "spares": spares,
            "recovery_date": recoveryDate,
            "downtime": downtime,
            "unit": unit,
            "recovery_method": recoveryMethod,
            "machine": machine,
            "service_center": serviceCenter
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
          setComplaintItem(data);
          setFetchStatus({
              'className' : styles.status_ok,
              'statusText': 'Запись добавлена'});
          setUpdateList('');
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
        if (complaintsPage === 'complaints_detail') {
            updateComplaint(e);
        } else if (complaintsPage === 'complaints_create') {
            createComplaint(e);
        }
    };

    const toDeleteHandler = (e, complaints_item) => {
        e.preventDefault();
        if (window.confirm(`Вы уверены, что хотите удалить рекламацию ${complaints_item.description}?`)) {
          fetch(`http://localhost:8000/api/complaints/${complaints_item.id}`, {
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
          setComplaintsPage('complaints_list')
          setUpdateList(updateList + 1)
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
    <div className={styles.complaints_detail}>
        {complaintsPage === 'complaints_create'? 
            <h3>ДОБАВЛЕНИЕ НОВОЙ РЕКЛАМАЦИИ.</h3>
        :null}
        <button type="button" className={styles.close_button} title="Закрыть" onClick={(e) => {e.preventDefault(); setComplaintsPage('complaints_list')}}>X</button>
        <form autoComplete='off' onSubmit={submitHandler}>
            <label>Дата отказа:
                <input type="date"
                    name="date" id=""
                    value={complaintDate}
                    onChange={e => setComplaintDate(e.target.value)}/>
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
            <label>Узел отказа:
                <select
                    value={unit}
                    onChange={e => setUnit(e.target.value)} name="" id="">
                        <option value={0} disabled>== Выберите из списка ==</option>
                            {directory.map(item => (
                                (item.name === 'BRU') ?
                                    <option key={item.id} value={item.id}>
                                    {item.title}
                                    </option>
                                :null
                            ))}
                </select>
            </label>
            <DirDescription dirID={unit} directory={directory}/>
            <label>Описание отказа:
                <input type="text"
                    name="description" id=""
                    value={complaintDescription}
                    onChange={e => setComplaintDescription(e.target.value)}/>
            </label>
            <label>Способ восстановления:
                <select
                    value={recoveryMethod}
                    onChange={e => setRecoveryMethod(e.target.value)} name="" id="">
                        <option value={0} disabled>== Выберите из списка ==</option>
                            {directory.map(item => (
                                (item.name === 'RMT') ?
                                    <option key={item.id} value={item.id}>
                                    {item.title}
                                    </option>
                                :null
                            ))}
                </select>
            </label>
            <DirDescription dirID={recoveryMethod} directory={directory}/>
            <label>Используемые запасные части:
                <input type="text"
                    name="spares" id=""
                    value={spares}
                    onChange={e => setSpares(e.target.value)}/>
            </label>
            <label>Дата восстановления:
                <input type="date"
                    name="recovery_date" id=""
                    value={recoveryDate}
                    onChange={e => setRecoveryDate(e.target.value)}/>
            </label>
            <label>Время простоя техники:
                <input type="text"
                    name="duration" id=""
                    disabled
                    value={((new Date(recoveryDate).getTime() - new Date(complaintDate).getTime()) / (24 * 3600 * 1000)) || 0}
                    onChange={e => setComplaintDuration(e.target.value)}/>
            </label>
            <label>Наработка, м/час:
                <input type="text"
                    name="duration" id=""
                    value={complaintDuration}
                    onChange={e => setComplaintDuration(e.target.value)}/>
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
                {complaintsPage === 'complaints_detail' ? <>
                    <button type="submit" name='submit'>Изменить</button>
                    <button type="button"
                        name='delete'
                        onClick={(e) => toDeleteHandler(e, complaintItem)}>Удалить</button>
                    </>
                :null}
                {complaintsPage === 'complaints_create' ? 
                    <button type="submit" name='submit'>Добавить</button>
                :null}
                
                {loading ? <div className={styles.status_ok}>Загрузка...</div> : null}
                {fetchStatus ? <div className={fetchStatus.className}>{fetchStatus.statusText}</div> : null}
            </div>
            
        </form>
    </div>
  )
}

import styles from './AllUsersDetail.module.scss';
import React, { useState, useEffect } from 'react'


function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
  }

export default function AllUsersDetail(props) {
    const {
        userDetailItem,
        setUsersPage,
        usersPage,
        setUpdateList,
        updateList,
    } = props
    const [userItem, setUserItem] = useState({})
    const [userID, setUserID] = useState()
    const [name, setName] = useState('')
    const [username, setUsername] = useState('')
    const [group, setGroup] = useState(0)
    const [password, setPassword] = useState('')
    const [fetchStatus, setFetchStatus] = useState({})
    const [loading, setLoading] = useState(false)
    const [passChange, setPassChange] = useState('Нажмите для изменения');
    const [disableCreateButton, setDisableCreateButton] = useState(false)
    const csrftoken = getCookie('csrftoken')
    
    useEffect(() => {
      if (userDetailItem.hasOwnProperty('id')) {
        setUserItem({...userDetailItem});
      };
    }, [userDetailItem]);

    useEffect(() => {
      if (userItem.hasOwnProperty('username')) {
          setUserID(userItem.id)
          setName(userItem.first_name);
          setUsername(userItem.username);
          if (userItem.is_staff) {
            setGroup(3);
          } else if (userItem.groups.includes(1)) {
            setGroup(1);
          } else if (userItem.groups.includes(2)) {
            setGroup(2);
          }
        };
        if (usersPage === 'user_create') {
            setPassChange('')
        }
      }, [userItem, usersPage]);
    
    const updateUser = (e) => {
      e.preventDefault();
      setLoading(true);

      if (!username) {
        setFetchStatus({
              'className' : styles.status_error,
              'statusText': `Введите имя пользователя`})
        setLoading(false)
        return null
      }

      const obj = {
        "first_name": name,
        "username": username,
      };

      if (!!password) {obj.password = password};

      if (group === 1 || group === 2) {
        obj.groups = []
        obj.groups.push(group)
        obj.is_staff = 0
      } else if (group === 3) {
        obj.is_staff = 1
      };

      fetch(`http://localhost:8000/api/users_adm/${userID}`, {
          method: 'PUT',
          headers: {
              'Content-Type': 'application/json',
              'X-CSRFToken': csrftoken,
          },
          body: JSON.stringify(obj),
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
          setUserItem(data);
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

    const createUser = (e) => {
      e.preventDefault();
      if (!username) {
        setFetchStatus({
              'className' : styles.status_error,
              'statusText': `Введите имя пользователя`})
        setLoading(false)
        return null
      }
      if (!password) {
        setFetchStatus({
              'className' : styles.status_error,
              'statusText': `Введите пароль`})
        setLoading(false)
        return null
      }
      if (group === 0) {
        setFetchStatus({
              'className' : styles.status_error,
              'statusText': `Укажите группу пользователя`})
        setLoading(false)
        return null
      }

      setLoading(true);

      const obj = {
        "first_name": name,
        "password": password,
        "username": username
      };

      if (group === 3) {
        obj.is_staff = 1
      };
      
      if (group === 1 || group === 2) {
        obj.groups = [];
        obj.groups.push(group);
        obj.is_staff = 0;
      };

      fetch(`http://localhost:8000/api/users_adm/`, {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
              'X-CSRFToken': csrftoken,
          },
          body: JSON.stringify(obj),
          credentials: 'include',
          },
      )
      .then(response => {
          if (response.ok) {
              return response.json()
          } else {
              throw Error(`${response.status} ${response.statusText}`)
          }
      })
      .then(data => {
          setUserItem(data);
          setFetchStatus({
              'className' : styles.status_ok,
              'statusText': 'Запись добавлена'});
          setUpdateList(updateList + 1);
          setDisableCreateButton(true);
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
        
        if (usersPage === 'user_detail') {
            updateUser(e);
        } else if (usersPage === 'user_create') {
            createUser(e);
        }
    };

    const userDeleteHandler = (e, user_item) => {
        e.preventDefault();
        if (window.confirm(`Вы уверены, что хотите удалить пользователя ${user_item.username}?`)) {
          fetch(`http://localhost:8000/api/users_adm/${user_item.id}`, {
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
                setUsersPage('user_list')
                setUpdateList(updateList + 1)
                return response
            } else {
                throw Error(`${response.status} ${response.statusText}`)
            }
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
        {usersPage === 'user_create'? 
            <h3>ДОБАВЛЕНИЕ НОВОГО ПОЛЬЗОВАТЕЛЯ.</h3>
        :null}
        <button type="button" className={styles.close_button} title="Закрыть" onClick={(e) => {e.preventDefault(); setUsersPage('user_list')}}>X</button>
        <form autoComplete='off' onSubmit={submitHandler}>
            <label>Имя
                <input type="text"
                    name="first_name"
                    value={name}
                    onChange={e => setName(e.target.value)}/>
            </label>
            <label>Имя пользователя:
                <input type="text"
                    name="username"
                    value={username}
                    onChange={e => setUsername(e.target.value)}/>
            </label>
            <label>Пароль: {passChange === 'Нажмите для изменения' ?
            
                <div className={styles.pass_change} onClick={() => setPassChange('')}>{passChange}</div>
            
            : 
                <input type="password"
                    name="password"
                    value={password}
                    onChange={e => setPassword(e.target.value)}/>
            }
            </label>
            <label>Группа:
                <select value={group || 0} onChange={e => setGroup(+e.target.value)}>
                    <option name="none" disabled value={0}>===Выберите из списка===</option>
                    <option name="client" value={1}>Клиент</option>
                    <option name="service" value={2}>Сервисная организация</option>
                    <option name="manager" value={3}>Менеджер</option>
                </select>
            </label>

            <div className={styles.submit}>
                {usersPage === 'user_detail' ? <>
                    <button type="submit" name='submit'>Изменить</button>
                    <button type="button"
                        name='delete'
                        onClick={(e) => userDeleteHandler(e, userItem)}>Удалить</button>
                    </>
                :null}
                {usersPage === 'user_create' ? 
                    <button type="submit" disabled={disableCreateButton} name='submit'>Добавить</button>
                :null}
                
                {loading ? <div className={styles.status_ok}>Загрузка...</div> : null}
                {fetchStatus ? <div className={fetchStatus.className}>{fetchStatus.statusText}</div> : null}
            </div>
            
        </form>
    </div>
  )
}

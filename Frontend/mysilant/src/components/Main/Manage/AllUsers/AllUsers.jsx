import styles from './AllUsers.module.scss';
import React, { useState, useEffect } from 'react';
import AllUsersDetail from './AllUsersDetail/AllUsersDetail';
import AllUsersFilter from './AllUsersFilter/AllUsersFilter';
import { sortData } from '../../../../helpers';

export default function AllUsers(props) {
    const {directory, users, userGroup, machines} = props;
    const [userList, setUserList] = useState({});
    const [fetchError, setFetchError] = useState('');
    const [loading, setLoading] = useState(false);
    const [filters, setFilters] = useState('');
    const [usersPage, setUsersPage] = useState('user_list');
    const [userDetailItem, setUserDetailItem] = useState({});
    const [updateList, setUpdateList] = useState(0);

    useEffect(() => {
        setLoading(true);
        fetch(
            `http://localhost:8000/api/users_adm/${filters}`,
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

            for (const item of resp) {
                if (item.is_staff) {
                    item.group = 'Менеджер'
                } else if (item.groups.includes(2)) {
                    item.group = 'Сервисная организация'
                } else if (item.groups.includes(1)) {
                    item.group = 'Клиент'
                } 
            }

            setUserList(resp);
            setFetchError('');
            

            setLoading(false);
        })
        .catch(error => {
            setFetchError(`Произошла ошибка. ${error}`);
            console.log(error);
            setLoading(false);
        })
    }, [filters, updateList]);

    const userDetailHandler = (e, item) => {
      e.preventDefault();
      setUserDetailItem(item);
      setUsersPage('user_detail');
    };

    const [objectDirection]= useState({})
    const sortingTable = (field) => {

        if (objectDirection.hasOwnProperty(field)) {
        objectDirection[field] = !objectDirection[field];
        sortData(field, userList, setUserList, directory, objectDirection[field] === true ? "increase" : "decrease")
        } else {
        objectDirection[field] = true;
        sortData(field, userList, setUserList, directory, objectDirection[field] === true ? "increase" : "decrease")
        }
    }

  return (
    <div className={styles.users}>
      {usersPage === 'user_create' ? 
        <AllUsersDetail directory={directory}
        userDetailItem={{
            "id": 0,
            "first_name": '',
            "password": undefined,
            "username": '',
            "groups": []
        }}
        userGroup={userGroup}
        users={users}
        machines={machines}
        setUsersPage={setUsersPage}
        usersPage={usersPage}
        setUpdateList={setUpdateList}
        />
      :null}
      {usersPage === 'user_detail' ? 
        <AllUsersDetail
          userDetailItem={userDetailItem}
          setUsersPage={setUsersPage}
          usersPage={usersPage}
          setUpdateList={setUpdateList}
          updateList={updateList}
          />
      :null}
      {usersPage === 'user_list'? <>
      <button type='button'
        className={styles.add_btn}
        onClick={e => {e.preventDefault(); setUsersPage('user_create')}}>
          + Добавить пользователя
      </button>
      <AllUsersFilter setFilters={setFilters}/>
      <div className={styles.table_container}>
        <table className={styles.users_table}>
            <thead>
                <tr>
                    <th onClick={() => sortingTable('id')}>ID</th>
                    <th onClick={() => sortingTable('first_name')}>Имя</th>
                    <th onClick={() => sortingTable('username')}>Имя пользователя</th>
                    <th onClick={() => sortingTable('group')}>Группа</th>
                </tr>
            </thead>
            {loading ? 
                <tbody>
                    <tr><td colSpan={4}>Загрузка...</td></tr>
                </tbody>
            :
            <tbody>
                {userList.length > 0 ? 
                    userList.map(item => (
                        <tr key={item.id}>
                            <td onClick={e => userDetailHandler(e, item)}>
                                {item.id}
                            </td>
                            <td onClick={e => userDetailHandler(e, item)}>
                                {item.first_name}
                            </td>
                            <td onClick={e => userDetailHandler(e, item)}>
                                {item.username}
                            </td>
                            <td onClick={e => userDetailHandler(e, item)}>
                                {item.group}
                            </td>
                        </tr>
                    ))
                : 
                    <tr><td colSpan={4}>ТО не найдены</td></tr>
                }
                {!!fetchError ? 
                    <tr><td colSpan={4} className={styles.error_message}>{fetchError}</td></tr>
                : null}
            </tbody>
            }
        </table>
        </div>
        </>: null}
    </div>
  )
}

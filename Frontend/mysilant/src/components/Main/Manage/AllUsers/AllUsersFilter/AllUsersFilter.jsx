import React from 'react'
import { useState } from 'react'
import styles from './AllUsersFilter.module.scss'

export default function AllUsersFilter(props) {
  const {setFilters} = props;
  const [nameFilter, setNameFilter] = useState('');
  const [usernameFilter, setUsernameFilter] = useState('');

  const buildFilter = (e) => {
    e.preventDefault();
    const query = [];
    nameFilter && query.push(`first_name=${nameFilter}`);
    usernameFilter && query.push(`username=${usernameFilter}`);
    console.log(`?${query.join('&')}`);
    setFilters(`?${query.join('&')}`)
  };

  const eraseFilter = (e) => {
    e.preventDefault();
    setNameFilter('');
    setUsernameFilter('');
    setFilters('')
  }
  return (
    <div className={styles.machine_filters}>
            <p>Фильтр:</p>
            <form className={styles.filters} onSubmit={buildFilter}>
                <input 
                    type="text" 
                    name="first_name" 
                    placeholder='Имя'
                    value={nameFilter}
                    onChange={e => setNameFilter(e.target.value)}
                />
                <input 
                    type="text"
                    name="username" 
                    placeholder='Имя пользователя'
                    value={usernameFilter}
                    onChange={e => setUsernameFilter(e.target.value)}
                />
                <div className={styles.buttons}>
                  <button type='submit' title='Применить фильтры'>Применить</button>
                  <button className={styles.delete_button} onClick={eraseFilter} title='Сброс фильтра'>x</button>
                </div>
            </form>
            
        </div>
  )
}

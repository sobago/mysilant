import styles from './Manage.module.scss';
import React, {useState, useEffect} from 'react'


export default function Manage(props) {
    const {userGroup, setPage, page} = props;
    const [btnClass, setBtnClass] = useState();

    useEffect(() => {
      setBtnClass(page);
    }, [page])
    

  return (
    <div>
      <div className={styles.tabs}>
        {userGroup === 'Менеджер' || userGroup === 'Сервисная организация' ?
            <button disabled={btnClass === 'list'}
            className={`${btnClass === 'list' ?  styles.btn_active :null}`}
            onClick={() => setPage('list')}>Все машины
              </button>
        : null}
        {userGroup === 'Менеджер' || userGroup === 'Сервисная организация' ?
            <button disabled={btnClass === 'tos'}
            className={`${btnClass === 'tos' ? styles.btn_active :null}`}
            onClick={() => setPage('tos')}>Все ТО
            </button>
        : null}
        {userGroup === 'Менеджер' || userGroup === 'Сервисная организация'  ?
            <button disabled={btnClass === 'complaints'}
            className={`${btnClass === 'complaints' ? styles.btn_active :null}`} 
            onClick={() => setPage('complaints')}>Все рекламации
            </button>
        : null}
        {userGroup === 'Менеджер' ?
            <button disabled={btnClass === 'users'}
            className={`${btnClass === 'users' ? styles.btn_active :null}`}
            onClick={() => setPage('users')}>Все пользователи
            </button>
        : null}
        {userGroup === 'Менеджер' ?
            <button disabled={btnClass === 'directories'}
            className={`${btnClass === 'directories' ? styles.btn_active :null}`}
            onClick={() => setPage('directories')}>Справочники
            </button>
        : null}
        {userGroup === 'Менеджер' ?
          <a href="http://localhost:8000/api/swagger/" target="_blank" rel="noreferrer">API</a>
        :null}
      </div>
    </div>
  )
}

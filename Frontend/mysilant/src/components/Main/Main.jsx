import React, { useState, useEffect, Suspense } from 'react';
import styles from './Main.module.scss';


const Manage = React.lazy(() => import('./Manage/Manage'));
const MachineCreate = React.lazy(() => import('./Manage/MachineCreate/MachineCreate'));
const MachineList = React.lazy(() => import('./MachineList/MachineList'));
const AllTO = React.lazy(() => import('./Manage/AllTO/AllTO'));
const AllComplaints = React.lazy(() => import('./Manage/AllComplaints/AllComplaints'));
const AllUsers = React.lazy(() => import('./Manage/AllUsers/AllUsers'));
const Directories = React.lazy(() => import('./Manage/Directories/Directories'));

export default function Main(props) {

  const [directory, setDirectory] = useState([])
  const [users, setUsers] = useState({})
  const [page, setPage] = useState('list')
  const [updateList, setUpdateList] = useState(0)
  const [updateDir, setUpdateDir] = useState(0)
  const [filters, setFilters] = useState('')
  const [loading, setLoading] = useState(false)
  const [fetchError, setFetchError] = useState('')
  const [machines, setMachines] = useState([])
  
  useEffect(() => {
    setLoading(true);
    fetch(
        `http://localhost:8000/api/machines/${filters}`,
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
        setMachines(resp);
        setFetchError('');
        setLoading(false);
    })
    .catch(error => {
      setFetchError(`Произошла ошибка. ${error}`);
      console.log(error);
      setLoading(false);
    });
  }, [filters, updateList]);
    
  useEffect(() => {
    fetch(
        'http://localhost:8000/api/directory/',
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
        setDirectory(resp);
    });
  }, [updateDir]);

  useEffect(() => {
    fetch('http://localhost:8000/api/users',
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
        setUsers(resp)
    });
  }, []);
    
  
  return (
    <div className={styles.main}>
        {props.userGroup === 'Менеджер' || props.userGroup === 'Сервисная организация' ?
          <Suspense>
            <Manage userGroup={props.userGroup} setPage={setPage} page={page}/>
          </Suspense>
        : null }

        {props.userGroup === 'Менеджер' && page === 'list' ?
                <button className={styles.btn_createmachine} onClick={() => setPage('machine_create')}>+ Добавить машину</button>
            : null}

        {page === 'machine_create' ?
            <Suspense>
                <MachineCreate
                directory={directory}
                userGroup={props.userGroup}
                users={users}
                page={page}
                setPage={setPage}/>
            </Suspense>
        :null }
        {page === 'list' ?  
          <Suspense>
            <MachineList setPage={setPage}
            directory={directory}
            userGroup={props.userGroup}
            users={users}
            setUpdateList={setUpdateList}
            setFilters={setFilters}
            loading={loading}
            updateList={updateList}
            setFetchError={setFetchError}
            fetchError={fetchError}
            machines={machines}/>
          </Suspense>
        : null}
        {page === 'tos' ?  
          <Suspense>
            <AllTO setPage={setPage}
            directory={directory}
            userGroup={props.userGroup}
            users={users}
            machines={machines}/>
          </Suspense>
        : null}
        {page === 'complaints' ?  
          <Suspense>
            <AllComplaints setPage={setPage}
            directory={directory}
            userGroup={props.userGroup}
            users={users}
            machines={machines}/>
          </Suspense>
        : null}
        {page === 'users' ?  
          <Suspense>
            <AllUsers setPage={setPage}
            directory={directory}
            userGroup={props.userGroup}
            users={users}
            machines={machines}/>
          </Suspense>
        : null}
        
        {page === 'directories' ?  
          <Suspense>
            <Directories setPage={setPage}
            directory={directory}
            userGroup={props.userGroup}
            updateDir={updateDir}
            setUpdateDir={setUpdateDir}/>
          </Suspense>
        : null}
        
    </div>
  )
}

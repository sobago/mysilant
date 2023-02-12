import styles from './DirectoryDetail.module.scss';
import React, {useState, useEffect} from 'react'

function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
  }

export default function DirectoryDetail(props) {
    const {detailItem, dirPage, setDirPage, updateDir, setUpdateDir, dict} = props;
    const [dirItem, setDirItem] = useState({});
    const [dirID, setDirID] = useState();
    const [dirName, setDirName] = useState('');
    const [dirTitle, setDirTitle] = useState('');
    const [dirDescription, setDirDescription] = useState('');
    const [loading, setLoading] = useState(false);
    const [fetchStatus, setFetchStatus] = useState({});
    const [disableCreateButton, setDisableCreateButton] = useState(false)
    const csrftoken = getCookie('csrftoken');

    useEffect(() => {
        if (detailItem.hasOwnProperty('id')) {
            setDirItem({...detailItem});
        };
      }, [detailItem]);
    
    useEffect(() => {
    if (dirItem.hasOwnProperty('name')) {
        setDirID(dirItem.id)
        setDirName(dirItem.name_);
        setDirTitle(dirItem.title);
        setDirDescription(dirItem.description);
      };
    }, [dirItem]);

    const submitHandler = (e) => {
        if (dirPage === 'dir_detail') {
            updateDirItem(e);
        } else if (dirPage === 'dir_create') {
            createDirItem(e);
        }
    };

    const updateDirItem = (e) => {
        e.preventDefault();
        setLoading(true);
        
        if (!dirName) {
            setFetchStatus({
                  'className' : styles.status_error,
                  'statusText': `Укажите наименование`})
            setLoading(false)
            return null
          }
        
        const obj = {
            name: dict[dirName],
            title: dirTitle,
            description: dirDescription
        }
        
        fetch(`http://localhost:8000/api/directory/${dirID}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'X-CSRFToken': csrftoken,
            },
            body: JSON.stringify(obj),
            credentials: 'include',
        })
        .then(response => {
            if (response.ok) {
                return response.json()
            } else {
                throw Error(`${response.status} ${response.statusText}`)
            }
        })
        .then(data => {
            setDirItem(data);
            setFetchStatus({
                'className' : styles.status_ok,
                'statusText': 'Данные обновлены'});
            setUpdateDir(updateDir + 1);
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
    };

    const createDirItem = (e) => {
        e.preventDefault();
        setLoading(true);
        
        if (!dirTitle) {
            setFetchStatus({
                  'className' : styles.status_error,
                  'statusText': `Укажите наименование`})
            setLoading(false)
            return null
          }
        
        if (!dirName) {
            setFetchStatus({
                  'className' : styles.status_error,
                  'statusText': `Укажите справочник`})
            setLoading(false)
            return null
          }
        
        const obj = {
            name: dict[dirName],
            title: dirTitle,
            description: dirDescription
        }
        
        fetch(`http://localhost:8000/api/directory/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-CSRFToken': csrftoken,
            },
            body: JSON.stringify(obj),
            credentials: 'include',
        })
        .then(response => {
            if (response.ok) {
                return response.json()
            } else {
                throw Error(`${response.status} ${response.statusText}`)
            }
        })
        .then(data => {
            setDirItem(data);
            setFetchStatus({
                'className' : styles.status_ok,
                'statusText': 'Запись добавлена'});
            setUpdateDir(updateDir + 1);
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

    const dirDeleteHandler = (e) => {
        e.preventDefault();
        if (window.confirm(`Вы уверены, что хотите удалить объект ${dirItem.title}?`)) {
            fetch(`http://localhost:8000/api/directory/${dirID}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRFToken': csrftoken,
                },
                credentials: 'include',
            })
            .then(response => {
                if (response.ok) {
                    setDirPage('dir_list')
                    setUpdateDir(updateDir + 1)
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
    <div className={styles.dir_detail}>
        {dirPage === 'dir_create'? 
            <h3>ДОБАВЛЕНИЕ НОВОГО НАИМЕНОВАНИЯ.</h3>
        :null}
        <button type="button" className={styles.close_button} title="Закрыть" onClick={(e) => {e.preventDefault(); setDirPage('dir_list')}}>X</button>
        <form className={styles.dir_detail_form} autoComplete='off' onSubmit={submitHandler}>
            <label>Справочник:
                <select value={dirName || 0} onChange={e => setDirName(e.target.value)}>
                    <option name="none" disabled value={0}>===Выберите из списка===</option>
                    {Object.keys(dict).map(item => (
                        <option key={dict[item]} value={item}>{item}</option>
                    ))}
                </select>
            </label>
            <label>Наименование:
                <input type="text"
                    name="title"
                    value={dirTitle}
                    onChange={e => setDirTitle(e.target.value)}/>
            </label>
            <label>Описание:
                <input type="text"
                    name="description"
                    maxLength={256}
                    value={dirDescription}
                    onChange={e => setDirDescription(e.target.value)}/>
            </label>

            <div className={styles.submit}>
                {dirPage === 'dir_detail' ? <>
                    <button type="submit" name='submit'>Изменить</button>
                    <button type="button"
                        name='delete'
                        onClick={(e) => dirDeleteHandler(e)}>Удалить</button>
                    </>
                :null}
                {dirPage === 'dir_create' ? 
                    <button type="submit" disabled={disableCreateButton} name='submit'>Добавить</button>
                :null}
                
                {loading ? <div className={styles.status_ok}>Загрузка...</div> : null}
                {fetchStatus ? <div className={fetchStatus.className}>{fetchStatus.statusText}</div> : null}
            </div>
            
        </form>
    </div>
  )
}

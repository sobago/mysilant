import styles from './Directories.module.scss';
import React, {useState} from 'react'
import DirectoryDetail from './DirectoryDetail/DirectoryDetail';

const dict = {
    'Модель техники': 'MOD', 
    'Модель двигателя': 'ENG', 
    'Модель трансмиссии': 'TRA', 
    'Модель ведущего моста': 'DAX', 
    'Модель управляемого моста': 'SAX', 
    'Вид ТО': 'STP', 
    'Узел отказа': 'BRU', 
    'Способ восстановления': 'RMT', 
}        


export default function Directories(props) {
    const {directory, updateDir, setUpdateDir} = props
    const [dirPage, setDirPage] = useState('dir_list')
    const [detailItem, setDetailItem] = useState({})

    const detailDirHandler = (e, item) => {
        setDetailItem(item);
        setDirPage('dir_detail');
    }

  return (
    <div className={styles.directories}>
        {dirPage === 'dir_create' ? 
            <DirectoryDetail detailItem={{
                name_: '',
                title: "",
                description: ""
            }}
            dirPage={dirPage}
            setDirPage={setDirPage}
            updateDir={updateDir}
            setUpdateDir={setUpdateDir}
            dict={dict}/>
        :null}
        {dirPage === 'dir_detail' ? 
            <DirectoryDetail detailItem={detailItem}
            dirPage={dirPage}
            setDirPage={setDirPage}
            updateDir={updateDir}
            setUpdateDir={setUpdateDir}
            dict={dict}/>
        :null}
        {dirPage === 'dir_list' ? <>
        <button type='button'
        className={styles.add_btn}
        onClick={e => {e.preventDefault(); setDirPage('dir_create')}}>
          + Добавить наименование
        </button>
        <table>
            <thead>
                <tr>
                    <th>Справочник</th>
                    <th>Наименование</th>
                    <th>Описание</th>
                </tr>
            </thead>
            <tbody>
                {directory.length === 0 ?
                    <tr><td colSpan={4} className={styles.error_message}>Записи не найдены</td></tr>
                    :
                Object.keys(dict).map(key => (
                <>{
                    
                    directory.map(item => 
                        item.name_ === key ?
                            <tr key={item.id} onClick={e => detailDirHandler(e, item)}>
                                <td>{item.name_}</td>
                                <td>{item.title}</td>
                                <td>{item.description}</td>
                            </tr>
                        :null)
                    }
                </>
                ))}
                
            </tbody>
        </table>
    </>:null}
        
        
    </div>
  )
}

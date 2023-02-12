import styles from './MachineCreate.module.scss'
import React, { useState } from 'react'
import DirDescription from '../../MachineList/MachineDetail/DirDescription/DirDescription';

function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
  }

export default function MachineDetail(props) {
  const {directory, userGroup, users, setPage} = props
  const [machineModel, setMachineModel] = useState()
  const [machineNumber, setMachineNumber] = useState('')
  const [engineModel, setEngineModel] = useState()
  const [engineNumber, setEngineNumber] = useState('')
  const [transmissionModel, setTransmissionModel] = useState()
  const [transmissionNumber, setTransmissionNumber] = useState('')
  const [driveAxleModel, setDriveAxleModel] = useState()
  const [driveAxleNumber, setDriveAxleNumber] = useState('')
  const [steerAxleModel, setSteerAxleModel] = useState()
  const [steerAxleNumber, setSteerAxleNumber] = useState('')
  const [supplyContract, setSupplyContract] = useState('')
  const [shippingDate, setShippingDate] = useState('')
  const [consignee, setConsignee] = useState('')
  const [additional, setAdditional] = useState('')
  const [deliveryAddress, setDeliveryAddress] = useState('')
  const [customer, setCustomer] = useState()
  const [serviceCenter, setServiceCenter] = useState()
  const [createStatus, setCreateStatus] = useState({})
  const [loading, setLoading] = useState(false)
  const csrftoken = getCookie('csrftoken')
  
const createMachineHandler = (e) => {
    e.preventDefault();
    setLoading(true);
    fetch(`http://localhost:8000/api/machines/`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'X-CSRFToken': csrftoken,
        },
    
        body: JSON.stringify({
            "machine_number": machineNumber,
            "engine_number": engineNumber,
            "transmission_number": transmissionNumber,
            "drive_axle_number": driveAxleNumber,
            "steer_axle_number": steerAxleNumber,
            "supply_contract": supplyContract,
            "shipping_date": shippingDate,
            "consignee": consignee,
            "delivery_address": deliveryAddress,
            "additional": additional,
            "machine_model": machineModel,
            "engine_model": engineModel,
            "transmission_model": transmissionModel,
            "drive_axle_model": driveAxleModel,
            "steer_axle_model": steerAxleModel,
            "customer": customer,
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
        // setMachine(data);
            setCreateStatus({
            'className' : styles.status_ok,
            'statusText': 'Машина добавлена'});
            setMachineModel(null);
            setEngineModel(null);
            setTransmissionModel(null);
            setDriveAxleModel(null);
            setSteerAxleModel(null);
            setCustomer(null);
            setServiceCenter(null);
            setMachineNumber('');
            setEngineNumber('');
            setTransmissionNumber('');
            setDriveAxleNumber('');
            setSteerAxleNumber('');
            setSupplyContract('');
            setShippingDate('');
            setConsignee('');
            setAdditional('');
            setDeliveryAddress('');

    })
    .catch(error => {
        setCreateStatus({
            'className' : styles.status_error,
            'statusText': `Машина не добавлена, ошибка \n ${error}`})
        console.log(error)
    })
    .finally(() => {
        setLoading(false)
    });
  }

  return (
    <div className={styles.machine_create} onSubmit={createMachineHandler}>
        <h3>ДОБАВЛЕНИЕ НОВОЙ МАШИНЫ.</h3>
        <button type="button" className={styles.close_button} title="Закрыть" onClick={(e) => {e.preventDefault(); setPage('list')}}>X</button>
        {userGroup === 'Менеджер' ? 
        <form autoComplete='off'>
            <label>Модель:
                <select
                    value={machineModel || 0}
                    onChange={e => setMachineModel(e.target.value)} name="" id="">
                        <option value={0} disabled>== Выберите из списка ==</option>
                        {directory.map(item => (
                            (item.name_ === "Модель техники") ? 
                                <option key={item.id} value={item.id}>{item.title}</option>
                            : null
                        ))}
                </select>
            </label>
            <DirDescription dirID={machineModel} directory={directory}/>
            <label>Заводской номер машины:
                <input type="text"
                    name="machine_number" id=""
                    value={machineNumber}
                    onChange={e => setMachineNumber(e.target.value)}/>
            </label>
            <label>Модель двигателя:
                <select
                    value={engineModel || 0}
                    onChange={e => setEngineModel(e.target.value)} name="" id="">
                    <option value={0} disabled>== Выберите из списка ==</option>
                                {directory.map(item => (
                                    (item.name_ === "Модель двигателя") ? 
                                        <option key={item.id} value={item.id}>{item.title}</option>
                                    : null
                                ))}
                </select>
            </label>
            <DirDescription dirID={engineModel} directory={directory}/>
            <label>Заводской номер двигателя:
                <input type="text"
                name="engine_number" id=""
                value={engineNumber}
                onChange={e => setEngineNumber(e.target.value)}/>
            </label>
            <label>Модель трансмиссии:
                <select
                value={transmissionModel || 0}
                onChange={e => setTransmissionModel(e.target.value)} name="" id="">
                <option value={0} disabled>== Выберите из списка ==</option>
                                {directory.map(item => (
                                    (item.name_ === "Модель трансмиссии") ? 
                                        <option key={item.id} value={item.id}>{item.title}</option>
                                    : null
                                ))}
                </select>
            </label>
            <DirDescription dirID={transmissionModel} directory={directory}/>
            <label>Заводской номер трансмиссии:
                <input type="text"
                name="transmission_number" id=""
                value={transmissionNumber}
                onChange={e => setTransmissionNumber(e.target.value)}/>
            </label>
            <label>Модель ведущего моста:
                <select
                value={driveAxleModel || 0}
                onChange={e => setDriveAxleModel(e.target.value)} name="" id="">
                <option value={0} disabled>== Выберите из списка ==</option>
                                {directory.map(item => (
                                    (item.name_ === "Модель ведущего моста") ? 
                                        <option key={item.id} value={item.id}>{item.title}</option>
                                    : null
                                ))}
                </select>
            </label>
            <DirDescription dirID={driveAxleModel} directory={directory}/>
            <label>Заводской номер ведущего моста:
                <input type="text"
                name="drive_axle_number" id=""
                value={driveAxleNumber}
                onChange={e => setDriveAxleNumber(e.target.value)}/>
            </label>
            <label>Модель управляемого моста:
                <select
                value={steerAxleModel || 0}
                onChange={e => setSteerAxleModel(e.target.value)} name="" id="">
                <option value={0} disabled>== Выберите из списка ==</option>
                                {directory.map(item => (
                                    (item.name_ === "Модель управляемого моста") ? 
                                        <option key={item.id} value={item.id}>{item.title}</option>
                                    : null
                                ))}
                </select>
            </label>
            <DirDescription dirID={steerAxleModel} directory={directory}/>
            <label>Заводской номер управляемого моста:
                <input type="text"
                name="steer_axle_number" id=""
                value={steerAxleNumber}
                onChange={e => setSteerAxleNumber(e.target.value)}/>
            </label>
            <label>Договор поставки №, дата:
                <input type="text"
                name="supply_contract" id=""
                value={supplyContract}
                onChange={e => setSupplyContract(e.target.value)}/>
                </label>
            <label>Дата отгрузки с завода:
                <input type="date"
                name="shipping_date" id=""
                value={shippingDate}
                onChange={e => setShippingDate(e.target.value)}/>
                </label>
            <label>Грузополучатель (конечный потребитель):
                <input type="text"
                name="consignee" id=""
                value={consignee}
                onChange={e => setConsignee(e.target.value)}/>
                </label>
            <label>Адрес поставки (эксплуатации):
                <input type="text"
                name="delivery_address" id=""
                value={deliveryAddress}
                onChange={e => setDeliveryAddress(e.target.value)}/>
            </label>
            <label>Комплектация (доп. опции):
                <textarea name=""
                className={styles.textarea}
                value={additional}
                onChange={e => setAdditional(e.target.value)}/>
                </label>
            <label>Клиент:
                {Object.entries(users).length > 0 ? 
                <select
                value={customer || 0}
                onChange={e => setCustomer(e.target.value)} name="" id="">
                <option value={0} disabled>== Выберите из списка ==</option>
                    {users.map(item => (
                        (item.groups.includes(1)) ? 
                            <option key={item.id} value={item.id}>{item.first_name} {item.last_name}</option>
                        : null
                    ))}
                </select>
                : null}
            </label>
            <label>Сервисная компания:
                {Object.entries(users).length > 0 ? 
                <select
                value={serviceCenter || 0}
                onChange={e => setServiceCenter(e.target.value)} name="" id="">
                <option value={0} disabled>== Выберите из списка ==</option>
                    {users.map(item => (
                        (item.groups.includes(2)) && item.first_name !== 'самостоятельно' ? 
                            <option key={item.id} value={item.id}>{item.first_name} {item.last_name}</option>
                        : null
                    ))}
                </select>
                : null}
            </label>
            
            <div className={styles.submit}>
                <button type="submit" name='submit'>Добавить</button>
                {loading ? <div className={styles.status_ok}>Загрузка...</div> : null}
                {createStatus ? <div className={createStatus.className}>{createStatus.statusText}</div> : null}
            </div>
            
        </form>
        : <div>Добавлять машины может только менеджер.</div>}
    </div>
    
  )
}


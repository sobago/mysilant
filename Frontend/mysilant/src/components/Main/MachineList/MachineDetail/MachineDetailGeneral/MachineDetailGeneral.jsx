import styles from './MachineDetailGeneral.module.scss';
import React, { useState, useEffect } from 'react'
import DirDescription from '../DirDescription/DirDescription'

function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
  }

export default function MachineDetailGeneral(props) {
    const {directory, userGroup, users, machineProp} = props
    const [disableEditing, setDisableEditing] = useState(true)
    const [machine, setMachine] = useState({})
    const [machineID, setMachineID] = useState()
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
    const [putStatus, setPutStatus] = useState({})
    const [loading, setLoading] = useState(false)
    const csrftoken = getCookie('csrftoken')

    useEffect(() => {
        if (userGroup === 'Менеджер') {
            setDisableEditing(false)
        };
        if (machineProp.hasOwnProperty('machine_model')) {
            setMachine({...machineProp});
        };
      }, [machineProp, userGroup]);
    
    useEffect(() => {
      if (machine.hasOwnProperty('machine_model')) {
          setMachineID(machine.id)
          setMachineModel(machine.machine_model);
          setMachineNumber(machine.machine_number);
          setEngineModel(machine.engine_model);
          setEngineNumber(machine.engine_number);
          setTransmissionModel(machine.transmission_model);
          setTransmissionNumber(machine.transmission_number);
          setDriveAxleModel(machine.drive_axle_model);
          setDriveAxleNumber(machine.drive_axle_number);
          setSteerAxleModel(machine.steer_axle_model);
          setSteerAxleNumber(machine.steer_axle_number);
          setSupplyContract(machine.supply_contract);
          setShippingDate(machine.shipping_date);
          setConsignee(machine.consignee);
          setDeliveryAddress(machine.delivery_address);
          setAdditional(machine.additional);
          setCustomer(machine.customer);
          setServiceCenter(machine.service_center);}
      }, [machine]);
    
    const updateMachineHandler = (e) => {
      e.preventDefault();
      setLoading(true);
      fetch(`http://localhost:8000/api/machines/${machineID}`, {
          method: 'PUT',
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
          setMachine(data);
          setPutStatus({
              'className' : styles.status_ok,
              'statusText': 'Данные обновлены'})
      })
      .catch(error => {
          setPutStatus({
              'className' : styles.status_error,
              'statusText': `Данные не обновлены, ошибка \n ${error}`})
          console.log(error)
      })
      .finally(() => {
          setLoading(false)
      });
    }


  return (
    <div className={styles.machine_detail}>
        <form autoComplete='off' onSubmit={updateMachineHandler}>
            
            {!!machineModel ? <><label>Модель:
                <select disabled={disableEditing}
                    value={machineModel}
                    onChange={e => setMachineModel(e.target.value)} name="" id="">
                                {directory.map(item => (
                                    (item.name_ === "Модель техники") ? 
                                        <option key={item.id} value={item.id}>{item.title}</option>
                                    : null
                                ))}
                </select></label>
                <DirDescription dirID={machineModel} directory={directory}/>
                </>
                                : null}
            {!!machineNumber ? <label>Заводской номер машины:
                <input type="text" disabled={disableEditing}
                    name="machine_number" id=""
                    value={machineNumber}
                    onChange={e => setMachineNumber(e.target.value)}/>
                    </label>: null}
            {!!engineModel ? <><label>Модель двигателя:
                <select disabled={disableEditing}
                    value={engineModel}
                    onChange={e => setEngineModel(e.target.value)} name="" id="">
                                {directory.map(item => (
                                    (item.name_ === "Модель двигателя") ? 
                                        <option key={item.id} value={item.id}>{item.title}</option>
                                    : null
                                ))}
                </select></label>
                <DirDescription dirID={engineModel} directory={directory}/>
                </>
                 : null}
            {!!engineNumber ? <label>Заводской номер двигателя:
                <input type="text" disabled={disableEditing}
                name="engine_number" id=""
                value={engineNumber}
                onChange={e => setEngineNumber(e.target.value)}/>
                </label>: null}
            {!!transmissionModel ? <><label>Модель трансмиссии:
                <select disabled={disableEditing}
                value={transmissionModel}
                onChange={e => setTransmissionModel(e.target.value)} name="" id="">
                                {directory.map(item => (
                                    (item.name_ === "Модель трансмиссии") ? 
                                        <option key={item.id} value={item.id}>{item.title}</option>
                                    : null
                                ))}
                </select></label>
                <DirDescription dirID={transmissionModel} directory={directory}/>
                </>: null}
            {!!transmissionNumber ? <label>Заводской номер трансмиссии:
                <input type="text" disabled={disableEditing}
                name="transmission_number" id=""
                value={transmissionNumber}
                onChange={e => setTransmissionNumber(e.target.value)}/>
                </label>: null}
            {!!driveAxleModel ? <><label>Модель ведущего моста:
                <select disabled={disableEditing}
                value={driveAxleModel}
                onChange={e => setDriveAxleModel(e.target.value)} name="" id="">
                                {directory.map(item => (
                                    (item.name_ === "Модель ведущего моста") ? 
                                        <option key={item.id} value={item.id}>{item.title}</option>
                                    : null
                                ))}
                </select></label>
                <DirDescription dirID={driveAxleModel} directory={directory}/>
                </>: null}
            {!!driveAxleNumber ? <label>Заводской номер ведущего моста:
                <input type="text" disabled={disableEditing}
                name="drive_axle_number" id=""
                value={driveAxleNumber}
                onChange={e => setDriveAxleNumber(e.target.value)}/>
                </label>: null}
            {!!steerAxleModel ? <><label>Модель управляемого моста:
                <select disabled={disableEditing}
                value={steerAxleModel}
                onChange={e => setSteerAxleModel(e.target.value)} name="" id="">
                                {directory.map(item => (
                                    (item.name_ === "Модель управляемого моста") ? 
                                        <option key={item.id} value={item.id}>{item.title}</option>
                                    : null
                                ))}
                </select></label>
                <DirDescription dirID={steerAxleModel} directory={directory}/>
                </>: null}
            {!!steerAxleNumber ? <label>Заводской номер управляемого моста:
                <input type="text" disabled={disableEditing}
                name="steer_axle_number" id=""
                value={steerAxleNumber}
                onChange={e => setSteerAxleNumber(e.target.value)}/>
                </label>: null}
            {!!supplyContract ? <label>Договор поставки №, дата:
                <input type="text" disabled={disableEditing}
                name="supply_contract" id=""
                value={supplyContract}
                onChange={e => setSupplyContract(e.target.value)}/>
                </label>: null}
            {!!shippingDate ? <label>Дата отгрузки с завода:
                <input type="date" disabled={disableEditing}
                name="shipping_date" id=""
                value={shippingDate}
                onChange={e => setShippingDate(e.target.value)}/>
                </label>: null}
            {!!consignee ? <label>Грузополучатель (конечный потребитель):
                <input type="text" disabled={disableEditing}
                name="consignee" id=""
                value={consignee}
                onChange={e => setConsignee(e.target.value)}/>
                </label>: null}
            {!!deliveryAddress ? <label>Адрес поставки (эксплуатации):
                <input type="text" disabled={disableEditing}
                name="delivery_address" id=""
                value={deliveryAddress}
                onChange={e => setDeliveryAddress(e.target.value)}/>
                </label>: null}
            {!!additional ? <label>Комплектация (доп. опции):
                <textarea disabled={disableEditing} name=""
                className={styles.textarea}
                value={additional}
                onChange={e => setAdditional(e.target.value)}/>
                </label>: null}
            {!!customer ? <label>Клиент:
                {userGroup === 'Менеджер' && Object.entries(users).length > 0 ? 
                <select disabled={disableEditing}
                value={customer}
                onChange={e => setCustomer(e.target.value)} name="" id="">
                    {users.map(item => (
                        (item.groups.includes(1)) ? 
                            <option key={item.id} value={item.id}>{item.first_name}</option>
                        : null
                    ))}
                </select>
                : <input type="text" disabled={disableEditing}
                    defaultValue={`${users.find(user => user.id === customer).first_name}`}/>
                }
                </label>: null}
            {!!serviceCenter ? <label>Сервисная компания:
                {userGroup === 'Менеджер' && Object.entries(users).length > 0 ? 
                <select disabled={disableEditing}
                value={serviceCenter}
                onChange={e => setServiceCenter(e.target.value)} name="" id="">
                    {users.map(item => (
                        (item.groups.includes(2)) && item.first_name !== 'самостоятельно' ? 
                            <option key={item.id} value={item.id}>{item.first_name}</option>
                        : null
                    ))}
                </select>
                : <input type="text" disabled={disableEditing}
                    defaultValue={`${users.find(user => user.id === serviceCenter).first_name}`}/>
                }
                </label>: null}
            {userGroup === 'Менеджер' ? 
            <div className={styles.submit}>
                <button type="submit" name='submit'>Изменить</button>
                {loading ? <div className={styles.status_ok}>Загрузка...</div> : null}
                {putStatus ? <div className={putStatus.className}>{putStatus.statusText}</div> : null}
            </div>
            
            : null}
            
        </form>
    </div>
  )
}

import React from 'react'
import { useState } from 'react'
import styles from './TOFilter.module.scss'

export default function TOFilter(props) {
  const {setFilters} = props;
  const [serviceTypeFilter, setServiceTypeFilter] = useState('');
  const [machineFilter, setMachineFilter] = useState('');
  const [serviceCenter, setServiceCenter] = useState('');

  const buildFilter = (e) => {
    e.preventDefault();
    const query = [];
    serviceTypeFilter && query.push(`service_type=${serviceTypeFilter}`);
    machineFilter && query.push(`machine=${machineFilter}`);
    serviceCenter && query.push(`service_center=${serviceCenter}`);
    console.log(`?${query.join('&')}`);
    setFilters(`?${query.join('&')}`)
  };

  const setServiceType = (val) => {
    setServiceTypeFilter(val.toUpperCase())
  };

  const eraseFilter = (e) => {
    e.preventDefault();
    setServiceTypeFilter('');
    setMachineFilter('');
    setServiceCenter('');
    setFilters('')
  }
  return (
    <div className={styles.machine_filters}>
            <p>Фильтр:</p>
            <form className={styles.filters} onSubmit={buildFilter}>
                <input 
                    type="text" 
                    name="service_type" 
                    placeholder='Вид ТО'
                    value={serviceTypeFilter}
                    onChange={e => setServiceType(e.target.value)}
                />
                <input
                    type="text" 
                    name="machine" 
                    placeholder='Зав. номер машины'
                    value={machineFilter}
                    onChange={e => setMachineFilter(e.target.value)}
                />
                <input 
                    type="text" 
                    name="service_center" 
                    placeholder='Сервисная организация'
                    value={serviceCenter}
                    onChange={e => setServiceCenter(e.target.value)}
                />
                <div className={styles.buttons}>
                  <button type='submit' title='Применить фильтры'>Применить</button>
                  <button className={styles.delete_button} onClick={eraseFilter} title='Сброс фильтра'>x</button>
                </div>
            </form>
            
        </div>
  )
}

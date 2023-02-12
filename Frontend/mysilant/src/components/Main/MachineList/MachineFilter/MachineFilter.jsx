import React from 'react'
import { useState } from 'react'
import styles from './MachineFilter.module.scss'

export default function MachineFilter(props) {
  const [modelFilter, setModelFilter] = useState('')
  const [engineFilter, setEngineFilter] = useState('')
  const [transmisFilter, setTransmisFilter] = useState('')
  const [drAxleFilter, setDrAxleFilter] = useState('')
  const [stAxleFilter, setStAxleFilter] = useState('')
  const {setFilters} = props


  const buildFilter = (e) => {
    e.preventDefault();
    const query = [];
    modelFilter && query.push(`machine_model=${modelFilter}`);
    engineFilter && query.push(`engine_model=${engineFilter}`);
    transmisFilter && query.push(`transmission_model=${transmisFilter}`);
    drAxleFilter && query.push(`drive_axle_model=${drAxleFilter}`);
    stAxleFilter && query.push(`steer_axle_model=${stAxleFilter}`);
    console.log(`?${query.join('&')}`);
    setFilters(`?${query.join('&')}`)
  }

  const setModel = (val) => {
    setModelFilter(val.toUpperCase())
  };

  const eraseFilter = (e) => {
    e.preventDefault();
    setModelFilter('');
    setEngineFilter('');
    setTransmisFilter('');
    setDrAxleFilter('');
    setStAxleFilter('');
    setFilters('')
  }
  return (
    <div className={styles.machine_filters}>
            <p>Фильтр:</p>
            <form className={styles.filters} onSubmit={buildFilter}>
                <input 
                    type="text" 
                    name="machine_model" 
                    placeholder='Модель техники'
                    value={modelFilter}
                    onChange={e => setModel(e.target.value)}
                />
                <input 
                    type="text" 
                    name="engine_model" 
                    placeholder='Модель двигателя'
                    value={engineFilter}
                    onChange={e => setEngineFilter(e.target.value)}
                />
                <input 
                    type="text" 
                    name="transmission_model" 
                    placeholder='Модель трансмиссии'
                    value={transmisFilter}
                    onChange={e => setTransmisFilter(e.target.value)}
                />
                <input 
                    type="text" 
                    name="drive_axle_model" 
                    placeholder='Модель ведущего моста'
                    value={drAxleFilter}
                    onChange={e => setDrAxleFilter(e.target.value)}
                />
                <input 
                    type="text" 
                    name="steer_axle_model" 
                    placeholder='Модель управляемого моста'
                    value={stAxleFilter}
                    onChange={e => setStAxleFilter(e.target.value)}
                />
                <div className={styles.buttons}>
                  <button type='submit' title='Применить фильтры'>Применить</button>
                  <button className={styles.delete_button} onClick={eraseFilter} title='Сброс фильтра'>x</button>
                </div>
                
            </form>
            
        </div>
  )
}

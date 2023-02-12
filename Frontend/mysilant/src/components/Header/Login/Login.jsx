import styles from './Login.module.scss'
import React, {useState, useEffect} from 'react';

class AuthError extends Error {
  constructor(message) {
    super(message);
    this.name = "Ошибка";
  }
}

function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
  }

function Login(props) {
    const [loading, setLoading] = useState(false)
    const [formUsername, setFormUsername] = useState('')
    const [formPassword, setFormPassword] = useState('')
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [error, setError] = useState()
    const csrftoken = getCookie('csrftoken')
    const {isLoggedIn, setIsLoggedIn, setUserGroup} = props
  
    useEffect(() => {
      if (isLoggedIn) {
        fetch(
            'http://localhost:8000/api/user',
            {
              headers: {
                'Content-Type': 'application/json;charset=utf-8',
                //'Authorization': `sessionid ${getCookie('sessionid')}`,
                //'X-CSRFToken': csrftoken,
              },
              credentials: 'include',
            },
          )
          .then(response => {
              if (response.ok) {
                return response.json()
              } else {
                if (response.status === 403) {
                  setIsLoggedIn(false)
                  return response.json()
                } else {
                  throw new AuthError(`Код ошибки: ${response.status}`)
                }
                
              }
            })
            .then((resp) => {
              if ('detail' in resp) {
                setError(resp.detail)
              } else if ('data' in resp) {
                  setFirstName(resp.data.first_name);
                  setLastName(resp.data.last_name);
                  setUsername(resp.data.username);
                  setEmail(resp.data.email);
                  setError(null);
                  if (resp.data.is_staff) {
                    setUserGroup('Менеджер')
                  } else if (resp.data.groups.includes(2)) {
                    setUserGroup('Сервисная организация')
                  } else if (resp.data.groups.includes(1)) {
                    setUserGroup('Клиент')
                  } else {
                    setUserGroup('Группа не назначена')
                  } ;
                }
            })
            .catch(error => {
              setError('Произошла ошибка, подробнее в консоли')
              console.log(error);
              setIsLoggedIn(false)
            })
      }
    }, [isLoggedIn, setIsLoggedIn, setUserGroup])
    
    const submitHandler = e => {
      e.preventDefault();
      setLoading(true);
      fetch(
        'http://localhost:8000/api/login',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json;charset=utf-8',
            'X-CSRFToken': csrftoken,
          },
          body: JSON.stringify({
            username: formUsername,
            password: formPassword,
          }),
          credentials: 'include',
        }
      )
      .then(response => {
        if (response.ok) {
          return response.json()
        } else {
          if (response.status === 403) {
            throw new AuthError(`Данные некорректны`)
          } else {
            throw new AuthError(`${response.status} ${response.statusText}`)
          }
          
        }
      })
      .then(({key}) => {
        props.setIsLoggedIn(true);
        setError(null)
      })
      .catch(error => {
        console.log(error);
        setError(`${error}`)
      })
      .finally(setLoading(false))
    }
    
    const logoutHandler = e => {
      e.preventDefault();
      setLoading(true);
      fetch(
        'http://localhost:8000/api/logout',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json;charset=utf-8',
            'X-CSRFToken': csrftoken,
          },
          credentials: 'include',
        }
      )
      .then(response => {
        if (response.ok) {
          return response.json()
        } else {
          throw Error(`Что-то случилось.... Код ошибки: ${response.status}`)
        }
      })
      .then(({key}) => {
        props.setIsLoggedIn(false);
        props.setUserGroup('')
        setError(null)
      })
      .catch(error => {
        console.log(error);
        setError('Ошибка, подробности в консоли')
      })
      .finally(setLoading(false))
    }
  
    return (
      <div className={styles.login}>
        
        {!props.isLoggedIn ?
          loading ? "Загрузка..." :
            <form className={styles.login_form} onSubmit={submitHandler}>
              <input type="text"
                name="username"
                value={formUsername}
                onChange={e => setFormUsername(e.target.value)}
                placeholder="Логин" />
              <input type="password"
                name="password"
                value={formPassword}
                onChange={e => setFormPassword(e.target.value)}
                placeholder="Пароль" />
              <input type="submit" name='submit' value={"Войти"} />
            </form>
            :
            !error ?
              <div className={styles.profile}>
                <p>Имя: {firstName} {lastName} ({username})</p>
                <p>Группа: {props.userGroup}</p>
                {email ? <p>email: {email}</p> : null}
                <button onClick={logoutHandler}>Выйти</button>
              </div>
              : null
        }
        {error ? 
          error === "Учетные данные не были предоставлены." ? null :
          <p className={styles.error_message}>{error}</p> 
          : null }
      </div>
    );
  }
  
  export default Login;
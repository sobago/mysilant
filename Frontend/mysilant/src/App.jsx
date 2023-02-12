import './fonts/PT-Astra-Sans_Regular.woff2';
import './fonts/PT-Astra-Sans_Italic.woff2';
import './fonts/PT-Astra-Sans_Bold.woff2';
import './fonts/PT-Astra-Sans_Bold-Italic.woff2';
import styles from './App.module.scss';
import Header from './components/Header/Header';
import MainAnon from './components/Main/MainAnon';
import Footer from './components/Footer/Footer';
import React, { useState, Suspense } from 'react';

const Main = React.lazy(() => import('./components/Main/Main'));

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(true)
  const [userGroup, setUserGroup] = useState('')

  return (
    <div className={styles.container}>
      <Header
        isLoggedIn={isLoggedIn}
        setIsLoggedIn={setIsLoggedIn}
        userGroup={userGroup}
        setUserGroup={setUserGroup}
      />
      <main className={styles.main}>
        {!isLoggedIn && !userGroup ?
          <MainAnon/>
          : <Suspense fallback={<div>Загрузка...</div>}>
              <Main userGroup={userGroup}/>
            </Suspense>
        }
      </main>
      <Footer/>
    </div>
  );
}

export default App;

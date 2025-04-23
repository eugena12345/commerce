import { Outlet } from 'react-router';
import Header from '../components/Header'
import styles from './App.module.scss';
import { useQueryParamsStoreInit } from '../store/RootStore/hooks/useQueryParamsStoreInit';
import rootStore from '../store/RootStore/instance';
import { RootStoreContext } from '../store/RootStore/context/rootStoreContext';
//import { HashRouter as Router } from 'react-router-dom'; //, Routes 


function App() {
  useQueryParamsStoreInit();

  return (
    <RootStoreContext.Provider value={rootStore}>
      {/* <Router > */}
        <div className={styles.app}>
          <Header />
          <Outlet />
        </div>
     {/* </Router> */}
    </RootStoreContext.Provider>

  );
}

export default App;

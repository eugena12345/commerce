import { Outlet } from 'react-router';
import Header from '../components/Header'
import styles from './App.module.scss';
import { useQueryParamsStoreInit } from '../store/RootStore/hooks/useQueryParamsStoreInit';
import rootStore from '../store/RootStore/instance';
import { RootStoreContext } from '../store/RootStore/context/rootStoreContext';
//import { HashRouter as Router } from 'react-router-dom';


function App() {
  useQueryParamsStoreInit();

  return (
   // <Router>
      <RootStoreContext.Provider value={rootStore}>
        <div className={styles.app}>
          <Header />
          <Outlet />
        </div>
      </RootStoreContext.Provider>
   // </Router>

  );
}

export default App;

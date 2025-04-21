import { Outlet } from 'react-router';
import Header from '../components/Header'
import styles from './App.module.scss';
import { useQueryParamsStoreInit } from '../store/RootStore/hooks/useQueryParamsStoreInit';
import rootStore from '../store/RootStore/instance';
import { RootStoreContext } from '../store/RootStore/context/rootStoreContext';
//import { HashRouter as Router, Routes } from 'react-router-dom';


function App() {
  useQueryParamsStoreInit();

  return (
    // <Router basename='/commerce'>
    //   <Routes>
        <RootStoreContext.Provider value={rootStore}>
          <div className={styles.app}>
            <Header />
            <Outlet />
          </div>
        </RootStoreContext.Provider>
    //   </Routes>
    // </Router>

  );
}

export default App;

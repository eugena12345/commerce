import { Outlet } from 'react-router';
import Header from '../components/Header'
import styles from './App.module.scss';
import { useQueryParamsStoreInit } from '../store/RootStore/hooks/useQueryParamsStoreInit';

function App() {
  useQueryParamsStoreInit();

  return (
    <div className={styles.app}>
      <Header/>
      <Outlet />
    </div>
  );
}

export default App;

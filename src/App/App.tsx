import { Outlet } from 'react-router';
import Header from '../components/Header'
import styles from './App.module.scss';

function App() {
  return (
    <div className={styles.app}>
      <Header/>
      <Outlet />
    </div>
  );
}

export default App;

//import { useState } from 'react'
//import reactLogo from './assets/react.svg'
//import viteLogo from '/vite.svg'
//import './App.css'
//import React from 'react'

import { Outlet } from 'react-router';

//import './App.css';

//import CatalogPage from './pages/CatalogPage'
import Header from '../components/Header'
//import ProductPage from 'App/pages/ProductPage/ProductPage';

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







// function App() {
//  // const [count, setCount] = useState(0)

//   return (
//     <div>
//       <Header/>
//      {/* <CatalogPage /> */}
//         <ProductPage></ProductPage>
//     </div>
//   )
// }

// export default App

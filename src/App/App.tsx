//import { useState } from 'react'
//import reactLogo from './assets/react.svg'
//import viteLogo from '/vite.svg'
import './App.css'
import React from 'react'
import CatalogPage from './pages'
import Header from './components/Header'

function App() {
 // const [count, setCount] = useState(0)

  return (
    <div>
      <Header/>
      <div><CatalogPage />
        </div>
    </div>
  )
}

export default App

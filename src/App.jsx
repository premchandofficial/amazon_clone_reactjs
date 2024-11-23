import React from 'react'
import { BrowserRouter as Router, Routes,Route } from 'react-router-dom'
import Home from './pages/Home'
import Cartpage from './pages/Cartpage'

function App() {
  return (
    <>
       <Router>
          <Routes>
             <Route path='/' element={<Home/>}/>
             <Route path='/cartpage' element={<Cartpage/>}/>
          </Routes>
       </Router>
    </>
  )
}

export default App
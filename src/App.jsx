import { useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import MyContext from './context/MyContext'
import Login from './components/login'
import Signup from "./components/signup"
import Dashboard from './components/dashboard'



function App() {
  // const [token, setToken] = useState("")
  console.log("app rendered")


  return (
    <MyContext.Provider value={{ 
      tokenObj: {
        token: "",
        msg: ""
      }
      }}>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Signup/>}/>
          <Route path='/login' element={<Login/>}/>
          <Route path='/dashboard' element={<Dashboard/>}/>
        </Routes>
      </BrowserRouter>
    </MyContext.Provider>
  )
}

export default App
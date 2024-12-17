import { useState, useEffect, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import MyContext from '../context/MyContext'
import axios from 'axios';

function Dashboard() {
  const {tokenObj} = useContext(MyContext)
  const [joke, setJoke] = useState("")
  const nav = useNavigate();

  useEffect(() => {
    if (!localStorage.getItem("token")) {
      nav("/login")
    }
  }, [])

  if (!tokenObj.token && localStorage.getItem("token")) {
    tokenObj.token = localStorage.getItem("token")
  }


  useEffect(() => {
    if (tokenObj.token) {
      async function fetchData() {
        try {
          const response = await axios.get("https://instagram-express-app.vercel.app/api/auth/zuku", {
            headers: {
              Authorization: `Bearer ${tokenObj.token}`
            }
          });
          console.log(response.data.data.message)
          setJoke(response.data.data.message)
        } catch (error) {
          console.log(error.response.data)
        }
      }
      fetchData()
    }
  }, [])


  async function handleLogout() {
    try {
      const response = await axios.delete("https://instagram-express-app.vercel.app/api/auth/logout", {
        headers: {
          Authorization: `Bearer ${tokenObj.token}`
        }
      });
      console.log(response.data)
      alert(`Adios, ${response.data.data.name}, You've been logged out.`)
      localStorage.removeItem("token")
      tokenObj.token = "";
      nav("/login")
    } catch (error) {
      console.log(error.response.data)
    }
  }


  return (
    <div>
      <button style={{position: "absolute", right: 10, top: 10}} onClick={handleLogout}>Log out</button>
      <h2 style={{position: "absolute", top: "30%", left: 30}}>{joke}</h2>
    </div>
  )
}

export default Dashboard
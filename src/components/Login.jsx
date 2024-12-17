import { useState, useEffect, useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import MyContext from '../context/MyContext'
import axios from 'axios'

function Login() {
    const [user, setUser] = useState({})
    const {tokenObj} = useContext(MyContext)
    const nav = useNavigate();

    useEffect(() => {
        if (localStorage.getItem("token")) {
            nav("/dashboard")
        }
    }, []);

    function handleChange(e) {
        setUser({...user, [e.target.name]: e.target.value})
    }
    // console.log("first")


    async function handleSubmit(e) {
        e.preventDefault();
        try {
            const response = await axios.post("https://instagram-express-app.vercel.app/api/auth/login", user)
            console.log("🔥LoginData", response.data.data.token)
            // setToken(response.data.data.token)
            tokenObj.token = response.data.data.token
            console.log("🚀 tokenObj.token:", tokenObj.token)
            if (tokenObj.token) {
                console.log("local")
                localStorage.setItem("token", tokenObj.token)
                nav("/dashboard")
            }
        } catch (error) {
            console.log(error.response.data)
        }
    }
    
  return (
    <div>
        <form onSubmit={handleSubmit}>
            <h1>Login form</h1>
            <label>
                Email: 
                <input type="email" name="email" placeholder="Email address" onChange={handleChange}/>
            </label>
            <br />
            <label>
                Password:
                <input type="text" name="password" placeholder="Enter your password" onChange={handleChange}/>
            </label>
            <br />
            <p>New here? <Link to="/">Go to Signup</Link></p>
            <br />
            <button type='submit'>Log In</button>
        </form>
    </div>
  )
}

export default Login
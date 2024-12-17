import { Link, useNavigate } from 'react-router-dom'
import {useState, useEffect, useContext} from 'react'
import axios from 'axios'
import MyContext from '../context/MyContext'


function Signup() {
// const {token} = useContext(MyContext)
const [user, setUser] = useState({})
const navigate = useNavigate();


useEffect(() => {
    if (localStorage.getItem("token")) {
        navigate("/dashboard")
    }
}, []);

function handleChange(e) {
    setUser({...user, [e.target.name]: e.target.value})
    // console.log("change", user)
}



async function handleSubmit(e) {
    e.preventDefault()
    console.log("submit")
    try {
        const response = await axios.post("https://instagram-express-app.vercel.app/api/auth/signup", user);
        console.log("🔥SignupData", response.data)
        // setToken(response.data.data.token)
        
        navigate("/login")
    } catch (error) {
        console.log(error.response.data)
    }
}



  return (
    <div>
        <form onSubmit={handleSubmit}>
            <h1>Sign up form</h1>
            <label>
                Username: 
                <input type="text" name="name" placeholder="Enter your username" onChange={handleChange}/>
            </label>
            <br />
            <label>
                Email:
                <input type="email" name="email" placeholder="Email Address" onChange={handleChange}/>
            </label>
            <br />
            <label>
                Password:
                <input type="password" name="password" placeholder="Enter your password" onChange={handleChange}/>
            </label>
            <br />
            <label>
                Confirm Password:
                <input type="password" name="confirmPassword" placeholder="Confirm your password" onChange={handleChange}/>
            </label>
            <br />
            <p>Already Signed up? <Link to="/login">Go to login</Link></p>
            <br />
            <button type='submit'>Sign up</button>
        </form>
    </div>
  )
}

export default Signup
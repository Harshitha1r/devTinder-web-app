import axios from "axios"
import { useState } from "react"
import { useDispatch } from "react-redux"
import { adduser } from "./state/slice"
import { useNavigate } from "react-router-dom"
const Login = () => {
    const [email, setEmail] = useState("")
    const [password, setPass] = useState("")
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const formHandler = async () => {
        const res = await axios.post("http://localhost:7000/login", {
            email, password
        }, { withCredentials: true })
        if (res?.data?.data) {
            navigate("/Home")
            dispatch(adduser(res?.data))
        }
    }
    return (
        <div className="h-115 bg-gray-900 flex justify-center items-center">
            <div className="h-90 w-90 bg-black rounded-xl flex items-center flex-col">
                <span className="text-white text-xl m-2 font-bold">Login</span>
                <label className="text-white text-md m-2 pr-70">Email</label>
                <input type="text" className="bg-gray-900 border-white text-white h-10 w-80 rounded-xl shadow-xl" value={email} onChange={(e) => setEmail(e.target.value)} />
                <label className="text-white text-md m-2 pr-65">Password</label>
                <input type="password" className="bg-gray-900 text-white h-10 w-80 rounded-xl shadow-xl" value={password} onChange={(e) => setPass(e.target.value)} />
                <button className="text-black bg-purple-500 cursor-pointer font-bold h-10 w-80 mt-10 rounded-xl" onClick={formHandler}>Submit</button>
            </div>
        </div>
    )
}

export default Login
import axios from "axios"
import { useEffect, useState } from "react"
import { useDispatch } from "react-redux"
import { adduser } from "../state/slice"
import { useNavigate } from "react-router-dom"
const Login = () => {
    const [email, setEmail] = useState("")
    const [password, setPass] = useState("")
    const [disabled,setDisabled]=useState(true)
    const [err,setErr]=useState("")
    const dispatch = useDispatch();
    const navigate = useNavigate();
    useEffect(()=>{
        if(email!="" && password!=""){
            setDisabled(false)
        }
    },[email,password])
    const formHandler = async () => {
        try{
        const res = await axios.post("http://localhost:7000/login", {
            email, password
        }, { withCredentials: true })
        if (res?.data?.data) {
            dispatch(adduser(res?.data))
            return navigate("/Home")
        }}catch(err){
            setErr(err.response.data.message)
        }
    }
    return (
        <div className="bg-[url('https://media.istockphoto.com/id/1295386416/photo/thank-you-for-your-time.jpg?s=612x612&w=0&k=20&c=XZeqJR6QR0GHcdxVKGXcmqzM2dnc6HKD5hd2Jhbq5IA=')]  bg-no-repeat bg-right h-125 flex items-center" >
            <div className="h-90 w-90 bg-black rounded-xl flex items-center flex-col ml-20">
                <span className="text-white text-xl m-6 font-bold">Login</span>
                <input placeholder="Email" type="text" className="bg-gray-900 border-white m-3 text-white h-10 w-80 rounded-xl shadow-xl" value={email} onChange={(e) => setEmail(e.target.value)} />
                <input placeholder="Password" type="password" className="bg-gray-900 text-white m-3 h-10 w-80 rounded-xl shadow-xl" value={password} onChange={(e) => setPass(e.target.value)} />
                {err && <p className="text-red-300 mt-3">Error:{err}</p>}
                <button className={`text-black font-bold h-10 w-80 mt-5 rounded-xl ${
    disabled ? 'bg-gray-700 cursor-not-allowed' : 'bg-purple-500 cursor-pointer'}`} onClick={formHandler}>Submit</button>
                <p className="text-white m-4">New User ? <button className="text-white cursor-pointer" onClick={()=>navigate('/SignUp')}>Sign Up</button></p>
            </div>
        </div>
    )
}

export default Login
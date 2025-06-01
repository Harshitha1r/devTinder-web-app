import axios from "axios"
import { useState } from "react"
import { useDispatch } from "react-redux"
import { adduser } from "../state/slice"
import { useNavigate } from "react-router-dom"
const SignUp = () => {
    const [formValue,setFormvalues]=useState({firstName:"",lastName:""
        ,email:"",password:""})
    const [err,setErr]=useState("")
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const formHandler = async () => {
        try{
        const res = await axios.post("http://localhost:7000/signup", {
            firstName:formValue.firstName,lastName:formValue.lastName,email:formValue.email,password:formValue.password
        }, { withCredentials: true })
        console.log(res)
        if (res?.data?.data) {
            dispatch(adduser(res?.data))
            return navigate("/Profile")
        }}catch(err){
            console.log(err)
            setErr(err.response.data.message)
        }
    }
    const handleChange = (e) => {
    const { name, value } = e.target;
    setFormvalues({
      ...formValue,
      [name]: value,
    });
  };
    return (
        <div className="bg-[url('https://media.istockphoto.com/id/1295386416/photo/thank-you-for-your-time.jpg?s=612x612&w=0&k=20&c=XZeqJR6QR0GHcdxVKGXcmqzM2dnc6HKD5hd2Jhbq5IA=')]  bg-no-repeat bg-right h-125 flex items-center" >
            <div className="h-110 w-100 bg-black rounded-xl flex items-center flex-col ml-20">
                <span className="text-white text-xl m-2 font-bold">SignUp</span>
                <label className="text-white text-md pr-60">FirstName</label>
                <input type="text" className="bg-gray-900 border-white text-white h-10 w-80 rounded-xl shadow-xl" name="firstName" value={formValue.firstName} onChange={handleChange} />
                <label className="text-white text-md m-2 pr-60">LastName</label>
                <input type="text" className="bg-gray-900 border-white text-white h-10 w-80 rounded-xl shadow-xl" name="lastName" value={formValue.lastName} onChange={handleChange} />
                <label className="text-white text-md m-2 pr-70">Email</label>
                <input type="text" className="bg-gray-900 border-white text-white h-10 w-80 rounded-xl shadow-xl" name="email" value={formValue.email} onChange={handleChange} />
                <label className="text-white text-md m-2 pr-65">Password</label>
                <input type="password" className="bg-gray-900 text-white h-10 w-80 rounded-xl shadow-xl" name="password" value={formValue.password} onChange={handleChange} />
                {err && <p className="text-red-300 mt-3">Error:{err}</p>}
                <button className="text-black bg-purple-500 cursor-pointer font-bold h-10 w-80 mt-5 rounded-xl" onClick={formHandler}>Submit</button>
                <p className="text-white m-4">Already Have an Account ? <button className="text-white cursor-pointer" onClick={()=>navigate('/Login')}>Login</button></p>
            </div>
        </div>
    )
}

export default SignUp
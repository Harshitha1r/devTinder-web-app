import axios from "axios"
import { useEffect, useState } from "react"
import { useDispatch } from "react-redux"
import { adduser } from "../state/slice"
import { useNavigate } from "react-router-dom"
const SignUp = () => {
    const [formValue,setFormvalues]=useState({firstName:"",lastName:""
        ,email:"",password:"",gender:""})
    const [disabled,setDisabled]=useState(true)
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const formHandler = async () => {
        try{
        const res = await axios.post("http://localhost:7000/signup", {
            firstName:formValue.firstName,lastName:formValue.lastName,email:formValue.email,password:formValue.password,gender:formValue.gender
        }, { withCredentials: true })
        console.log(res)
        if (res?.data?.data) {
            dispatch(adduser(res?.data))
            return navigate("/Profile")
        }}catch(err){
            alert(err.response.data.message)
        }
    }
    useEffect(()=>{
        if(formValue.firstName!=""&&formValue.lastName!=""&&formValue.email!=""&&formValue.password!=""&&formValue.gender!=""){
            setDisabled(false)
        }
    })
    const handleChange = (e) => {
    const { name, value } = e.target;
    console.log(name,value)
    setFormvalues({
      ...formValue,
      [name]: value,
    });
  };
    return (
        <div className="bg-[url('https://media.istockphoto.com/id/1295386416/photo/thank-you-for-your-time.jpg?s=612x612&w=0&k=20&c=XZeqJR6QR0GHcdxVKGXcmqzM2dnc6HKD5hd2Jhbq5IA=')]  bg-no-repeat bg-right h-125 flex items-center" >
            <div className="h-110 w-100 bg-black rounded-xl flex items-center flex-col ml-20">
                <span className="text-white text-xl m-2 font-bold">SignUp</span>
                <input type="text" className="bg-gray-900 border-white text-white h-10 w-80 rounded-xl shadow-xl m-2" placeholder="FirstName" name="firstName" value={formValue.firstName} onChange={handleChange} required/>
                <input type="text" className="bg-gray-900 border-white text-white h-10 w-80 rounded-xl shadow-xl m-2" placeholder="LastName" name="lastName" value={formValue.lastName} onChange={handleChange} required/>
                <input type="text" className="bg-gray-900 border-white text-white h-10 w-80 rounded-xl shadow-xl m-2" placeholder="Email" name="email" value={formValue.email} onChange={handleChange} required/>
                <input type="password" className="bg-gray-900 text-white h-10 w-80 rounded-xl shadow-xl m-2" placeholder="Password" name="password" value={formValue.password} onChange={handleChange} required/>
                <select className="bg-gray-900 text-white h-10 w-80 rounded-xl shadow-xl m-2" value={formValue.gender} name="gender" onChange={handleChange} required>
                      <option value="" disabled>Select a Gender</option>
                    <option value="Male">Male</option><option value="Female">Female</option></select>
                <button className={`text-black font-bold h-10 w-80 mt-5 rounded-xl ${
    disabled ? 'bg-gray-700 cursor-not-allowed' : 'bg-purple-500 cursor-pointer'}`} onClick={formHandler} disabled={disabled}>Submit</button>
                <p className="text-white m-4">Already Have an Account ? <button className="text-white cursor-pointer" onClick={()=>navigate('/Login')}>Login</button></p>
            </div>
        </div>
    )
}

export default SignUp
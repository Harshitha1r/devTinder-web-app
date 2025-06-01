import { useState } from "react"
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { adduser } from "../state/slice";

const Profile=()=>{
    const userData = useSelector((store) => store.user.data);
    const [formValue,setFormvalues]=useState({firstName:userData?.firstName,lastName:userData?.lastName
        ,age:userData?.age,photoUrl:userData?.photoUrl,skills:userData?.skills,about:userData?.about})
    const [message,setMessage]=useState("")
    const dispatch=useDispatch();
    const handleChange = (e) => {
    const { name, value } = e.target;
    setFormvalues({
      ...formValue,
      [name]: value,
    });
  };
  setTimeout(()=>{
    if(message){
        setMessage("")
    }
  },3000)
  const updateInfo=async()=>{
    try{
        const res=await axios.patch("http://localhost:7000/profile/edit",{firstName:formValue.firstName,lastName:formValue.lastName,
            age:formValue.age,photoUrl:formValue.photoUrl
        },{withCredentials:true})     
        dispatch(adduser(res?.data))
        setMessage("Profile Updated Successfully")   
    }
    catch(err){
        setMessage(err?.response?.data)
    }
  }
    return(
        <div className="h-123 bg-white-900 flex justify-center items-center">
            <div className="h-110 w-120 bg-gray-500 rounded-xl flex flex-wrap items-center flex-col">
                <span className="text-white text-xl m-2 font-bold">Profile Information</span>
                <label className="text-white text-md m-1 pr-63">FirstName</label>
                <input type="text" className="bg-gray-900 border-white text-white h-10 w-80 rounded-md shadow-xl" name="firstName" value={formValue.firstName} onChange={handleChange} />
                <label className="text-white text-md m-1 pr-65">Lastname</label>
                <input type="text" className="bg-gray-900 text-white h-10 w-80 rounded-md shadow-xl" name="lastName" value={formValue.lastName} onChange={handleChange} />
                <label className="text-white text-md m-1 pr-73">Age</label>
                <input type="text" className="bg-gray-900 text-white h-10 w-80 rounded-md shadow-xl" name="age" value={formValue.age} onChange={handleChange} />
                <label className="text-white text-md m-1 pr-65">photoUrl</label>
                <input type="text" className="bg-gray-900 text-white h-10 w-80 rounded-md shadow-xl" name="photoUrl" value={formValue.photoUrl} onChange={handleChange} />
                <label className="text-white text-md m-1 pr-70">About</label>
                <textarea type="text" className="bg-gray-900 text-white h-10 w-80 rounded-md shadow-xl" name="about" value={formValue.about} onChange={handleChange} />
                <button className="block mx-auto text-xl font-bold bg-white w-20 h-5 m-5 rounded-xl cursor-pointer"
                onClick={updateInfo}>Save Changes</button>
            </div>
            <div style={{
            width: "400px",
            height: "400px",
            backgroundColor: "Crimson",
        }}
            className="rounded-xl ml-20" >
                <img src={formValue.photoUrl || "https://static.vecteezy.com/system/resources/previews/027/448/973/non_2x/avatar-account-icon-default-social-media-profile-photo-vector.jpg"} className="h-70 w-100"/>
                <h1 className="text-2xl font-bold text-center text-gray-900 dark:text-white">{formValue.firstName} {formValue.lastName}</h1>
                <p className="text-white text-center">Age : {formValue.age}</p>
                <p className="text-white text-center">{formValue.about}</p>
        </div>
        {message &&
        <div id="toast-top-right" class="fixed flex items-center w-full max-w-xs p-4 space-x-4 text-gray-500 bg-white divide-x rtl:divide-x-reverse divide-gray-200 rounded-lg shadow-sm top-5 right-5 dark:text-gray-400 dark:divide-gray-700 dark:bg-gray-800" role="alert">
            <div class="text-sm font-normal text-white">{message}</div>
        </div>}
        </div>
    )
}

export default Profile
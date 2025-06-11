import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { adduser } from "../state/slice";

const Profile=()=>{
    const userData = useSelector((store) => store.user.loggedUser);
    const [formValue,setFormvalues]=useState({firstName:"",lastName:""
        ,age:"",photoUrl:"",about:"",techStack:[],expLevel:"",role:""})
    const [message,setMessage]=useState("")
    const [nextPage,setNext]=useState(false)
    const dispatch=useDispatch();
    const handleChange = (e) => {
    const { name, value } = e.target;
    setFormvalues({
      ...formValue,
      [name]: value,
    });
  };
  useEffect(()=>{
    setFormvalues({firstName:userData?.data?.firstName || "",lastName:userData?.data?.lastName || ""
        ,age:userData?.data?.age || "",photoUrl:userData?.data?.photoUrl || "",about:userData?.data?.about ||"",
        techStack:userData?.data?.techStack || [],expLevel:userData?.data?.experienceLevel || "",role:userData?.data?.role || ""})
  },[userData])
  setTimeout(()=>{
    if(message){
        setMessage("")
    }
  },3000)
  console.log(formValue)
  const updateInfo=async()=>{
    try{
        const res=await axios.patch("http://localhost:7000/profile/edit",{firstName:formValue.firstName,lastName:formValue.lastName,
            age:formValue.age,photoUrl:formValue.photoUrl,about:formValue.about,experienceLevel:formValue.expLevel,
            role:formValue.role,techStack:formValue.techStack
        },{withCredentials:true})     
        dispatch(adduser(res?.data))
        setMessage("Profile Updated Successfully")   
    }
    catch(err){
        setMessage(err?.response?.data)
    }
  }
    return(
        <div className="h-123 bg-neutral-400 flex justify-center items-center">
            <div className="h-120 w-120 bg-gray-500 rounded-xl flex flex-wrap flex-col justify-between">
                {!nextPage ? 
                <>
                <span className="text-white text-xl m-2 font-bold">Basic Info</span>
                <label className="text-white text-md m-3 items-center flex">FirstName
                <input type="text" className="bg-gray-400 border-white ml-6 text-white p-5 h-10 w-80 rounded-md shadow-xl" name="firstName" value={formValue.firstName} onChange={handleChange} /></label>
                <label className="text-white text-md m-3 items-center flex">Lastname
                <input type="text" className="bg-gray-400 text-white ml-7 h-10 p-5 w-80 rounded-md shadow-xl" name="lastName" value={formValue.lastName} onChange={handleChange} /></label>
                <label className="text-white text-md m-3 items-center flex">Age
                <input type="text" className="bg-gray-400 text-white ml-17 h-10 p-5 w-80 rounded-md shadow-xl" name="age" value={formValue.age} onChange={handleChange} /></label>
                <label className="text-white text-md m-3 items-center flex">photoUrl
                <input type="text" className="bg-gray-400 text-white ml-8 h-10 p-5 w-80 rounded-md shadow-xl" name="photoUrl" value={formValue.photoUrl} onChange={handleChange} /></label>
                <label className="text-white text-md m-3 items-center flex">About
                <textarea type="text" className="bg-gray-400 text-white ml-13 p-2 h-20 w-80 rounded-md shadow-xl" name="about" value={formValue.about} onChange={handleChange} /></label>
                <button class="w-20 block m-auto btn btn-outline btn-info" onClick={()=>setNext(true)}>Next</button>
                </>:
                <>
                <span className="text-white text-xl m-2 font-bold">Technical Info</span>
                <label className="text-white text-md m-3 items-center flex">TechStack
                <textarea type="text" className="bg-gray-400 border-white ml-6 text-white p-5 h-20 w-80 rounded-md shadow-xl" name="techStack" value={formValue.techStack} onChange={handleChange} /></label>
                <label className="text-white text-md m-3 items-center flex">Exp.Level
                <select className="bg-gray-400 text-white ml-8 h-10 w-80 rounded-md shadow-xl m-2" name="expLevel" value={formValue.expLevel} onChange={handleChange} required>
                <option value="Beginner">Beginner</option>
                <option value="Intermediate">Intermediate</option>
                <option value="Expert">Expert</option>
                </select>
                </label>
                <label className="text-white text-md m-3 items-center flex">Role
                <input type="text" className="bg-gray-400 text-white ml-17 h-10 p-5 w-80 rounded-md shadow-xl" name="role" value={formValue.role} onChange={handleChange} /></label>
                <div className="flex items-center justify-center gap-2 p-3"><button class="w-40 btn btn-outline btn-info" onClick={()=>setNext(false)}>Cancel</button>
                <button class="w-40 btn btn-accent" onClick={updateInfo}>Submit</button></div>
                </>
                }
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
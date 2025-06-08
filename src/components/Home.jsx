import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import UserCard from "./userCard";

const Home = () => {
    const [profiles, setProfiles] = useState([])
    const [message,setMessage]=useState("")
    const [page,setPage]=useState(1)
    const navigate=useNavigate();
    async function fetchProfile() {
        try {
            const res = await axios.get('http://localhost:7000/user/feed?page='+1+'&limit='+5, { withCredentials: true })
            setProfiles(res?.data?.profiles)
        }
        catch (err) {
      if (err.status === 400) {
        navigate("/login");
      }
    }
    }
    useEffect(() => {
        fetchProfile();
    }, [page])
      setTimeout(()=>{
    if(message){
        setMessage("")
    }
  },3000)

    return (
        <div className="h-123 bg-white flex justify-center items-center">
            <div className="relative">
                {profiles.length ? (profiles.map(profile => (
                    <UserCard profile={profile} setProfiles={setProfiles} profiles={profiles} key={profile._id} setMessage={setMessage} setPage={setPage} fetchProfile={fetchProfile}/>
                ))) : <p className="text-black">That's all Your recommendations for today</p>}
                                    {message &&
        <div id="toast-top-right" className="fixed flex items-center w-full max-w-xs p-4 space-x-4 text-gray-500 bg-white divide-x rtl:divide-x-reverse divide-gray-200 rounded-lg shadow-sm top-5 right-5 dark:text-gray-400 dark:divide-gray-700 dark:bg-gray-800" role="alert">
            <div className="text-sm font-normal text-white">{message}</div>
        </div>}
            </div>
        </div>
    )
}

export default Home
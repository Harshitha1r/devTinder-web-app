import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import UserCard from "./userCard";

const Home = () => {
    const [profiles, setProfiles] = useState([])
    const [message,setMessage]=useState("")
    async function fetchProfile() {
        try {
            const res = await axios.get('http://localhost:7000/user/feed', { withCredentials: true })
            setProfiles(res?.data?.profiles)
        }
        catch (err) {

        }
    }

    useEffect(() => {
        fetchProfile();
    }, [])
      setTimeout(()=>{
    if(message){
        setMessage("")
    }
  },3000)

    return (
        <div className="h-123 bg-gray-900 flex justify-center items-center">
            <div className="relative">
                {profiles ? (profiles.map(profile => (
                    <UserCard profile={profile} setProfiles={setProfiles} profiles={profiles} key={profile._id} setMessage={setMessage}/>
                ))) : " No records found"}
                                    {message &&
        <div id="toast-top-right" class="fixed flex items-center w-full max-w-xs p-4 space-x-4 text-gray-500 bg-white divide-x rtl:divide-x-reverse divide-gray-200 rounded-lg shadow-sm top-5 right-5 dark:text-gray-400 dark:divide-gray-700 dark:bg-gray-800" role="alert">
            <div class="text-sm font-normal text-white">{message}</div>
        </div>}
            </div>
        </div>
    )
}

export default Home
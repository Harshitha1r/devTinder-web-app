import axios from "axios"
import { useRef, useState } from "react";

const UserCard = ({ profile,profiles,setProfiles,setMessage,setPage }) => {
    const [x, setX] = useState(0);
    const removeCard=async(value,status)=>{
        try{
        if(profiles.length==1){
            setPage(prev=>prev+1)
        }
        let arr=profiles.filter(val=>val._id!==value)
        setProfiles(arr)
        const res=await axios.post(`http://localhost:7000/request/send/${status}/${value}`,{},{withCredentials:true})
        setMessage(res?.data?.message)
        }
        catch(err){
            console.log(err)
        }
    }
    const [isDragging, setIsDragging] = useState(false);
  const startXRef = useRef(0);

  const handleTouchStart = (e) => {
    startXRef.current = e.clientX;
    setIsDragging(true);
  };

  const handleTouchMove = (e) => {
    if (isDragging) {
      const currentX = e.clientX;
      const delta = currentX - startXRef.current;
      setX(delta);
    }
  };

  const handleTouchEnd = () => {
    if (x > 100) {
      removeCard(profile._id,"intrested")
    } else if (x < -100) {
      removeCard(profile._id,"ignored")
    }
    setX(0);
    setIsDragging(false);
  };
    return (
        <div style={{
            position: "absolute",
            transform: `translate(-50%, -50%) translateX(${x}px)`,
            width: "400px",
            height: "400px",
            backgroundColor: "Crimson",
            transition: isDragging ? "none" : "transform 0.3s ease",
            cursor:'grab'
        }}
            className="rounded-xl"
            onMouseDown={handleTouchStart}
            onMouseMove={handleTouchMove}
            onMouseUp={handleTouchEnd} 
            onMouseLeave={handleTouchEnd}>
                <img src={profile.photoUrl ? profile.photoUrl : "https://static.vecteezy.com/system/resources/previews/027/448/973/non_2x/avatar-account-icon-default-social-media-profile-photo-vector.jpg"} className="h-60 w-100"/>
                <h1 className="text-2xl font-bold text-center text-gray-900 dark:text-white">{profile.firstName} {profile.lastName}</h1>
                {profile.age && <p className="text-white text-center">Age : {profile.age}</p>}
                {profile.about && <p className="text-white text-center">{profile.about}</p>}
                <button className="text-xl font-bold bg-gray-400 p-2 w-40 m-5 rounded-xl cursor-pointer" onClick={()=>removeCard(profile._id,"ignored")}>Ignore ❌</button>
                <button className="text-xl font-bold bg-red-300 p-2 w-40 m-5 rounded-xl cursor-pointer" onClick={()=>removeCard(profile._id,"intrested")}>Intrested ❤️</button>
        </div>


    )
}
export default UserCard
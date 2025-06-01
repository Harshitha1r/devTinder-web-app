import axios from "axios"

const UserCard = ({ profile,profiles,setProfiles,setMessage }) => {
    const removeCard=async(value,status)=>{
        try{
        let arr=profiles.filter(val=>val._id!==value)
        setProfiles(arr)
        const res=await axios.post(`http://localhost:7000/request/send/${status}/${value}`,{},{withCredentials:true})
        setMessage(res?.data?.message)
        }
        catch(err){
            console.log(err)
        }
    }
    return (
        <div style={{
            position: "absolute",
            transform: "translate(-50%, -50%)",
            width: "400px",
            height: "400px",
            backgroundColor: "Crimson",
        }}
            className="rounded-xl" >
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
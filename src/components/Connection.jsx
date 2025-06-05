import axios from "axios"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"

const Connections=()=>{
    const [connections,setConnection]=useState([])
    const navigateTo=useNavigate();
    async function fetchConnections(){
        try{
            const res=await axios.get("http://localhost:7000/user/connections",{withCredentials:true})
            setConnection(res?.data?.data)
        }
        catch(err){
            console.log(err)
        }
    }
    useEffect(()=>{
        fetchConnections()
    },[])
    return(
        <div className="h-123 bg-[url('https://img.freepik.com/free-vector/modern-polygon-technology-background_1035-17925.jpg?semt=ais_items_boosted&w=740')] bg-cover bg-center flex flex-col items-center">
            <p className="font-bold text-xl">Connections</p>
            {connections?.length ? 
            (connections.map(user=>(
                <div className="h-20 w-130 m-3 bg-gray-100 text-black border-blue border-1 rounded-xl flex items-center">
                    <img src={user.photoUrl} className="h-15 w-15 rounded-full m-2"/>
                    <div className="flex flex-col w-120">
                    <p className="font-bold">{user.firstName} {user.lastName}</p>
                    <p>{user.about}</p>
                    </div>
                    <button className="btn btn-active mr-3" onClick={()=>navigateTo("/chat/"+user._id)}>Chat</button>
                    </div>

            )))
            : <p>No connections</p>}
        </div>
    )
}

export default Connections
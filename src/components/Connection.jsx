import axios from "axios"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { addTarget } from "../state/slice"
import { useDispatch } from "react-redux"

const Connections=()=>{
    const [connections,setConnection]=useState([])
    const navigateTo=useNavigate();
    const dispatch=useDispatch();
    async function fetchConnections(){
        try{
            const res=await axios.get("http://localhost:7000/user/connections",{withCredentials:true})
            setConnection(res?.data?.data)
        }
        catch(err){
            console.log(err)
        }
    }

    const navigateToChat=(user)=>{
        dispatch(addTarget(user))
        navigateTo("/chat/"+user._id)
    }
    useEffect(()=>{
        fetchConnections()
    },[])
    return(
        <div className="h-123 max-h-123 overflow-y-auto bg-[url('https://img.freepik.com/free-vector/modern-polygon-technology-background_1035-17925.jpg?semt=ais_items_boosted&w=740')] bg-cover bg-center flex flex-col items-center">
            <p className="font-bold text-xl text-black">Connections</p>
            {connections?.length ? 
            (connections.map(user=>(
                <div className="h-20 w-130 m-3 bg-gray-100 text-black border-blue border-1 rounded-xl flex items-center">
                    <img src={user.photoUrl} className="h-15 w-15 rounded-full m-2"/>
                    <div className="flex flex-col w-120">
                    <p className="font-bold">{user.firstName} {user.lastName}</p>
                    <p>{user.about}</p>
                    </div>
                    <button className="btn btn-active mr-3" onClick={()=>navigateToChat(user)}>Chat</button>
                    </div>

            )))
            : <p className="text-black">No connections</p>}
        </div>
    )
}

export default Connections
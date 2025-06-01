import axios from "axios"
import { useEffect, useState } from "react"

const Connections=()=>{
    const [connections,setConnection]=useState([])
    async function fetchConnections(){
        try{
            const res=await axios.get("http://localhost:7000/user/connections",{withCredentials:true})
            setConnection(res?.data?.data)
            console.log(connections,res?.data?.data)
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
                <div className="h-20 w-100 m-3 bg-gray-100 border-blue border-1 rounded-xl flex">
                    <img src={user.photoUrl} className="h-15 w-15 rounded-full m-2"/>
                    <div className="flex flex-col">
                    <p className="font-bold">{user.firstName} {user.lastName}</p>
                    <p>{user.about}</p>
                    </div>
                    </div>

            )))
            : <p>No connections</p>}
        </div>
    )
}

export default Connections
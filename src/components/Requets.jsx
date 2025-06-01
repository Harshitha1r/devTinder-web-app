import { useState,useEffect } from "react"
import axios from "axios"

const Requests=()=>{
    const [requests,setRequests]=useState([])
        const [message,setMessage]=useState("")

    async function fetchConnections(){
        try{
            const res=await axios.get("http://localhost:7000/user/requests/received",{withCredentials:true})
            setRequests(res?.data?.data)
            console.log(requests,res)
        }
        catch(err){
            console.log(err)
        }
    }

    const requestHandler=async(status,id)=>{
        try{
            const res=await axios.post(`http://localhost:7000/request/review/${status}/${id}`,{},{withCredentials:true})
            if(res){
                setMessage(`Connection ${status} successfully`)
            }
        }
        catch(err){
            console.log(err)
        }
    }
    useEffect(()=>{
        fetchConnections()
    },[])
    return(
        <div className="h-123 bg-white flex flex-col items-center justify-center">
            <p className="font-bold">Pending Requests</p>
            {requests.length ? 
            (requests.map(user=>(
                <div className="h-20 w-150 m-3 bg-gray-100 flex justify-between border-gray-200 shadow-lg border-1 rounded-xl" key={user._id}>
                    <img src={user.photoUrl} className="h-15 w-15 rounded-full m-2"/>
                    <div className="flex flex-col">
                    <p className="font-bold">{user.firstName} {user.lastName}</p>
                    <p className="text-sm">{user.about}</p>
                    </div>
                    <div className="flex justify-end mt-5 mr-2">
                    <button className="bg-green-500 rounded-xl h-10 w-20" onClick={()=>requestHandler("accepted",user._id)}>Accept</button>
                    <button className="bg-red-500 rounded-xl h-10 w-20" onClick={()=>requestHandler("rejected",user._id)}>Reject</button>
                    </div>
                    </div>

            )))
            : <p>No Requests Pending</p>}
                    {message &&
        <div id="toast-top-right" class="fixed flex items-center w-full max-w-xs p-4 space-x-4 text-gray-500 bg-white divide-x rtl:divide-x-reverse divide-gray-200 rounded-lg shadow-sm top-5 right-5 dark:text-gray-400 dark:divide-gray-700 dark:bg-gray-800" role="alert">
            <div class="text-sm font-normal text-white">{message}</div>
        </div>}
        </div>
    )
}

export default Requests
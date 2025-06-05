import { useEffect, useState } from "react"
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import createSocketConnection from "./utils"
import axios from "axios";
const Chat=()=>{
    const {targetid}=useParams();
    const [message,setMessage]=useState("")
    const [msgarr,setMsgarr]=useState([])

    const userData = useSelector((state) => state.user)
    const socket=createSocketConnection();

    async function fetchChatMessages(){
        try{
            const res=await axios.get("http://localhost:7000/fetch/messages/"+targetid,{withCredentials:true})
            setMsgarr(res?.data?.data)
        }
        catch(err){

        }
    }

    const sendMessage=()=>{
        socket.emit("sendMessage",{userId:userData?.data?._id,targetUserId:targetid,message:message,firstName:userData?.data?.firstName,lastName:userData?.data?.lastName})
        setMessage("")
    }

    useEffect(()=>{
        fetchChatMessages();
        return () =>{
            socket.disconnect();
        }
    },[])

    useEffect(()=>{
        if(!userData?.data?._id) return
        socket.emit("joinChat",{userId:userData?.data?._id,targetUserId:targetid})
        socket.on("messagRecieved",({firstName,lastName,message})=>{
            setMsgarr(messages=>[...messages,{firstName,lastName,message}])
        })
    },[targetid,userData])


    return(
    <div className="h-120 w-120 bg-stone-400 ml-90">
    <div className="max-h-100 overflow-y-auto p-4">
    {msgarr.length ? msgarr.map(msg=>(
    <div className={`chat ${msg.firstName === userData.data.firstName ? "chat-end" : "chat-start"}`}>
    <div className={`chat-bubble ${msg.firstName === userData.data.firstName ? "chat-bubble-info" : "chat-bubble-neutral"}`}>{msg.message}</div>
    </div>
    )):<h1 className="block m-auto">Start Your Conversation</h1>}
    </div>
    <div className="fixed bottom-6 p-4 gap-2 rounded">
      <input
        type="text"
        className="flex-1 p-2 w-90 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        placeholder="Type your message..."
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />
        <button className="btn btn-active m-2" onClick={sendMessage}>
    Send
  </button></div>

    </div>
       )
}
export default Chat
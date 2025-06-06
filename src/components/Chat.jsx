import { useEffect, useState } from "react"
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import createSocketConnection from "./utils"
import axios from "axios";
import ChatBox from "./ChatBox";
const Chat=()=>{
    const {targetid}=useParams();
    const [message,setMessage]=useState("")
    const [msgarr,setMsgarr]=useState([])
    const [selectedChat,setSelectedchat]=useState(targetid)
    const [chatarr,setChatarr]=useState([])
    const [toDetails,setTodetails]=useState({})
    const navigateTo=useNavigate();

    const userData = useSelector((state) => state.user)
    const socket=createSocketConnection();

    async function fetchChatMessages(){
        try{
            const res=await axios.get("http://localhost:7000/fetch/messages/"+selectedChat,{withCredentials:true})
            setMsgarr(res?.data?.data)
            setTodetails(res?.data?.toDetails)
        }
        catch(err){

        }
    }
    async function fetchChat(){
        try{
            const res=await axios.get("http://localhost:7000/fetch/chats",{withCredentials:true})
            setChatarr(res?.data?.data)
        }
        catch(err){

        }
    }

    const sendMessage=()=>{
        socket.emit("sendMessage",{userId:userData?.data?._id,targetUserId:selectedChat,message:message,firstName:userData?.data?.firstName,lastName:userData?.data?.lastName})
        setSelectedchat(targetid)
        setMessage("")
    }

    useEffect(()=>{
        fetchChat();
        return () =>{
            socket.disconnect();
        }
    },[])

    useEffect(()=>{
        if(!userData?.data?._id) return
        socket.emit("joinChat",{userId:userData?.data?._id,targetUserId:selectedChat})
        socket.on("messagRecieved",({firstName,lastName,message})=>{
            setMsgarr(messages=>[...messages,{firstName,lastName,message}])
        })
    },[selectedChat,userData])

    useEffect(()=>{
        if(selectedChat){
        fetchChatMessages();
        }
    },[selectedChat])

    return(
    <div className="flex h-122"> 
    <div className="w-110 max-h-120 overflow-y-auto">
        <h1 className="text-bold text-xl m-2">Chats</h1>
        {chatarr.map(user=>(
                <div className="cursor-pointer h-20 w-100 bg-transparent text-black border-blue border-1 rounded-xl flex items-center" onClick={()=>{
                    setSelectedchat(user._id);
                    navigateTo("/chat/"+user._id)
                }
                }>
                    <img src={user.photoUrl} className="h-15 w-15 rounded-full m-2"/>
                    <div className="flex flex-col w-120">
                    <p className="font-bold text-white">{user.firstName} {user.lastName}</p>
                    </div>
                    </div>

            ))}
    </div>
    {selectedChat &&<ChatBox toDetails={toDetails} msgarr={msgarr} userData={userData} setSelectedchat={setSelectedchat} setMessage={setMessage} message={message} sendMessage={sendMessage}/>}
    </div> 
       )
}
export default Chat
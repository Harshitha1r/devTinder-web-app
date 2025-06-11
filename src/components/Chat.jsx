import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import createSocketConnection from "./utils"
import axios from "axios";
import ChatBox from "./ChatBox";
import { removeTarget } from "../state/slice";
import status from "daisyui/components/status";
const Chat=()=>{
    const {targetid}=useParams();
    const [message,setMessage]=useState("")
    const [alert,setAlert]=useState("")
    const [msgarr,setMsgarr]=useState([])
    const [selectedChat,setSelectedchat]=useState(targetid)
    const [chatarr,setChatarr]=useState([])
    const [chatExist,setChatexist]=useState(Boolean)
    const [toDetails,setTodetails]=useState({})
    const navigateTo=useNavigate();
    const dispatch=useDispatch()

    const userData = useSelector((state) => state.user.loggedUser)
    const targetData = useSelector((state) => state.user.targetUser || {})
    const socket=createSocketConnection();

    function isEmpty(obj) {
     return Object.keys(obj).length === 0;
   }

    async function fetchChatMessages(){
        try{
            const res=await axios.get("http://localhost:7000/fetch/messages/"+selectedChat,{withCredentials:true})
            setMsgarr(res?.data?.data)
            setTodetails(res?.data?.toDetails)
        }
        catch(err){
            setMsgarr([])
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
    useEffect(()=>{
        if(!targetData) return 
        let chatExist=chatarr.some(user => user._id === targetData._id);
        setChatexist(chatExist)
    },[chatarr])

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
    },[selectedChat])

    useEffect(()=>{
        if(!userData?.data?._id || !selectedChat) return
        socket.emit("joinChat",{userId:userData?.data?._id,targetUserId:selectedChat,status:"online"})
        socket.on("messagRecieved",({firstName,lastName,message})=>{
            setMsgarr(messages=>[...messages,{firstName,lastName,message}])
        })
    },[selectedChat,userData])

    useEffect(()=>{
            socket.on("fetchNotification",({targetUserId,firstName,lastName})=>{
            if(userData?.data?._id===targetUserId){
            setAlert(`You have new message from ${firstName}`)
            }
        })
    },[msgarr,userData])

    useEffect(()=>{
        if(selectedChat){
        fetchChatMessages();
        }
    },[selectedChat])

    return(
    <div className="flex h-122"> 
    <div className="w-110 max-h-120 overflow-y-auto">
        <h1 className="text-bold text-xl m-2">Chats</h1>
                {!chatExist && !isEmpty(targetData) && <div className="cursor-pointer h-20 w-100 bg-transparent text-black border-blue border-1 rounded-xl flex items-center" onClick={()=>{
                    setSelectedchat(targetData._id);
                    navigateTo("/chat/"+targetData._id)
                }
                }>
                    <img src={targetData.photoUrl} className="h-15 w-15 rounded-full m-2"/>
                    <div className="flex flex-col w-120">
                    <p className="font-bold text-white">{targetData.firstName} {targetData.lastName}</p>
                    </div>
                    </div>}
        {chatarr.map(user=>(
                <div className="cursor-pointer h-20 w-100 bg-transparent text-black border-blue border-1 rounded-xl flex items-center" onClick={()=>{
                    setSelectedchat(user._id);
                    dispatch(removeTarget({}))
                    navigateTo("/chat/"+user._id)
                }
                } key={user._id}>
                    <img src={user.photoUrl} className="h-15 w-15 rounded-full m-2"/>
                    <div className="flex flex-col w-120">
                    <p className="font-bold text-white">{user.firstName} {user.lastName}</p>
                    </div>
                    </div>

            ))}
    </div>
    {selectedChat &&<ChatBox toDetails={!chatExist && !isEmpty(targetData)? targetData :toDetails} msgarr={msgarr} userData={userData} setSelectedchat={setSelectedchat} setMessage={setMessage} message={message} sendMessage={sendMessage}/>}
        {alert &&
        <div id="toast-top-right" class="fixed flex items-center w-full max-w-xs p-4 space-x-4 text-gray-500 bg-white divide-x rtl:divide-x-reverse divide-gray-200 rounded-lg shadow-sm top-5 right-5 dark:text-gray-400 dark:divide-gray-700 dark:bg-gray-800" role="alert">
            <div class="text-sm font-normal text-white">{alert}<button onClick={()=>setAlert("")} className="p-2 cursor-pointer">❌</button></div>
        </div>}
    </div> 
       )
}
export default Chat

const ChatBox=({msgarr,toDetails,userData,setMessage,message,sendMessage})=>{
    return(
    <div className="h-123 w-220 bg-stone-300">
        <div className="h-15 bg-gray-900 flex">
                <img src={toDetails?.photoUrl} className="h-10 w-10 rounded-full m-2" />
                <div className="flex flex-col w-120">
                    <p className="font-bold text-white">{toDetails?.firstName} {toDetails?.lastName}</p>
                </div>
        </div>
    <div className="max-h-100 overflow-y-auto p-4">
    {msgarr.length ? msgarr.map(msg=>(
    <div key={msg._id} className={`chat ${msg.firstName === userData.data.firstName ? "chat-end" : "chat-start"}`}>
    <div className={`chat-bubble ${msg.firstName === userData.data.firstName ? "chat-bubble-info" : "chat-bubble-neutral"}`}>{msg.message}</div>
    </div>
    )):<img className="h-50 mx-auto w-50" src="https://img.freepik.com/premium-vector/modern-design-concept-no-chat-conversation-design_637684-240.jpg"/>}
    </div>
    <div className="fixed bottom-6 p-4 ml-50 gap-2 rounded text-black">
      <input
        type="text"
        className="flex-1 text-black p-2 w-90 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
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
export default ChatBox
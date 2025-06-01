import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import axios from "axios"
import { useNavigate } from "react-router-dom"
import { removeUser } from "../state/slice"

const NavBar = () => {
    const userData = useSelector((state) => state.user)
    const [open, setOpen] = useState(false)
    const dispatch = useDispatch()
    const navigate=useNavigate();
    const navigateProfile=()=>{
        return navigate("/Profile");
    }
    const logoutHandler = async () => {
        try {
            await axios.post("http://localhost:7000/logout",{}, { withCredentials: true })
            dispatch(removeUser(null))
            navigate('/login')
        } catch (err) {
            console.log(err)
        }
    }
    return (
        <div className="min-h-10 flex justify-between bg-black shadow-xl/30 text-white">
            <div className="flex">
            <img src="https://static.vecteezy.com/system/resources/previews/024/267/970/non_2x/dev-letter-logo-design-in-illustration-logo-calligraphy-designs-for-logo-poster-invitation-etc-vector.jpg" className="h-15 w-15 rounded-full" />
            <img src="https://www.tinderpressroom.com/download/Wordmark-R-gradient-white-RGB.png" className="h-15 w-20 rounded-full" onClick={()=>navigate('/Home')}/>
            </div>
            {userData?.data && 
            <div className="flex justify-between gap-5 items-center">
                <a href="/Connections">Connections</a>
                <a href="/Requests">Requests</a>
                <p className="w-20 font-bold">Welcome,{userData?.data?.firstName} {userData?.data?.lastName}</p>
                <img src={userData?.data?.photoUrl || "https://static.vecteezy.com/system/resources/previews/027/448/973/non_2x/avatar-account-icon-default-social-media-profile-photo-vector.jpg"} alt="" className="h-10 w-12 ml-20 rounded-full" onClick={() => setOpen(!open)} />
                {open && (
                    <div className="absolute right-0 mt-40 w-48 bg-white border rounded shadow-md z-50">
                        <ul className="py-1 text-sm text-gray-700" onClick={()=>setOpen(!open)}>
                            <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer" onClick={navigateProfile}>Profile</li>
                            <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer" onClick={logoutHandler}>Logout</li>
                        </ul>
                    </div>
                )}
            </div>}
        </div>
    )
}

export default NavBar
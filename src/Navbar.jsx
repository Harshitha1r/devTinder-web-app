import { useSelector } from "react-redux"

const NavBar = () => {
    const userData = useSelector((state) => state.user.userData)
    return (
        <div className="min-h-10 flex p-2 bg-black shadow-xl/30 text-white">
            <img src="https://static.vecteezy.com/system/resources/previews/024/267/970/non_2x/dev-letter-logo-design-in-illustration-logo-calligraphy-designs-for-logo-poster-invitation-etc-vector.jpg" className="h-15 w-15 rounded-full" />
            <img src="https://www.tinderpressroom.com/download/Wordmark-R-gradient-white-RGB.png" className="h-15 w-20 rounded-full" />
            {userData?.data && <div className="flex items-center ml-220">
                <p className="w-20 font-bold">Welcome,{userData?.data?.firstName}</p>
                <img src={userData?.data?.photoUrl} alt="" className="h-10 w-12 ml-20 rounded-full" />
            </div>}
        </div>
    )
}

export default NavBar
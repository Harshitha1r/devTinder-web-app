import { Outlet, useLocation, useNavigate } from "react-router-dom";
import NavBar from "./Navbar";
import Footer from "./Footer";
import { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { adduser } from "../state/slice";

const Body = () => {
    const userData = useSelector((store) => store.user);
    const dispatch=useDispatch();
    const navigate=useNavigate()
    const location = useLocation();
    const fetchUser = async () => {
    try {
      const res = await axios.get("http://localhost:7000/profile/view", {
        withCredentials: true,
      });
      dispatch(adduser(res.data));
    } catch (err) {
      if (err.status === 400) {
        navigate("/login");
      }
    }
  };

  useEffect(() => {
    if(location.pathname !== "/login"){
    fetchUser();
    }
  }, []);
    return (
        <>
            <NavBar />
            <Outlet />
            <Footer />
        </>
    )
}

export default Body;
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import axios from 'axios'


const Navbar = ({showLogin,setShowLogin}) => {
    const navigate = useNavigate();
  const [userData,setUserData] = useState(null);

useEffect(() => {
  try {
    const userData = localStorage.getItem('userInfo');
    setUserData(userData ? JSON.parse(userData) : null);
  } catch (err) {
    console.error("Error parsing localStorage userInfo:", err);
    setUserData(null);
  }
}, []);



  const handleLogout = async() => {
      setShowLogin(true);
     await axios.post(`https://linkedin-4wbd.onrender.com/api/auth/logout`,{},{withCredentials:true}).then(res=>{
          localStorage.clear();
          window.location.reload()
      }).catch(err => {
            console.log(err)
            alert("Something Went Wrong")
        })
    }

  return (
    <div className="w-[100%] h-[75px] bg-gray-200 fixed top-0 z-50">
      <div className="md:p-4 w-[100%] flex  py-4 justify-around">
        <Link to={'/'} className="flex gap-1 items-center cursor-pointer ">
          <h3 className="text-blue-800 font-bold text-xl">Linked</h3>
          <img
            src={
              "https://freelogopng.com/images/all_img/1656994981linkedin-icon-png.png"
            }
            alt="LinkedInLogo"
            className="w-6 h-6"
          />
        </Link>
        <div className="flex gap-4">
          {/* <Link to={'/Register'} className="border-2 rounded-full border-blue-400 px-3 py-1 hover:bg-blue-100">SignUp</Link> */}
          {!showLogin && <Link to={'/'} onClick={handleLogout} className="border-2 rounded-full border-blue-400 px-5 pt-2 hover:bg-blue-100">Logout</Link>}

          {!showLogin && (
          <div className="profile" onClick={() => navigate(`/profile/${userData?._id}`)}>
            <img className="rounded-full" width={50} src={userData?.profilePic} alt="" />
          </div>
        )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;

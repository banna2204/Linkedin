import React, { useContext, useState } from 'react';
import './Login.css'
import axios from 'axios';
import {ToastContainer,toast} from 'react-toastify'

const Login = ({setShowLogin}) => {


  const url = 'https://linkedin-4wbd.onrender.com';
  const [currState,setCurrState] = useState("Login")
  const [data, setData] = useState({
    name:"",
    email:"",
    password:""
  })

  const onChangeHandler = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setData(data=>({...data,[name]:value}))
  }

const onLogin = async (e) => {
  e.preventDefault();
  
  let newUrl = url;
  let payload = {
    email: data.email,
    password: data.password
  };

  if (currState === "Login") {
    newUrl += "/api/auth/login";
  } else {
    newUrl += "/api/auth/register";
    payload.name = data.name;
  }
  
  try {
    const response = await axios.post(newUrl, payload, {
      withCredentials:true
    });

    console.log("Response:", response);
    toast.success(response.data.message || "Success");


    if(response.data.success){
      const user = response.data.userExist || response.data.user;
      localStorage.setItem("userInfo", JSON.stringify(user));
      setShowLogin(false);
    }else{
      toast.error(response.data.message);
    }
    
  } catch (err) {
    toast.error(err.response?.data?.error || "Something went wrong");
  }
};


  return (  
    <div className='login-popup'>
      <form  className="login-popup-container" onSubmit={onLogin}>
        <div className="login-popup-title">
          <h2>{currState}</h2>
        </div>
        <div className="login-popup-inputs">
          {currState!=="Login" && 
          <input name='name' onChange={onChangeHandler} value={data.name} type="text" placeholder='Your name' required />
          }
          <input name='email' onChange={onChangeHandler} value={data.email} type="email" placeholder='Your email' required />
          <input name='password' onChange={onChangeHandler} value={data.password} type="password" placeholder='Your password' required />
        <button type='submit'>{currState==="Sign Up"?"Create account":"Login"}</button>
        </div>
        <div className="login-popup-condition">
          <input type="checkbox" required/>
          <p>By continuing, i agree to the terms of use & privacy policy.</p>
        </div>
        {currState==="Login"
        ?<p>Create a new account? <span onClick={()=>setCurrState("Sign Up")}>Click here</span></p>
        :<p>Already have an account? <span onClick={()=>setCurrState("Login")}>Login here</span></p>
      }
        
      </form>
    </div>
  )
}

export default Login

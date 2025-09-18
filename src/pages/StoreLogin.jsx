import React, { useState, useEffect } from 'react'
import { Link , useNavigate} from 'react-router-dom'
import { StoreDataContext } from '../context/StoreContext';
import axios from 'axios';
import toast from 'react-hot-toast';
import Loading from '../components/Loading';

const StoreLogin = () => {


    const [ email , setEmail] = useState("");
    const [ password , setPassword] = useState("");
    const [error , setError] = useState("");
  
    const {store, setStore} = React.useContext(StoreDataContext);
    const navigate = useNavigate();

    const [loading , setLoading] = useState(false);
    const [message , setMessage] = useState("");
  
  
    const submitHandler = async (e) => {
  e.preventDefault();
  setLoading(true);
  setMessage("Logging In....")

  try {
    const storeData = {
      email,
      password,
    };

    const response = await axios.post(
      `${import.meta.env.VITE_BASE_URL}stores/login`,
      storeData
    );

    if (response.status === 200) {
      const data = response.data;
      setStore(data.store);
      setLoading(false);
      setMessage("");
      setEmail("");
      setPassword("");
      setError("");
      localStorage.setItem("token", data.token);
      navigate("/store-home");
      toast.success("Login successful!");
    }
  } catch (error) {
    setLoading(false);
    setMessage("");
    if (error.response) {
      if (error.response.status === 401) {
        setError("Invalid email or password");
      } else {
        setError(error.response.data.message || "Login failed");
      }
    } else {
      setError("Network error. Please try again.");
    }
  }

  
};



 


  return (
    <>
    {loading && <Loading message={message}/>}
    <div className=' h-screen w-full p-7 flex flex-col items-center justify-between'>
       <div className='w-full md:w-1/3'>
          <form className='w-full' onSubmit={(e) => submitHandler(e)}>
          <img  className='w-20 rounded-2xl mb-2' src="/instaraBarber.jpg" alt="logo" />
          <h3 className='text-2xl mb-2 font-semibold'>Enter your registered email</h3>
          <input 
              className='w-full p-2 border border-gray-300 rounded bg-[#eeeeee] mb-7 text-lg placeholder:text-base'
              type="email"
              placeholder='email@example.com' 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onClick={() => setError("")}
              required 
          />
          <h3 className='text-2xl mb-2 font-semibold'>Enter Password</h3>
          <input 
              className='w-full p-2 border border-gray-300 rounded bg-[#eeeeee] mb-7 text-lg placeholder:text-base'
              type="password"
              placeholder='********' 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onClick={() => setError("")}
              required 
          /> 
          {error && <p className='text-red-500 mb-3 text-sm'>{error}</p>}
          <button
          className='w-full p-2 rounded mb-4 bg-[#111] text-white text-xl font-semibold'
          >
            Login
          </button>
          </form>
          <Link to={"/store-signup"} className='text-blue-600 hover:underline'>New here ? Create new Account</Link> 
       </div>
       <div className='w-full md:w-1/3 '>
        <Link
        to={"/login"}
        className='w-full flex items-center justify-center p-3 rounded bg-[#565ed6] text-white mb-7 text-xl font-semibold'
        >
          SignIn as user
        </Link>
       </div>
    </div>
    </>
  )
}

export default StoreLogin

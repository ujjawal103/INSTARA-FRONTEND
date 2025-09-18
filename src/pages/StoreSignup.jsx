// import React, { useState } from 'react'

// import { Link, useNavigate } from 'react-router-dom'

// import axios from 'axios';
// import toast from 'react-hot-toast';
// import Loading from '../components/Loading';
// import { StoreDataContext } from '../context/StoreContext';

// const StoreSignup = () => {
//       // Store basic info
//       const [storeName, setStoreName] = useState("");
//       const [email, setEmail] = useState("");
//       const [password, setPassword] = useState("");
      
      
//       const [photo, setPhoto] = useState("");
//       const [numberOfBarbers, setNumberOfBarbers] = useState("");
//       const [phoneNumber, setPhoneNumber] = useState("");
//       const [address, setAddress] = useState("");

//       const [error, setError] = useState("");

//       const {store, setStore} = React.useContext(StoreDataContext);
//       const navigate = useNavigate();

//       const [loading, setLoading] = useState(false);
//       const [message, setMessage] = useState("");
    
    
//     const submitHandler = async (e) => {
//   e.preventDefault();
//   setLoading(true);
//   setMessage("Creating Store...")

//   try {
//     const storeData = {
//       storeName,
//       email,
//       password,
//       storeDetails: {
//         photo,
//         address,
//         numberOfBarbers: parseInt(numberOfBarbers),
//         phoneNumber,
//       },
//     };

//     const response = await axios.post(
//       `${import.meta.env.VITE_BASE_URL}stores/register`,
//       storeData
//     );

//     if (response.status === 201) {
//       const data = response.data;
//       setStore(data.store);
//       setStoreName("");
//       setEmail("");
//       setPassword("");
//       setPhoto("");
//       setAddress("");
//       setNumberOfBarbers("");
//       setPhoneNumber("");
//       localStorage.setItem("token", data.token);
//       setLoading(false);
//       setMessage("");
//       navigate("/store-home");
//       toast.success("Store registration successful!");
//     }
//   } catch (error) {
//     setLoading(false);
//     setMessage("");
//     if (error.response) {
//       if (error.response.status === 400) {
//         if (error.response.data.errors) {
//           setError(error.response.data.errors[0].msg);
//         } else {
//           setError(error.response.data.message || "Registration failed");
//         }
//       } else {
//         setError(error.response.data.message || "Registration failed");
//       }
//     } else {
//       setError("Network error. Please try again.");
//     }
//   }

 
// };

      
//   return (
//   <>
//   {loading && <Loading message={message}/>}
//     <div className=' h-screen w-full p-7 flex flex-col items-center justify-between'>
//        <div className='w-full md:w-1/3'>
//           <form className='w-full' onSubmit={(e) => submitHandler(e)}>
//           <img  className='w-20' src="/instaraBarber.jpg" alt="" />
//           <h3 className='text-2xl mb-2 font-semibold'>Store Name</h3>
//           <input 
//               className='w-full p-2 border border-gray-300 rounded bg-[#eeeeee] mb-4 text-lg placeholder:text-base'
//               type="text"
//               placeholder='Enter store name' 
//               value={storeName}
//               onChange={(e) => setStoreName(e.target.value)}
//               onClick={() => setError("")}
//               required 
//           />

//           <h3 className='text-2xl mb-2 font-semibold'>Email</h3>
//           <input 
//               className='w-full p-2 border border-gray-300 rounded bg-[#eeeeee] mb-4 text-lg placeholder:text-base'
//               type="email"
//               placeholder='store@example.com' 
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//               onClick={() => setError("")}
//               required 
//           />

//           <h3 className='text-2xl mb-2 font-semibold'>Password</h3>
//           <input 
//               className='w-full p-2 border border-gray-300 rounded bg-[#eeeeee] mb-4 text-lg placeholder:text-base'
//               type="password"
//               placeholder='********' 
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//               onClick={() => setError("")}
//               required 
//           /> 

//           <h3 className='text-2xl mb-2 font-semibold'>Store Details</h3>
          
//           <input 
//               className='w-full p-2 border border-gray-300 rounded bg-[#eeeeee] mb-4 text-lg placeholder:text-base'
//               type="text"
//               placeholder='Store full Address'
//               minLength={15} 
//               value={address}
//               onChange={(e) => setAddress(e.target.value)}
//               onClick={() => setError("")}
//               required 
//           /> 

//           <input 
//               className='w-1/2 p-2 border border-gray-300 rounded bg-[#eeeeee] mb-4 text-lg placeholder:text-base'
//               type="text"
//               placeholder='Phone Number' 
//               value={phoneNumber}
//               onChange={(e) => setPhoneNumber(e.target.value)}
//               onClick={() => setError("")}
//               required 
//           /> 

//           <input 
//               className='w-6/13 p-2 ml-2  border border-gray-300 rounded bg-[#eeeeee] mb-4 text-lg placeholder:text-base'
//               type="number"
//               placeholder='Number of Barbers' 
//               value={numberOfBarbers}
//               onChange={(e) => setNumberOfBarbers(e.target.value)}
//               onClick={() => setError("")}
//               required 
//           /> 

//           <input 
//               className='w-full p-2 border border-gray-300 rounded bg-[#eeeeee] mb-4 text-lg placeholder:text-base'
//               type="url"
//               placeholder='Store Photo URL (optional)' 
//               value={photo}
//               onChange={(e) => setPhoto(e.target.value)}
//               onClick={() => setError("")}
//           /> 

//           {error && <p className='text-red-500 mb-4 text-sm'>{error}</p>}

//           <button
//           className='w-full p-2 rounded bg-[#111] text-white mb-4 text-xl font-semibold'
//           >
//             Register Store
//           </button>
//           </form>
//           <Link to={"/store-login"} className='text-blue-600 hover:underline'>Already have a Store? Login</Link> 
//        </div>
//     </div>
//   </>
//   )
// }

// export default StoreSignup





import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import Loading from "../components/Loading";
import { StoreDataContext } from "../context/StoreContext";

const StoreSignup = () => {
  // Store basic info
  const [storeName, setStoreName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Store details
  const [photo, setPhoto] = useState(""); // store image url
  const [file, setFile] = useState(null); // raw file
  const [numberOfBarbers, setNumberOfBarbers] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [address, setAddress] = useState("");

  const [error, setError] = useState("");
  const { setStore } = React.useContext(StoreDataContext);
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  // ⬆️ Upload Image First
  const uploadImage = async () => {
    if (!file) return "";

    const formData = new FormData();
    formData.append("image", file);

    try {
      const res = await axios.post(
        `${import.meta.env.VITE_BASE_URL}cloudinary/upload-image`,
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      return res.data.url; // backend se jo url aa rha h
    } catch (err) {
      console.error("Image Upload Error:", err);
      toast.error("Image upload failed!");
      return "";
    }
  };

  // ⬆️ Signup Handler
  const submitHandler = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("Creating Store...");

    try {
      let uploadedPhoto = photo;
      if (file) {
        uploadedPhoto = await uploadImage();
      }

      const storeData = {
        storeName,
        email,
        password,
        storeDetails: {
          photo: uploadedPhoto,
          address,
          numberOfBarbers: parseInt(numberOfBarbers),
          phoneNumber,
        },
      };

      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}stores/register`,
        storeData
      );

      if (response.status === 201) {
        const data = response.data;
        setStore(data.store);
        setStoreName("");
        setEmail("");
        setPassword("");
        setPhoto("");
        setFile(null);
        setAddress("");
        setNumberOfBarbers("");
        setPhoneNumber("");
        localStorage.setItem("token", data.token);

        toast.success("Store registration successful!");
        navigate("/store-home");
      }
    } catch (error) {
      if (error.response) {
        if (error.response.status === 400) {
          setError(
            error.response.data.errors
              ? error.response.data.errors[0].msg
              : error.response.data.message || "Registration failed"
          );
        } else {
          setError(error.response.data.message || "Registration failed");
        }
      } else {
        setError("Network error. Please try again.");
      }
    } finally {
      setLoading(false);
      setMessage("");
    }
  };

  return (
    <>
      {loading && <Loading message={message} />}
      <div className="h-screen w-full p-7 flex flex-col items-center justify-between">
        <div className="w-full md:w-1/3">
          <form className="w-full" onSubmit={submitHandler}>
            <img className="w-20" src="/instaraBarber.jpg" alt="" />

            <h3 className="text-2xl mb-2 font-semibold">Store Name</h3>
            <input
              className="w-full p-2 border border-gray-300 rounded bg-[#eeeeee] mb-4 text-lg"
              type="text"
              placeholder="Enter store name"
              value={storeName}
              onChange={(e) => setStoreName(e.target.value)}
              onClick={() => setError("")}
              required
            />

            <h3 className="text-2xl mb-2 font-semibold">Email</h3>
            <input
              className="w-full p-2 border border-gray-300 rounded bg-[#eeeeee] mb-4 text-lg"
              type="email"
              placeholder="store@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onClick={() => setError("")}
              required
            />

            <h3 className="text-2xl mb-2 font-semibold">Password</h3>
            <input
              className="w-full p-2 border border-gray-300 rounded bg-[#eeeeee] mb-4 text-lg"
              type="password"
              placeholder="********"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onClick={() => setError("")}
              required
            />

            <h3 className="text-2xl mb-2 font-semibold">Store Details</h3>
            <input
              className="w-full p-2 border border-gray-300 rounded bg-[#eeeeee] mb-4 text-lg"
              type="text"
              placeholder="Store full Address"
              minLength={15}
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              onClick={() => setError("")}
              required
            />

            <input
              className="w-1/2 p-2 border border-gray-300 rounded bg-[#eeeeee] mb-4 text-lg"
              type="text"
              placeholder="Phone Number"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              onClick={() => setError("")}
              required
            />

            <input
              className="w-6/13 p-2 ml-2 border border-gray-300 rounded bg-[#eeeeee] mb-4 text-lg"
              type="number"
              placeholder="Number of Barbers"
              value={numberOfBarbers}
              onChange={(e) => setNumberOfBarbers(e.target.value)}
              onClick={() => setError("")}
              required
            />

            {/* File Upload */}
            <input
              className="w-full p-2 border border-gray-300 rounded bg-[#eeeeee] mb-4 text-lg"
              type="file"
              accept="image/*"
              onChange={(e) => setFile(e.target.files[0])}
            />

            {error && <p className="text-red-500 mb-4 text-sm">{error}</p>}

            <button
              className="w-full p-2 rounded bg-[#111] text-white mb-4 text-xl font-semibold"
            >
              Register Store
            </button>
          </form>
          <Link
            to={"/store-login"}
            className="text-blue-600 hover:underline"
          >
            Already have a Store? Login
          </Link>
        </div>
      </div>
    </>
  );
};

export default StoreSignup;

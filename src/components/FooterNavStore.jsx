// FooterNav.jsx
import React from "react";
import { Link } from "react-router-dom";
import { FaHome, FaHistory, FaUser, FaWallet } from "react-icons/fa";
import axios from "axios";
import { useState } from "react";
import Loading from "./Loading";
import toast from "react-hot-toast";
import AccountDrawerStore from "./AccountDrawerStore";

export default function FooterNavStore() {
    const [profileFetched, setProfileFetched] = useState(null);
    const [drawerOpen, setDrawerOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const [message , setMessage] = useState("");
  
    const handleProfile = async () => {
      setLoading(true);
      setMessage("Fetching profile...");
      try {
        const response = await axios.get(`${import.meta.env.VITE_BASE_URL}stores/profile`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        if (response.status === 200) {
          setLoading(false);
          setMessage("");
          setProfileFetched(response.data);
          setDrawerOpen(true);
        }
      } catch (error) {
        setLoading(false);
        setMessage("");
        setProfileFetched(null);
        setDrawerOpen(false);
        toast.error("Something went wrong !");
      }
    };
  

  return (
    <>
    {loading && <Loading message={message}/>}
    <div className="fixed bottom-0 left-0 w-full bg-white border-t shadow-md flex justify-around items-center py-2 z-99999999">
      {/* Home */}
      <Link to="/store-home" className="flex flex-col items-center text-gray-700">
        <FaHome size={22} />
        <span className="text-xs">Home</span>
      </Link>

      {/* Current Ride */}
      <Link to="/store-barbers" className="flex flex-col items-center text-gray-700">
        <FaWallet size={22} />
        <span className="text-xs">Your Barbers</span>
      </Link>

       {/* wallet */}
      <Link to="/store-wallet" className="flex flex-col items-center text-gray-700">
        <FaWallet size={22} />
        <span className="text-xs">Wallet</span>
      </Link>

      {/* History */}
      <Link to="/store-bookings" className="flex flex-col items-center text-gray-700">
        <FaHistory size={22} />
        <span className="text-xs">Bookings</span>
      </Link>


       {/* Account */}
      <button onClick={handleProfile} className="flex flex-col items-center text-gray-700">
              <FaUser size={22} />
              <span className="text-xs">Account</span>
      </button>

      {/* Drawer Component */}
            {profileFetched?.store && (
              <AccountDrawerStore
                isOpen={drawerOpen}
                onClose={() => setDrawerOpen(false)}
                store={profileFetched.store}
              />
            )}
    </div>
    </>
  );
}

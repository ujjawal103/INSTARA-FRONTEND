import React, { useContext , useEffect , useState } from 'react'
import { StoreDataContext } from '../context/StoreContext';
import { useSocket } from '../context/SocketContext';
import { FaArrowLeft } from "react-icons/fa";
import Booking from "../components/Booking";
import axios from 'axios';
import FooterNavStore from '../components/FooterNavStore';
import StoreBarberSlotsHome from '../components/StoreBarberSlotsHome';
import toast from 'react-hot-toast';

const StoreHome = () => {

  const {store , setStore} = useContext(StoreDataContext);
  const {socket} = useSocket();
  const [loading , setLoading] = useState(false);
  const [message , setMessage] = useState("");

    //   useEffect(() => {
    //       socket.emit("join", { userType: "barberStore", userId: store._id });

    //       const updateStoreLocation = async () => {
    //         if (navigator.geolocation) {
    //           navigator.geolocation.getCurrentPosition(
    //             async (position) => {
    //               const { latitude, longitude } = position.coords;
    //               socket.emit("update-store-location", {
    //                 storeId: store._id,
    //                 location: { ltd: latitude, lang: longitude }
    //               });
    //             },
    //             async (error) => {
    //               console.error("Error getting location:", error);
    //               try {
    //                 const response = await axios.get(
    //                   `${import.meta.env.VITE_BASE_URL}maps/get-coordinates?address=${encodeURIComponent(store.storeDetails.address)}`
    //                 );
    //                 if (response.status === 200) {
    //                   socket.emit("update-store-location", {
    //                     storeId: store._id,
    //                     location: { ltd: response.data.ltd, lang: response.data.lang }
    //                   });
    //                 }
    //               } catch (err) {
    //                 toast.error("Please enable location and refresh");
    //               }
    //             }
    //           );
    //         } else {
    //           toast.error("Geolocation not supported in this browser");
    //           try {
    //             const response = await axios.get(
    //               `${import.meta.env.VITE_BASE_URL}maps/get-coordinates?address=${encodeURIComponent(store.storeDetails.address)}`
    //             );
    //             if (response.status === 200) {
    //               socket.emit("update-store-location", {
    //                 storeId: store._id,
    //                 location: { ltd: response.data.ltd, lang: response.data.lang }
    //               });
    //             }
    //           } catch (err) {
    //             console.log("Please enable location and refresh no other option");
    //           }
    //         }
    //       };

    //       // const locationInterval = setInterval(updateStoreLocation, 10000);
    //       updateStoreLocation();

    //       // return () => clearInterval(locationInterval); // cleanup
    // }, []);


    useEffect(() => {
  if (!store?._id) return;

  socket.emit("join", { userType: "barberStore", userId: store._id });

  const updateStoreLocation = async () => {
    try {
      // 1) Try with store address first
      const response = await axios.get(
        `${import.meta.env.VITE_BASE_URL}maps/get-coordinates?address=${encodeURIComponent(
          store.storeDetails.address
        )}`
      );

      if (response.status === 200 && response.data?.ltd && response.data?.lang) {
        socket.emit("update-store-location", {
          storeId: store._id,
          location: { ltd: response.data.ltd, lang: response.data.lang },
        });
        return; // success, stop here
      } else {
        throw new Error("Invalid coords from address API");
      }
    } catch (err) {
      console.warn("Address lookup failed, falling back to geolocation:", err);

      // 2) If address failed, fallback to geolocation
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const { latitude, longitude } = position.coords;
            socket.emit("update-store-location", {
              storeId: store._id,
              location: { ltd: latitude, lang: longitude },
            });
          },
          (error) => {
            console.error("Geolocation also failed:", error);
            toast.error("Unable to fetch location. Please enable location access.");
          },
          { enableHighAccuracy: true, timeout: 10000 }
        );
      } else {
        toast.error("Geolocation not supported in this browser");
      }
    }
  };

  updateStoreLocation();

  // Optional interval for periodic updates
  // const locationInterval = setInterval(updateStoreLocation, 10000);
  // return () => clearInterval(locationInterval);

}, [store, socket]);



  return (
    <div className="flex flex-col h-screen bg-gray-50 overflow-y-auto pb-24">
      {/* Top Bar */}
      <div className="flex items-center px-4 py-3 bg-white shadow-md sticky top-0 z-20">
        <h1 className="flex-1 text-center font-semibold text-lg">
          {store.storeName}
        </h1>
        <div className="w-8" />
      </div>

      {/* Bookings Header */}
      <div className="px-4 py-4">
        <h2 className="text-lg font-semibold text-gray-700 mb-2">Bookings</h2>
        <p className="text-sm text-gray-400">
          Manage your slots and view upcoming appointments
        </p>
      </div>

      {/* Booking Calendar & Slots */}
      <StoreBarberSlotsHome />

      <FooterNavStore />
    </div>
  );
};


export default StoreHome

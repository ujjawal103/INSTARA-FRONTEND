import React, { useState, useEffect, useRef, useContext } from 'react';
import { FaSearch, FaMapMarkerAlt } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import FooterNav from '../components/FooterNav';
import { UserDataContext } from '../context/UserContext';
import { useSocket } from '../context/SocketContext.jsx';
import LocationPrompt from "../components/LocationPrompt";
import StoreCards from '../components/StoreCards';
import Loading from '../components/Loading';   // <--- your loader component
import axios from 'axios';
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import StoreDetailsToUser from './StoreDetailsToUser.jsx';


gsap.registerPlugin(useGSAP);

const Home = () => {
  const [searchText, setSearchText] = useState('');
  const [filteredSuggestions, setFilteredSuggestions] = useState([]);
  const [coordinates, setCoordinates] = useState({});
  const [stores, setStores] = useState([]);
  const [loading, setLoading] = useState(false);   // <--- loader state

  const storePannelRef = useRef(null);
  const [storePannel , setStorePannel] = useState(false);

  const [selectedStore , setSelectedStore] = useState({});


  const navigate = useNavigate();
  const { user, setUser } = useContext(UserDataContext);
  const { socket } = useSocket();

  const token = localStorage.getItem("token");
  const suggestionBoxRef = useRef(null);




   useGSAP(function(){
    if(storePannel){
      gsap.to(storePannelRef.current , {
      transform : "translateY(0)"
      })
    }
    else{
      gsap.to(storePannelRef.current , {
      transform : "translateY(200%)"
    })
    }
  },[storePannel])

  //fetch stores when refresh
  useEffect(() => {
    getAllStoresInTheRadius();
  } , []);

  // close suggestions when clicked outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        suggestionBoxRef.current &&
        !suggestionBoxRef.current.contains(event.target)
      ) {
        setFilteredSuggestions([]);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // join socket + update location
  useEffect(() => {
    socket.emit("join", { userType: "user", userId: user._id });

    const updateUserLocation = () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const { latitude, longitude } = position.coords;
            socket.emit("update-user-location", {
              userId: user._id,
              location: { ltd: latitude, lang: longitude }
            });
          },
          (error) => {
            console.error("Error getting location:", error);
            setUser((prev) => ({ ...prev, location: {} }));
            socket.emit("update-user-location", {
              userId: user._id,
              location: {}
            });
          }
        );
      }
    };

    updateUserLocation();
  }, []);

  // fetch stores function
  const getAllStoresInTheRadius = async () => {
    let longitude = null;
    let lattitude = null;

    if (coordinates.ltd && coordinates.lang) {
      longitude = coordinates.lang;
      lattitude = coordinates.ltd;
    } else if ( searchText.trim() === '' &&
      user?.location?.ltd &&
      user?.location?.lang
    ) {
      longitude = user.location?.lang;
      lattitude = user.location?.ltd;
    }

    if (!lattitude || !longitude) return;

    try {
      setLoading(true); // start loader
      const response = await axios.get(
        `${import.meta.env.VITE_BASE_URL}stores/get-stores?latitude=${lattitude}&longitude=${longitude}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      if (response.status === 200) {
        // console.log("Stores fetched:", response.data);
        setStores(response.data);
      }
    } catch (err) {
      console.error("Error fetching stores:", err);
      setStores([]);
    } finally {
      setLoading(false); // stop loader
    }
  };

  // fetch coordinates from backend
  const getCoordinates = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BASE_URL}maps/get-coordinates?address=${encodeURIComponent(searchText)}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      if (response.status === 200) {
        setCoordinates(response.data);
        return response.data;
      }
    } catch (err) {
      setCoordinates({});
      return null;
    }
  };

  // search suggestions
  const getSuggestedLocations = async (input) => {
    if (!input) return [];
    const lowerInput = input.toLowerCase();
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BASE_URL}maps/get-suggestions?input=${encodeURIComponent(lowerInput)}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      if (response.status === 200) {
        setFilteredSuggestions(response.data);
        return response.data;
      }
    } catch (err) {
      console.error("Error fetching locations");
      setFilteredSuggestions([]);
    }
  };

  // watch searchText
  useEffect(() => {
    if (searchText === '') {
      setCoordinates({});
      setFilteredSuggestions([]);
      getAllStoresInTheRadius();
    } else {
      getSuggestedLocations(searchText);
    }
  }, [searchText]);

  // watch coordinates
  useEffect(() => {
    if (coordinates.ltd && coordinates.lang) {
      getAllStoresInTheRadius();
    }
  }, [coordinates]);

  // button click for manual search
  const handleSearchClick = async () => {
    if (!searchText.trim()) return;
    const coords = await getCoordinates();
    if (coords) {
      await getAllStoresInTheRadius();
    }
  };

  const handleCardClick = (store) => {
    setSelectedStore({ ...store });
    setStorePannel(true);
  };

  return (
    <div className="flex flex-col h-screen bg-gray-50 pb-24">
      {/* Top bar */}
      <div className="flex items-center px-4 py-3 bg-white shadow-md relative z-99">
        <img src="/instaraUser.jpg" alt="Logo" className="w-10 h-10 mr-3" />
        <div
          ref={suggestionBoxRef}
          className="flex items-center flex-1 bg-gray-100 rounded-full px-3 py-2 relative"
        >
          <FaSearch className="text-gray-400 mr-2" />
          <input
            type="text"
            placeholder="Search location"
            className="bg-gray-100 focus:outline-none text-sm w-full"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
          />
          <FaMapMarkerAlt className="text-gray-400 ml-2" />
          <button
            onClick={handleSearchClick}
            className="ml-2 px-3 py-1 bg-purple-600 text-white text-sm rounded-full hover:bg-purple-700 transition"
          >
            Search
          </button>
          

          {/* Suggestions popup */}
          {filteredSuggestions.length > 0 && (
            <div className="absolute top-full left-0 w-full bg-white shadow-md rounded-b-lg mt-1 max-h-48 overflow-y-auto z-20">
              {filteredSuggestions.map((sug, index) => (
                <div
                  key={index}
                  className="px-3 py-2 hover:bg-gray-100 cursor-pointer"
                  onClick={async () => {
                    setSearchText(sug);
                    setFilteredSuggestions([]);
                    const coords = await getCoordinates();
                    if (coords) await getAllStoresInTheRadius();
                  }}
                >
                  {sug}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Body */}
      <div className="flex-1">
        {loading ? (
          <Loading message="Fetching nearby salons..." />
        ) : (!coordinates.ltd && !coordinates.lang) &&
          (!user?.location?.ltd && !user?.location?.lang) ? (
          <LocationPrompt
            onSearch={() =>
              document.querySelector("input[type=text]")?.focus()
            }
          />
        ) : (
          <>
            {/* Nearby Stores Header */}
            <div className="px-4 py-4">
              <h2 className="text-lg font-semibold text-gray-700 mb-2">
                Nearby Salon's
              </h2>
              <p className="text-sm text-gray-400">
                {coordinates.ltd && coordinates.lang
                  ? searchText
                  : "Your Current Location"}
              </p>
            </div>

            {/* Cards */}
            <StoreCards stores={stores} handleCardClick={handleCardClick} />
          </>
        )}
      </div>


 <div ref={storePannelRef} className='fixed z-100 bg-white w-full translate-y-full'>
   <StoreDetailsToUser 
    key={selectedStore._id}
    store={selectedStore}
    setStorePannel={setStorePannel}
   />
 </div>
     
      <FooterNav />
    </div>
  );
};

export default Home;

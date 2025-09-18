import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import StoreInfo from '../components/StoreInfo';
import Reviews from '../components/Reviews';
import Booking from '../components/Booking';
import { FaArrowDown } from 'react-icons/fa';
import FooterNav from '../components/FooterNav';

const StoreDetailsToUser = ({store , setStorePannel}) => {

  if (!store) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-gray-500">Store not found!</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-screen bg-gray-50 overflow-y-auto pb-24">
      {/* Top bar */}
      <div className="flex items-center px-4 py-3 bg-white shadow-md sticky top-0 z-20">
        <button
          onClick={() => setStorePannel(false)}
          className="p-2 rounded-full hover:bg-gray-100"
        >
          <FaArrowDown size={20} />
        </button>
        <h1 className="flex-1 text-center font-semibold text-lg">{store.name}</h1>
        <div className="w-8" />
      </div>

      {/* Store Info */}
      <div className="flex-grow h-100 mb-10 ">
        <StoreInfo store={store} />
      </div>

      

      {/* Booking System */}
      {
        store?._id && <Booking store={store} />
      }

      {/* Reviews */}
      <Reviews />



      <FooterNav />
    </div>
  );
};

export default StoreDetailsToUser;

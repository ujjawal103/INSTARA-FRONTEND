import React from "react";
import { FaMapMarkerAlt, FaSearchLocation } from "react-icons/fa";

const LocationPrompt = ({ onEnableLocation, onSearch }) => {
  return (
    <div className="flex flex-col items-center justify-center h-full text-center px-6">
      {/* Icon */}
      <div className="bg-purple-100 text-purple-600 p-6 rounded-full mb-4">
        <FaMapMarkerAlt size={40} />
      </div>

      {/* Text */}
      <h2 className="text-xl font-semibold text-gray-800 mb-2">
        Location Required
      </h2>
      <p className="text-gray-500 mb-6">
        Please allow location access or search for a location manually to see
        nearby stores.
      </p>

      {/* Buttons */}
      <div className="flex gap-4">
        <button
          onClick={onEnableLocation}
          className="flex items-center gap-2 bg-purple-600 text-white px-5 py-3 rounded-xl shadow hover:bg-purple-700 transition"
        >
          <FaMapMarkerAlt /> Enable Location
        </button>
        <button
          onClick={onSearch}
          className="flex items-center gap-2 bg-gray-100 text-gray-700 px-5 py-3 rounded-xl shadow hover:bg-gray-200 transition"
        >
          <FaSearchLocation /> Search Manually
        </button>
      </div>
    </div>
  );
};

export default LocationPrompt;

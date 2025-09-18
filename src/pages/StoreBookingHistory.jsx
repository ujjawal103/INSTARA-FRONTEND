import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaCalendarAlt, FaClock, FaUser, FaCut, FaDollarSign, FaSearch } from "react-icons/fa";
import Loading from "../components/Loading";
import FooterNavStore from "../components/FooterNavStore";
import toast from "react-hot-toast";

const StoreBookingHistory = () => {
  const [bookings, setBookings] = useState([]);
  const [filteredBookings, setFilteredBookings] = useState([]);
  const [loading, setLoading] = useState(false);
  const [message , setMessage] = useState("");
  const [searchId, setSearchId] = useState("");

  const token = localStorage.getItem("token"); // assuming token stored here

  useEffect(() => {
    setLoading(true);
    setMessage("fetching...");
    const fetchBookings = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BASE_URL}bookings/store/bookings`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        if (response.data.success) {
          setBookings(response.data.bookings);
          setFilteredBookings(response.data.bookings);
        }
      } catch (err) {
             const message = err.response?.data?.message || "Something went wrong !";
             toast.error(message);
      }finally {
        setLoading(false);
        setMessage("");
      }
    };

    fetchBookings();
  }, []);

  // Filter whenever searchId changes
  useEffect(() => {
    if (!searchId.trim()) {
      setFilteredBookings(bookings);
    } else {
      const results = bookings.filter((b) =>
        b._id.toLowerCase().includes(searchId.toLowerCase())
      );
      setFilteredBookings(results);
    }
  }, [searchId, bookings]);

  if (loading) {
    return <Loading message={message} />;
  }

  return (
    <div className="p-6 mb-12">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">📖 Booking History</h2>

      {/* 🔍 Search Bar */}
        <div className="flex items-center gap-3 mb-6 bg-white shadow-sm border rounded-full px-4 py-2 focus-within:ring-2 focus-within:ring-blue-400 transition">
        <FaSearch className="text-gray-400 text-lg" />
        <input
            type="text"
            placeholder="Search by Booking ID..."
            value={searchId}
            onChange={(e) => setSearchId(e.target.value)}
            className="w-full outline-none bg-transparent text-gray-700 placeholder-gray-400"
        />
        </div>


      {filteredBookings.length === 0 ? (
        <p className="text-gray-500">No bookings found.</p>
      ) : (
        <div className="grid gap-6 md:grid-cols-2">
          {filteredBookings.map((booking) => (
            <div
              key={booking._id}
              className="bg-white shadow-md rounded-2xl p-5 border hover:shadow-lg transition"
            >
              <div className="flex items-center justify-between mb-3">
                <span
                  className={`px-3 py-1 rounded-full text-sm font-medium ${
                    booking.status === "booked"
                      ? "bg-green-100 text-green-700"
                      : booking.status === "cancelled"
                      ? "bg-red-100 text-red-700"
                      : "bg-gray-100 text-gray-600"
                  }`}
                >
                  {booking.status.toUpperCase()}
                </span>
                <span className="text-gray-400 text-xs">
                  {new Date(booking.createdAt).toLocaleDateString()}
                </span>
              </div>

              <div className="space-y-2">
                <div className="flex items-center gap-2 text-gray-700">
                  <FaUser className="text-blue-500" />
                  <span>{booking.userId?.email || "Unknown User"}</span>
                </div>

                <div className="flex items-center gap-2 text-gray-700">
                  <FaCut className="text-purple-500" />
                  <span>{booking.barberId?.name || "No Barber Assigned"}</span>
                </div>

                <div className="flex items-center gap-2 text-gray-700">
                  <FaCalendarAlt className="text-pink-500" />
                  <span>{booking.date}</span>
                </div>

                <div className="flex items-center gap-2 text-gray-700">
                  <FaClock className="text-yellow-500" />
                  <span>{booking.time}</span>
                </div>

                <div className="flex items-center gap-2 text-gray-700">
                  <FaDollarSign className="text-green-500" />
                  <span>{booking.price} ₹</span>
                </div>

                <div className="flex items-center gap-2 text-gray-700">
                  <span>Booking ID : {booking._id}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
      <FooterNavStore />
    </div>
  );
};

export default StoreBookingHistory;

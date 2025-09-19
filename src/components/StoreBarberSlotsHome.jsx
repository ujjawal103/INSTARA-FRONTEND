import React, { useEffect, useState } from "react";
import { addDays, format } from "date-fns";
import Loading from "./Loading";
import axios from "axios";
import SlotPopup from "./storeComponents/SlotPopup";
import toast from "react-hot-toast";

export default function StoreBarberSlotsHome() {
  const [barbers, setBarbers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message , setMessage] = useState("");
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedSlot, setSelectedSlot] = useState(null); // 👈 for popup

  const today = new Date();
  const nextDays = Array.from({ length: 7 }, (_, i) => addDays(today, i));

  const token = localStorage.getItem("token");

  // Fetch barbers + slots
  useEffect(() => {
    setLoading(true);
    setMessage("Fetching Details...");
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BASE_URL}stores/get-barber`,
          { headers: { Authorization: `Bearer ${token}` } }
        );

        if (response.status === 200) {
          setBarbers(response.data.barbers);
        }
        setLoading(false);
      }  catch (err) {
             const message = err.response?.data?.message || "Something went wrong !";
             toast.error(message);
       }finally{
        setLoading(false);
        setMessage("");
       }
    };
    fetchData();
  }, []);


  useEffect(() => { 
    const updateExpiredSlots = async () => {
      setLoading(true);
      setMessage("Updating Slots...");
      try {
        const response = await axios.put(
          `${import.meta.env.VITE_BASE_URL}slots/expired`,
          { headers: { Authorization: `Bearer ${token}` } }
        );

        if (response.status === 200) {
          console.log("slots updated successfully");
        }
      } catch (err) {
        const message = err.response?.data?.message || "Something went wrong !";
        toast.error(message);
      } finally {
        setLoading(false);
        setMessage("");
      }
    };

    updateExpiredSlots();
  }, []);                 // only once on mount but may be later changed to interval of each 30 minutes

const handleSlotClick = async (slotId) => {
  setLoading(true);
  setMessage("It can take up to 2 minutes...");
  try {
    const response = await axios.get(
      `${import.meta.env.VITE_BASE_URL}slots/${slotId}/details`,
      { 
        headers:
         { 
          Authorization: `Bearer ${token}` 
         }
      }
    );

    if (response.status === 200) {
      setSelectedSlot(response.data.slot); // 👈 slot comes from backend
    }
  }  catch (err) {
         const message = err.response?.data?.message || "Something went wrong !";
         toast.error(message);
  }finally{
    setLoading(false);
    setMessage("");
  }
};

  const handleMarkBooked = async (slotId) => {
    setLoading(true);
    setMessage("Processing...");
    try {
      const response = await axios.put(
        `${import.meta.env.VITE_BASE_URL}slots/${slotId}/status`,
        { status : "booked" },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      if(response.status === 200){
        toast.success("Slot marked as booked");
        setSelectedSlot(null);
      }
    } catch (err) {
      const message = err.response?.data?.message || "Something went wrong !";
      toast.error(message);
    }finally{
       setLoading(false);
       setMessage("");
       window.location.reload();
    }
  };

  if (loading) return <Loading message={message} />;

  return (
    <div className="p-6 space-y-8">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Barbers & Slots</h2>

      {/* Calendar */}
      <div className="flex space-x-2 overflow-x-auto mb-6">
        {nextDays.map((day) => {
          const isSelected =
            format(day, "yyyy-MM-dd") === format(selectedDate, "yyyy-MM-dd");
          return (
            <button
              key={day.toString()}
              onClick={() => setSelectedDate(day)}
              className={`min-w-[80px] px-3 py-2 rounded-lg flex flex-col items-center justify-center text-sm transition ${
                isSelected
                  ? "bg-purple-600 text-white"
                  : "bg-gray-100 text-gray-800 hover:bg-purple-100"
              }`}
            >
              <span>{format(day, "EEE")}</span>
              <span>{format(day, "dd/MM")}</span>
            </button>
          );
        })}
      </div>

      {/* Slots per barber */}
      {barbers.map((barber) => {
        const dateStr = format(selectedDate, "yyyy-MM-dd");
        const slotsForDay = barber.slots.filter((slot) => slot.date === dateStr);

        return (
          <div
            key={barber._id}
            className="bg-white shadow-lg rounded-2xl p-6"
          >
            <h3 className="text-lg font-semibold text-purple-600 mb-3">
              {barber.name}
            </h3>

            {slotsForDay.length > 0 ? (
              <div className="flex flex-wrap items-center justify-between gap-2">
               {slotsForDay[0].slots.map((slot) => (
                  <button
                    key={slot._id}
                    className={`px-3 py-3 min-w-[120px] rounded-lg text-sm font-medium transition ${
                      slot.status === "booked"
                        ? "bg-red-200 text-red-700 line-through"
                        : slot.status === "expired"
                        ? "bg-black text-white cursor-not-allowed opacity-70"
                        : "bg-green-200 text-green-800 hover:bg-green-300"
                    }`}
                    onClick={() => handleSlotClick(slot._id)}
                    disabled={slot.status === "expired"} // prevent booking expired slots
                  >
                    {slot.time}
                  </button>
                ))}
              </div>
            ) : (
              <p className="text-gray-400 text-sm">No slots for this date</p>
            )}
          </div>
        );
      })}






         {/* Popup */}
      {selectedSlot && (
        <SlotPopup
          slot={selectedSlot}
          onClose={() => setSelectedSlot(null)}
          onMarkBooked={handleMarkBooked}
        />
      )}
    </div>
  );
}

import React, { useState } from 'react';
import { format } from 'date-fns';

// Dummy time slots
const allSlots = [
  '09:00 AM', '10:00 AM', '11:00 AM',
  '12:00 PM', '01:00 PM', '02:00 PM',
  '03:00 PM', '04:00 PM', '05:00 PM',
];

const TimeSlotPicker = ({ barberId, selectedDate }) => {
  const [selectedSlot, setSelectedSlot] = useState(null);

  // Dummy booked slots
  const bookedSlots = {
    '1': ['10:00 AM', '02:00 PM'], // barberId 1
    '2': ['11:00 AM'], // barberId 2
    '3': ['09:00 AM', '01:00 PM'], // barberId 3
  };

  const today = new Date();
  const isToday = format(today, 'yyyy-MM-dd') === format(selectedDate, 'yyyy-MM-dd');

  return (
    <div className="mb-4">
      <h4 className="font-medium mb-2">Barber {barberId}</h4>
      <div className="flex flex-wrap gap-2">
        {allSlots.map((slot) => {
          const slotTime = new Date(`${format(selectedDate, 'yyyy-MM-dd')} ${slot}`);
          const isPastSlot = isToday && slotTime < today;
          const isBooked = bookedSlots[barberId]?.includes(slot);

          const disabled = isPastSlot || isBooked;

          return (
            <button
              key={slot}
              disabled={disabled}
              onClick={() => setSelectedSlot(slot)}
              className={`px-3 py-1 rounded-lg text-sm border ${
                disabled
                  ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                  : selectedSlot === slot
                  ? 'bg-purple-600 text-white border-purple-600'
                  : 'bg-white text-gray-800 hover:bg-purple-100'
              }`}
            >
              {slot}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default TimeSlotPicker;

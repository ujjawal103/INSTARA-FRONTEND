import React from "react";
import {
  Clock,
  Calendar,
  User,
  Scissors,
  Store,
  UserCircle,
  X,
  CheckCircle,
} from "lucide-react";

export default function SlotPopup({ slot, onClose, onMarkBooked }) {
  if (!slot) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 ">
      <div className="bg-white rounded-2xl shadow-lg p-6 w-[420px] relative max-w-[90vw]">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-400 hover:text-gray-600"
        >
          <X size={20} />
        </button>

        <h2 className="text-2xl font-bold text-purple-600 mb-6 flex items-center gap-2">
          <Scissors className="text-purple-500" />
          Slot Details
        </h2>

        <div className="space-y-3 text-gray-700">
          <p className="flex items-center gap-2">
            <Clock className="text-purple-500" size={18} />
            <span className="font-semibold">Time:</span> {slot.time}
          </p>

          <p className="flex items-center gap-2">
            <Calendar className="text-purple-500" size={18} />
            <span className="font-semibold">Date:</span> {slot.date}
          </p>

          <p className="flex items-center gap-2">
            <CheckCircle
              className={
                slot.status === "available"
                  ? "text-green-500"
                  : slot.status === "booked"
                  ? "text-blue-500"
                  : "text-red-500"
              }
              size={18}
            />
            <span className="font-semibold">Status:</span>{" "}
            {slot.status.charAt(0).toUpperCase() + slot.status.slice(1)}
          </p>

          <p className="flex items-center gap-2">
            <User className="text-purple-500" size={18} />
            <span className="font-semibold">Barber:</span> {slot.barberName}
          </p>

          <p className="flex items-center gap-2">
            <Store className="text-purple-500" size={18} />
            <span className="font-semibold">Store:</span> {slot.storeName}
          </p>

          {/* ✅ Booked By Section */}
          {slot.bookedBy && (
            <p className="flex items-center gap-2">
              <UserCircle className="text-purple-500" size={18} />
              <span className="font-semibold">Booked By:</span>{" "}
              {slot.bookedBy.firstName} {slot.bookedBy.lastName}
            </p>
          )}
        </div>

        <div className="flex justify-end gap-3 mt-8">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-lg bg-gray-200 hover:bg-gray-300"
          >
            Close
          </button>

          {/* ✅ Show action buttons based on slot status */}
          {slot.status === "available" && (
            <button
              onClick={() => onMarkBooked(slot._id)}
              className="px-4 py-2 rounded-lg bg-purple-600 text-white hover:bg-purple-700"
            >
              Mark as Booked
            </button>
          )}

          {slot.status === "expired" && (
            <button
              disabled
              className="px-4 py-2 rounded-lg bg-red-500/70 text-white cursor-not-allowed"
            >
              Expired
            </button>
          )}
        </div>

        {slot.status === "available" && (
          <p className="text-sm text-red-500 mt-4">
            Note: Marking a slot as "Booked" will not reset to available.
          </p>
        )}
        {slot.status === "expired" && (
          <p className="text-sm text-gray-500 mt-4">
            This slot is expired and cannot be booked.
          </p>
        )}
      </div>
    </div>
  );
}

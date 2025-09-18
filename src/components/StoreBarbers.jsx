import { Store } from "lucide-react";
import React, { useState, useEffect } from "react";
import FooterNavStore from "./FooterNavStore";
import { useContext } from "react";
import { StoreDataContext } from "../context/StoreContext";
import axios from "axios";
import toast from "react-hot-toast";
import Loading from "./Loading";

const StoreBarbers = () => {
  const [barbers, setBarbers] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    experience: "",
    pricePerSlot : 50
  });
  const {store , setStore} = useContext(StoreDataContext);
  const [loading , setLoading] = useState(true);
  const [message , setMessage] = useState("");

    const token = localStorage.getItem("token");

    //slots update
        useEffect(() => {
          const fetchSlots = async () => {
            try {
              const response = await axios.get(`${import.meta.env.VITE_BASE_URL}slots/generate`, {
                headers: {
                  "Authorization": `Bearer ${token}`
                }
              });
              if (response.status === 200) {
                // toast.success("Slots generated for new Barber");
              }
            } catch (err) {
                   const message = err.response?.data?.message || "Something went wrong !";
                   toast.error(message);
            }
          };
          fetchSlots();
        }, [barbers.length]);

  //get barbers 
  useEffect(() => {
    setLoading(true);
    setMessage("Fetching Your Barbers...");
    const fetchBarbers = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_BASE_URL}stores/get-barber`, {
          headers: {
            "Authorization": `Bearer ${token}`
          }
        });
        if(response.status === 200){
            setBarbers(response.data.barbers);
            setLoading(false);
        }
      } catch (err) {
             const message = err.response?.data?.message || "Something went wrong !";
             toast.error(message);
             setLoading(false);
      }finally{
        setLoading(false);
        setMessage("");
      }
    };
    fetchBarbers();
  }, [barbers.length]);





  // Add Barber
  const handleAddBarber = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("Adding Barber...");
    if (!formData.name) return;
    try{
        const response = await axios.post(`${import.meta.env.VITE_BASE_URL}stores/add-barber`, {
          name: formData.name,
          experience: formData.experience,
          pricePerSlot: formData.pricePerSlot
        }, {
          headers: {
            "Authorization": `Bearer ${token}`
          }
        });
        if (response.status === 201) {
            setBarbers([...barbers, response.data.barber]);
            toast.success("Barber Added Successfully");
        }
    } catch (err) {
           const message = err.response?.data?.message || "Something went wrong !";
           toast.error(message);
    }
    finally{
      setLoading(false);
      setMessage("");
    }

    setFormData({ name: "", experience: "" });
  };

  // Remove Barber
  const handleRemoveBarber = (id) => {
    setLoading(true);
    setMessage("Deleting Barber...");
    const removeBarber = async () => {
        try {
          const response = await axios.delete(`${import.meta.env.VITE_BASE_URL}stores/remove-barber/${id}`, {
            headers: {
              "Authorization": `Bearer ${token}`
            }
          });
          if (response.status === 200) {
            setBarbers(barbers.filter((barber) => barber._id !== id));
          }
        }  catch (err) {
               const message = err.response?.data?.message || "Something went wrong !";
               toast.error(message);
        }finally{
          setLoading(false);
          setMessage("");
        }
      };
      removeBarber();
  };

  return (
    <>
    {
      loading && <Loading message={message} />
    }
    <div className="p-6 space-y-6">
      {/* Add Barber Form */}
      <div className="bg-white shadow-md rounded-xl p-6">
        <h2 className="text-xl font-bold mb-4">Add New Barber</h2>
        <form onSubmit={handleAddBarber} className="space-y-4">
          <input
            type="text"
            placeholder="Barber Name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="w-full border p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
          <input
            type="number"
            placeholder="Price per slot"
            value={formData.pricePerSlot}
            onChange={(e) =>
              setFormData({ ...formData, pricePerSlot: e.target.value })
            }
            className="w-full border p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="number"
            placeholder="Experience (years)"
            value={formData.experience}
            onChange={(e) =>
              setFormData({ ...formData, experience: e.target.value })
            }
            className="w-full border p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
          >
            Add Barber
          </button>
        </form>
      </div>

      {/* Barbers List */}
      <div className="bg-white shadow-md rounded-xl p-6">
        <h2 className="text-xl font-bold mb-4">Barbers List</h2>
        {barbers.length === 0 ? (
          <p className="text-gray-500">No barbers added yet.</p>
        ) : (
          <div className="space-y-4">
            {barbers.map((barber , idx) => (
              <div
                key={barber._id}
                className="flex justify-between items-center border-b pb-3"
              >
                <div>
                  <p className="font-semibold">{barber.name}</p>
                  <p className="text-sm text-gray-600">
                    {barber.experience} years experience
                  </p>
                </div>
                <button
                  onClick={() => handleRemoveBarber(barber._id)}
                  className="bg-red-500 text-white px-4 py-1 rounded-lg hover:bg-red-600 transition"
                >
                  Remove
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      <FooterNavStore />
    </div>
    </>
  );
};

export default StoreBarbers;

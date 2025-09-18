import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaWallet, FaPlus, FaSearch } from "react-icons/fa";
import Loading from "../components/Loading";
import AddMoneyPopup from "../components/AddMoneyPopp";
import FooterNav from "../components/FooterNav";
import { toast } from "react-hot-toast";


const UserWallet = () => {
  const [balance, setBalance] = useState(0);
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");
  const [showPopup, setShowPopup] = useState(false);
  const [searchId, setSearchId] = useState("");
  

  const token = localStorage.getItem("token");

  // Fetch wallet details
  useEffect(() => {
    const fetchWallet = async () => {
      setMessage("Fetching wallet...");
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_BASE_URL}wallet/get-user-wallet`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        if (res.data.success) {
          setBalance(res.data.balance);
          setTransactions(res.data.transactions.reverse()); // latest first
        }
      } catch (err) {
       const message = err.response?.data?.message || "Something went wrong !";
       toast.error(message);
       }
      finally {
        setLoading(false);
        setMessage("");
      }
    };
    fetchWallet();
  }, []);

  // Add money handler (triggered from popup)
  const handleAddMoney = async (amount) => {
    setMessage("Processing...");
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_BASE_URL}wallet/credit-user`,
        { amount : Number(amount) },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      if (res.status === 200) {
        setBalance(res.data.balance);
        setShowPopup(false);
        window.location.reload(true);
        toast.success("Wallet credited successfully");
      }
    } catch (err) {
      const message = err.response?.data?.message || "Something went wrong !";
      toast.error(message);
    } finally {
      setMessage("");
      setLoading(false);
    }

  };

  // Filter transactions by ID
  const filteredTransactions = transactions.filter((tx) =>
    tx._id.toLowerCase().includes(searchId.toLowerCase())
  );

  if (loading) return <Loading message={message} />;

  return (
    <div className="h-screen flex flex-col mb-14">
      {/* Fixed Header */}
      <div className="bg-white shadow-md p-4 flex items-center justify-between sticky top-0 z-50">
        <div className="flex items-center gap-3">
          <FaWallet className="text-purple-600 text-2xl" />
          <h2 className="text-xl font-bold">My Wallet</h2>
        </div>
        <button
          onClick={() => setShowPopup(true)}
          className="flex items-center gap-2 px-4 py-2 bg-purple-600 text-white rounded-full shadow hover:bg-purple-700 transition"
        >
          <FaPlus /> Add Money
        </button>
      </div>

      {/* Balance */}
      <div className="bg-gray-100 py-4 px-6 sticky top-[64px] z-40">
        <p className="text-gray-600 text-sm">Wallet Balance</p>
        <h1 className="text-2xl font-bold text-gray-800">₹ {balance}</h1>
      </div>

      {/* Search Transactions */}
      <div className="px-6 py-3 bg-white sticky top-[120px] z-30 shadow-sm">
        <div className="flex items-center gap-3 bg-gray-100 rounded-full px-4 py-2">
          <FaSearch className="text-gray-500" />
          <input
            type="text"
            placeholder="Search by Transaction ID..."
            value={searchId}
            onChange={(e) => setSearchId(e.target.value)}
            className="w-full bg-transparent outline-none text-gray-700"
          />
        </div>
      </div>

      {/* Transactions List */}
      <div className="flex-1 overflow-y-auto px-6 py-4 bg-gray-50">
        {filteredTransactions.length === 0 ? (
          <p className="text-gray-500">No transactions found.</p>
        ) : (
          <div className="space-y-4">
            {filteredTransactions.map((tx) => (
              <div
                key={tx._id}
                className="bg-white p-4 rounded-xl shadow-sm border hover:shadow-md transition"
              >
                <div className="flex justify-between items-center mb-2">
                  <span
                    className={`text-sm font-medium px-3 py-1 rounded-full ${
                      tx.type === "credit"
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {tx.type.toUpperCase()}
                  </span>
                  <span className="text-xs text-gray-400">
                    {new Date(tx.date).toLocaleString()}
                  </span>
                </div>
                <p className="text-gray-800">{tx.description}</p>
                <p className="text-gray-500 text-sm">Txn ID: {tx._id}</p>
                <p className="font-semibold text-gray-900 mt-1">
                  ₹ {tx.amount}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Add Money Popup */}
      <AddMoneyPopup
        isOpen={showPopup}
        onClose={() => setShowPopup(false)}
        onAddMoney={handleAddMoney}
      />


      <FooterNav />
    </div>
  );
};

export default UserWallet;

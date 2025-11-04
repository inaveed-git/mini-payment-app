import axios from "axios";
import React, { useState } from "react";

interface User {
  _id: string;
  firstName: string;
  lastName: string;
  userName: string;
}

interface ReceiverData {
  receiverId: string;
  amount: number;
}

const SendMoneyCard: React.FC<{ user: User }> = ({ user }) => {
  const firstLetter = user.firstName?.charAt(0).toUpperCase();
  const [receiverData, setReceiverData] = useState<ReceiverData>({
    receiverId: user._id,
    amount: 0,
  });
  const [loading, setLoading] = useState(false);

  const transferMoney = async () => {
    setLoading(true);
    try {
      await axios.post(
        `${import.meta.env.VITE_API_URL}/api/account/transfer`,
        receiverData,
        { withCredentials: true }
      );
      alert("Money sent successfully!");
    } catch (error) {
      console.error(error);
      alert("Failed to send money!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-[90vw] sm:w-[400px] rounded-2xl shadow-md bg-white p-6 flex flex-col">
      <h1 className="text-2xl font-semibold text-center mb-6 text-gray-800">
        Send Money
      </h1>

      <div className="flex items-center space-x-3 mb-6">
        <div className="rounded-full bg-green-500 w-10 h-10 flex justify-center items-center text-white font-semibold text-lg">
          {firstLetter}
        </div>
        <span className="font-semibold text-gray-800 text-base">
          {user.firstName}
        </span>
      </div>

      <label className="text-sm font-semibold text-gray-600 mb-2">
        Amount
      </label>
      <input
        type="number"
        placeholder="Enter amount"
        className="border border-gray-300 w-full h-10 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-green-400 mb-5"
         value={receiverData.amount === 0 ? "" : receiverData.amount}

        onChange={(e) =>
          setReceiverData({
            ...receiverData,
            amount: Number(e.target.value),
          })
        }
      />

      <button
        disabled={loading || receiverData.amount <= 0}
        className={`${
          loading || receiverData.amount <= 0
            ? "bg-gray-400 cursor-not-allowed"
            : "bg-green-500 hover:bg-green-600"
        } text-white font-semibold w-full h-10 rounded-lg transition-all duration-200`}
        onClick={transferMoney}
      >
        {loading ? "Sending..." : "Send Money"}
      </button>
    </div>
  );
};

export default SendMoneyCard;

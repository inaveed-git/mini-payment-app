import React, { useState, useEffect } from "react";
import axios from "axios";
import SendMoneyCard from "../page/SendMoneyCard"; // import your component

interface User {
  _id: string;
  firstName: string;
  lastName: string;
  userName: string;
}

const UserSearch: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [results, setResults] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");


  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  const fetchUsers = async (query: string) => {
    if (!query) return setResults([]);

    setLoading(true);
    setError("");

    try {
      const response = await axios.get(
        `http://localhost:5000/api/user/update/find?search=${query}`,
        { withCredentials: true }
      );

      setResults(response.data.user || []);
    } catch (err) {
      console.error(err);
      setError("Failed to fetch users");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      fetchUsers(searchTerm);
    }, 500);

    return () => clearTimeout(timer);
  }, [searchTerm]);

  return (
    <div className="p-4 relative">
      <input
        type="text"
        placeholder="Search users..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="border p-2 rounded w-full mb-4"
      />

      {loading && <p>Loading...</p>}
      {error && <p className="text-red-500">{error}</p>}
      {!loading && results.length === 0 && searchTerm && <p>No users found</p>}

      <ul className="space-y-2">
        {results.map((user: User) => (
          <li
            key={user._id}
            className="flex items-center justify-between p-2 rounded hover:bg-slate-200"
          >
            <div className="flex items-center space-x-3">
              <div className="rounded-full bg-slate-200 w-8 h-8 flex items-center justify-center">
                <span className="text-sm font-bold">
                  {user.firstName.charAt(0).toUpperCase()}
                </span>
              </div>
              <div className="flex flex-col">
                <span className="font-bold text-gray-900">{user.firstName}</span>
                <span className="text-gray-500 text-sm">@{user.userName}</span>
              </div>
            </div>

            {/* Right side: open modal button */}
            <button
              className="bg-slate-900 text-white px-4 py-2 rounded hover:bg-slate-700"
              onClick={() => setSelectedUser(user)}
            >
              Send Money
            </button>
          </li>
        ))}
      </ul>

      {/*  Popup modal */}
      {selectedUser && (
        <div className="fixed inset-0  bg-[#f3f5f7] bg-opacity-50 flex justify-center items-center z-50">
          <div className="relative">
            {/* Close button */}
            <button
              className="absolute top-2 right-4 text-gray-600 hover:text-black"
              onClick={() => setSelectedUser(null)}
            >
              ✕
            </button>

            {/* Pass user data to card */}
            <SendMoneyCard user={selectedUser} />
          </div>
        </div>
      )}
    </div>
  );
};

export default UserSearch;

import React, { useState } from "react";
import axios from "axios";

const Signup = () => {
  const [signUpData, setSignUpData] = useState({
    firstName: "",
    lastName: "",
    userName: "",
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setSignUpData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmitForm = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg("");
    setSuccessMsg("");

    try {
      await axios.post(
        `${import.meta.env.VITE_API_URL}/api/user/auth/signup`,
        signUpData
      );

      setSignUpData({
        firstName: "",
        lastName: "",
        userName: "",
        email: "",
        password: "",
      });

      setSuccessMsg("Account created successfully 🎉");
    } catch (error) {
      console.error(error);
      setErrorMsg("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <div className="bg-white p-8 rounded-2xl shadow-md w-full max-w-md">
        <h2 className="text-2xl font-semibold text-center mb-6 text-gray-700">
          Create an Account
        </h2>

        <form
          onSubmit={handleSubmitForm}
          className="flex flex-col space-y-4"
        >
          <input
            placeholder="First Name"
            type="text"
            name="firstName"
            value={signUpData.firstName}
            onChange={handleInput}
            className="border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            required
          />

          <input
            placeholder="Last Name"
            type="text"
            name="lastName"
            value={signUpData.lastName}
            onChange={handleInput}
            className="border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            required
          />

          <input
            placeholder="Username"
            type="text"
            name="userName"
            value={signUpData.userName}
            onChange={handleInput}
            className="border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            required
          />

          <input
            placeholder="Email"
            type="email"
            name="email"
            value={signUpData.email}
            onChange={handleInput}
            className="border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            required
          />

          <input
            placeholder="Password"
            type="password"
            name="password"
            value={signUpData.password}
            onChange={handleInput}
            className="border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            required
          />

          <button
            type="submit"
            disabled={loading}
            className={`mt-2 py-2 rounded-lg text-white font-medium transition ${
              loading
                ? "bg-indigo-300 cursor-not-allowed"
                : "bg-indigo-600 hover:bg-indigo-700"
            }`}
          >
            {loading ? "Signing up..." : "Sign Up"}
          </button>
        </form>

        {errorMsg && (
          <p className="text-red-500 text-sm mt-4 text-center">{errorMsg}</p>
        )}
        {successMsg && (
          <p className="text-green-600 text-sm mt-4 text-center">
            {successMsg}
          </p>
        )}
      </div>
    </div>
  );
};

export default Signup;

import React, { useState } from "react";
import { useSetRecoilState , useRecoilValue } from "recoil";
import { userState } from "../recoil/authAtom";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Signin = () => {
  const setAuthState = useSetRecoilState(userState);
// const { user } = useRecoilValue(userState);
const navigate = useNavigate()

  const [signInData, setSignInData] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  const handleForm = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setSignInData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg("");
    setSuccessMsg("");

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/user/auth/signin`,
        signInData,
        { withCredentials: true }
      );

      // ✅ Update global Recoil auth state
      setAuthState({
        user: response.data.user,
        isLoading: false,
      });
navigate("/dashboard/user")
      setSuccessMsg("Login successful 🎉");
      setSignInData({ email: "", password: "" });
    } catch (error: any) {
      console.error(error);
      setErrorMsg(
        error?.response?.data?.message || "Invalid credentials or server error."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <div className="bg-white w-full max-w-md p-8 rounded-2xl shadow-md">
        <h2 className="text-2xl font-semibold text-center text-gray-800 mb-6">
          Welcome Back
        </h2>

        <form
          onSubmit={handleFormSubmit}
          className="flex flex-col space-y-4"
        >
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={signInData.email}
            onChange={handleForm}
            className="border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            required
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            value={signInData.password}
            onChange={handleForm}
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
            {loading ? "Signing in..." : "Sign In"}
          </button>
        </form>

        {errorMsg && (
          <p className="text-red-500 text-sm text-center mt-4">{errorMsg}</p>
        )}
        {successMsg && (
          <p className="text-green-600 text-sm text-center mt-4">
            {successMsg}
          </p>
        )}

        <div className="text-center mt-6 text-sm text-gray-600">
          Don’t have an account?{" "}
          <a
            href="/signup"
            className="text-indigo-600 hover:text-indigo-800 font-medium"
          >
            Sign up
          </a>
        </div>
      </div>
    </div>
  );
};

export default Signin;

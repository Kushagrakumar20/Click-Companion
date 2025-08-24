import React, { useState, useEffect } from "react";
import { toast, ToastContainer } from "react-toastify";
import { useNavigate } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";

import { googleAuthInitiator } from "../utils/googleOAuth";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../redux/apiCalls/apiCalls";
import PasswordInput from "./utilComponents/passwordInput.jsx";

import sideImage from "../assets/frontPageImage.png";
import { FaGoogle } from "react-icons/fa";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [verified, setVerified] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [shake, setShake] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const currentUser = useSelector(
    (state) => state?.user?.currentUser?.data?.user
  );

  useEffect(() => {
    if (currentUser) {
      if (currentUser?.isSignupCompleted) navigate("/home");
      else navigate("/questions");
    }
  }, [currentUser, navigate]);

  useEffect(() => {
    setImageLoaded(true);
  }, [email, password]);

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      toast.error("Please fill in all fields!");
      setShake(true);
      setTimeout(() => setShake(false), 500);
      return;
    }

    await login(dispatch, { loginField: email, password: password });
  };

  return (
    <div className="flex h-screen justify-center items-center bg-gradient-to-r from-rose-100 via-rose-50 to-rose-100 animate-gradient">
      <div className="flex justify-evenly items-center w-full gap-10 align-middle h-full">
        
        {/* Left side: Image with smooth fade-in */}
        <div
          className={`w-[40%] sm:flex p-4 bg-white shadow-lg border rounded-xl hidden items-center justify-center overflow-hidden h-full transform transition-all duration-1000 ease-in-out ${
            imageLoaded ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-10"
          }`}
        >
          <img
            src={sideImage}
            alt="Love"
            className="h-[90%] scale-105 hover:scale-110 transition-transform duration-700 ease-in-out"
            onLoad={() => setImageLoaded(true)}
          />
        </div>

        {/* Right side: Login form */}
        <div
          className={`bg-white rounded-xl shadow-xl lg:w-[30%] sm:w-fit p-10 transform transition-all duration-700 ease-in-out ${
            shake ? "animate-shake" : ""
          }`}
        >
          <form className="max-w-sm mx-auto" onSubmit={handleSubmit}>
            <h2 className="text-3xl font-bold text-center mb-6 text-rose-500 animate-fadeIn">
              Welcome Back ❤️
            </h2>

            <div className="mb-5">
              <label
                htmlFor="email"
                className="block text-lg mb-1 font-medium text-gray-900 dark:text-white"
              >
                Your email or phone number
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={handleEmailChange}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-rose-400 focus:border-rose-400 block w-full p-2.5 transition-all duration-300 hover:shadow-md"
                placeholder="Email or phone number"
                required
              />
            </div>

            <div className="mb-5">
              <label
                htmlFor="password"
                className="block mb-1 text-lg font-medium text-gray-900 dark:text-white"
              >
                Your password
              </label>
              <PasswordInput
                type="password"
                id="password"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-rose-400 focus:border-rose-400 block w-full p-2.5 transition-all duration-300 hover:shadow-md"
                required
                placeholder="Password"
                value={password}
                onChange={handlePasswordChange}
              />
            </div>

            <div
              onClick={() => navigate("/register")}
              className="text-center my-3 text-gray-700"
            >
              Not registered?{" "}
              <span className="text-rose-500 hover:text-rose-600 underline cursor-pointer transition-all duration-200">
                Click here
              </span>
            </div>

            {/* Submit button with animation */}
            <button
              type="submit"
              className="text-white my-3 bg-rose-400 hover:bg-rose-500 focus:ring-4 focus:outline-none focus:ring-rose-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center transition-transform transform hover:scale-105"
            >
              Submit
            </button>

            {/* Google button with hover effect */}
            <button
              type="button"
              className="text-white bg-[#4285F4] hover:bg-[#357ae8] focus:ring-4 focus:outline-none focus:ring-[#4285F4]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center me-2 mb-2 transition-transform transform hover:scale-105"
              onClick={(e) => {
                googleAuthInitiator(e);
              }}
            >
              <FaGoogle className="mr-3 animate-pulse" />
              Sign in with Google
            </button>
          </form>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}

export default Login;

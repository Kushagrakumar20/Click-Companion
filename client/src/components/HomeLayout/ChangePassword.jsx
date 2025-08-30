import React, { useRef, useState } from "react";
import { assets } from "../assets/assets";
import { FcLock } from "react-icons/fc";
import { useDispatch, useSelector } from "react-redux";
import axios from 'axios';
import { toast } from "react-toastify";
import { setIsUserDashboardOpen } from "../slices/UserSlice";

function ChangePassword() {
  const dispatch = useDispatch();
  const password = useRef();
  const newPassword = useRef();
  const confirmNewPassword = useRef();

  const backendAPI = useSelector((store) => store.backendAPI.API)
  const { userToken } = useSelector((store) => store.user)
  const handleSubmit = async() => {

    if(!password.current.value || !newPassword.current.value || !confirmNewPassword.current.value){
      return toast.error("Password can't be empty")
    }

    if(newPassword.current.value !== confirmNewPassword.current.value){
      return toast.error("New password doesn't match")
    }

    if(password.current.value === newPassword.current.value){
      return toast.error("New password must differ from old password")
    }

    try {
      const { data } = await axios.post(backendAPI+"/api/users/update-password",
        {password: password.current.value, newPassword: newPassword.current.value},
        {headers: {token: userToken},},
      )

      if(data.success){
        toast.success(data.message)
        password.current.value = null;
        newPassword.current.value = null;
        confirmNewPassword.current.value = null;
        dispatch(setIsUserDashboardOpen(false))
      } else {
        toast.error(data.message)
      }
    } catch (error) {
      toast.error(error.message)
    }
  }
  return (
    <div>
      <div className="flex flex-col gap-2">
        <div className="flex items-center px-3 border-1 border-black/30 rounded-md">
          <img src={assets.lock_icon} alt="" />
          <input
            ref={password}
            className="outline-none px-4 py-2"
            type="password"
            placeholder="Current Password"
          />
        </div>
        <div className="flex items-center px-2 border-1 border-black/30 rounded-md">
          <FcLock />
          <input
            ref={newPassword}
            className="outline-none px-4 py-2"
            type="password"
            placeholder="New Password"
          />
        </div>
        <div className="flex items-center px-2 border-1 border-black/30 rounded-md">
          <FcLock />
          <input
            ref={confirmNewPassword}
            className="outline-none px-4 py-2"
            type="password"
            placeholder="Confirm New Password"
          />
        </div>
      </div>
      <div className="flex items-center justify-center mt-7">
        <button onClick={handleSubmit} className="border-green-400 px-4 py-2 rounded-lg border-2 cursor-pointer hover:border-none hover:bg-green-500 hover:text-white">Update Password</button>
      </div>
    </div>
  );
}

export default ChangePassword;

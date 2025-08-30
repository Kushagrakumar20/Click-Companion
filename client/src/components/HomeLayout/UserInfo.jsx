import React from "react";
import { FaDownload } from "react-icons/fa";
import { IoLogOutOutline } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import {setUserToken,setUserData,setIsUserDashboardOpen,setUserApplications} from "../slices/UserSlice";

function UserInfo() {
  const dispatch = useDispatch();
  const { userData, userApplications } = useSelector((store) => store.user)
  const logout = () => {
    dispatch(setUserData(null));
    dispatch(setUserToken(null));
    dispatch(setIsUserDashboardOpen(false));
    dispatch(setUserApplications(null));
  };

  return (
    <div className="">
      <div>
        <div className="flex flex-col gap-2">
          <label htmlFor="">{`Total Applied Jobs: ${userApplications.length}`}</label>
          <label htmlFor="">{`Total Accepted Jobs: ${userApplications.filter(app => app.status === "Accepted").length}`}</label>
          <label htmlFor="">{`Total Rejected Jobs: ${userApplications.filter(app => app.status === "Rejected").length}`}</label>
        </div>
        <div className="flex items-center justify-center gap-2 mt-5 py-2">
          <div className="bg-black/30 flex py-2 px-4 rounded-lg hover:border-none hover:text-white hover:bg-green-500 gap-3 cursor-pointer">
            <FaDownload className="w-5 h-5 mt-1" />
            <a 
              href={userData.resume}
              target="_blank"
              className="text-lg cursor-pointer" htmlFor="">
              Download Resume
            </a>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-center mt-10">
        <div
          onClick={logout}
          className="border-red-300 border-2 flex py-2 px-4 gap-1 rounded-lg hover:border-none hover:text-white hover:bg-red-500"
        >
          <IoLogOutOutline className="w-7 h-7" />
          <label htmlFor="">Logout</label>
        </div>
      </div>
    </div>
  );
}

export default UserInfo;

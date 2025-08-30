import React, { useEffect, useRef, useState } from "react";
import { assets } from "../assets/assets";
import { MdOutlineModeEdit } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import { LuCircleUserRound } from "react-icons/lu";
import { MdOutlineFileUpload } from "react-icons/md";
import UserInfo from "./UserInfo";
import UpdateResume from "./UpdateResume";
import ChangePassword from "./ChangePassword";
import DeleteAccount from "./DeleteAccount";
import { setIsUserDashboardOpen, setUserData } from "../slices/UserSlice";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import axios from "axios";

function RecruiterLogin() {
  const [activePage, setActivePage] = useState("userProfile");
  const [isNameEditable, setIsNameEditable] = useState(false);
  const fullName = useRef();
  const dispatch = useDispatch();
  const { userData, userToken } = useSelector((store) => store.user);
  const backendAPI = useSelector((store) => store.backendAPI.API);

  useEffect(() => {
    fullName.current.value = userData.name;
  }, [userData.name]);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, []);


  const toggleEdit = () => {
    setIsNameEditable((prev) => {
      const newEditable = !prev;
      if (newEditable && fullName.current) {
        fullName.current.focus();
      } else {
        fullName.current.blur();
      }
      return newEditable;
    });
  };


  // Update Profile
  const updateProfile = async (e) => {
    const file = e.target.files[0];
    try {
      const formData = new FormData();
      formData.append("image", file);

      const { data } = await axios.post(
        backendAPI + "/api/users/update-profile",
        formData,
        { headers: { token: userToken } }
      );

      if (data.success) {
        toast.success(data.message);
        dispatch(setUserData(data.user));
        dispatch(setIsUserDashboardOpen(false))
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };


  // update name
  const updateName = async() => {

    try {
      if(!fullName.current.value){
        return toast.error("Name can't be empty")
      }

      const { data } = await axios.post(backendAPI+"/api/users/update-name",
        {newName: fullName.current.value},
        {headers: {token: userToken}}
      )

      if(data.success){
        toast.success(data.message)
        toggleEdit();
        dispatch(setUserData(data.user))
        dispatch(setIsUserDashboardOpen(false))
      } else {
        toast.error(data.message)
      }
    } catch (error) {
      toast.error(error.message)
    }
  }


  // Conditionally render the content based on the active page
  const renderContent = () => {
    switch (activePage) {
      case "changePassword":
        return <ChangePassword />;
      case "updateResume":
        return <UpdateResume />;
      case "deleteAccount":
        return <DeleteAccount />;
      case "userProfile":
      default:
        return <UserInfo />;
    }
  };

  return (
    <div className="absolute top-0 right-0 left-0 bottom-0 z-10 backdrop-blur-sm bg-black/30 flex justify-center items-center">
      <div className="relative bg-white p-5 rounded-xl w-[50vw]">
        <div>
          {/* Header/Profile Section */}
          <div className="flex gap-10 px-8 py-5 border-b-2 border-dotted">
            <div className="relative group w-32 h-32 cursor-pointer">
              <img
                className="w-full h-full object-cover rounded-full"
                src={userData ? userData.image : assets.upload_area}
                alt="Profile"
              />
              {/* Hidden file input that accepts image files */}
              <input
                id="fileInput"
                type="file"
                accept="image/*"
                onChange={updateProfile}
                hidden
              />
              <label className="cursor-pointer" htmlFor="fileInput">
                <span className="absolute inset-0 bg-black/50 bg-opacity-50 opacity-0 group-hover:opacity-100 flex justify-center items-center rounded-full transition-opacity duration-300">
                <p className="text-white text-sm font-medium">Update Profile</p>
                </span>
              </label>

            </div>

            <div className="flex flex-col justify-center gap-3 ml-6">
              <div className={`flex rounded-md ${isNameEditable ? "border-b-2 border-black" : ""}`}>
                <input
                  className="w-40 border-none outline-none bg-transparent"
                  type="text"
                  readOnly={!isNameEditable}
                  ref={fullName}
                />
                {isNameEditable ? (
                  <MdOutlineFileUpload
                    onClick={updateName}
                    className="w-5 h-5 mt-1 cursor-pointer"
                  />
                ) : (
                  <MdOutlineModeEdit
                    onClick={toggleEdit}
                    className="w-5 h-5 mt-1 cursor-pointer"
                  />
                )}
              </div>
              <label>{`Email Id: ${userData.email}`}</label>
            </div>
          </div>

          {/* Main Content: Sidebar and Outlet */}
          <div className="flex my-5">
            {/* Sidebar */}
            <div className="border-r-2 border-dotted pr-2">
              <ul className="flex flex-col items-start text-gray-800">
                <li
                  onClick={() => setActivePage("changePassword")}
                  className={`flex items-center p-3 sm:px-6 gap-2 w-full cursor-pointer hover:bg-gray-200 ${
                    activePage === "changePassword"
                      ? "bg-blue-100 r-4 border-blue-500 border-r-3"
                      : "border-transparent border-r-3"
                  }`}
                >
                  <img className="w-5 h-5" src={assets.lock_icon} alt="Change Password" />
                  <p>Change Password</p>
                </li>
                <li
                  onClick={() => setActivePage("updateResume")}
                  className={`flex items-center p-3 sm:px-6 gap-2 w-full cursor-pointer hover:bg-gray-200 ${
                    activePage === "updateResume"
                      ? "bg-blue-100 r-4 border-blue-500 border-r-3"
                      : "border-transparent border-r-3"
                  }`}
                >
                  <img className="w-5 h-5" src={assets.resume_selected} alt="Update Resume" />
                  <p>Update Resume</p>
                </li>
                <li
                  onClick={() => setActivePage("deleteAccount")}
                  className={`flex items-center p-3 sm:px-6 gap-2 w-full cursor-pointer hover:bg-gray-200 ${
                    activePage === "deleteAccount"
                      ? "bg-blue-100 r-4 border-blue-500 border-r-3"
                      : "border-transparent border-r-3"
                  }`}
                >
                  <MdDelete className="w-5 h-5" />
                  <p>Delete Account</p>
                </li>
                <li
                  onClick={() => setActivePage("userProfile")}
                  className={`mt-30 flex items-center p-3 sm:px-6 gap-2 w-full cursor-pointer hover:bg-gray-200 ${
                    activePage === "userProfile"
                      ? "bg-blue-100 r-4 border-blue-500 border-r-3"
                      : "border-transparent border-r-3"
                  }`}
                >
                  <LuCircleUserRound className="w-5 h-5" />
                  <p>User Profile</p>
                </li>
              </ul>
            </div>

            {/* Outlet Area */}
            <div className="flex-1 h-full p-2 sm:p-5">{renderContent()}</div>
          </div>
        </div>
        <img
          onClick={() => dispatch(setIsUserDashboardOpen(false))}
          className="absolute top-5 right-5 w-4 h-4 cursor-pointer"
          src={assets.cross_icon}
          alt=""
        />
      </div>
    </div>
  );
}

export default RecruiterLogin;

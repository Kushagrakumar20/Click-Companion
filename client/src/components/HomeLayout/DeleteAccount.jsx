import React, { useRef } from 'react'
import { assets } from '../assets/assets'
import { useDispatch, useSelector} from 'react-redux'
import { toast } from 'react-toastify';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'
import { setIsUserDashboardOpen, setUserData, setUserToken, setUserApplications } from '../slices/UserSlice';

function DeleteAccount() {
  const navigate = useNavigate()
  const dispatch = useDispatch();
  const password = useRef();
  const confirmPassword = useRef();
  const backendAPI = useSelector((store) => store.backendAPI.API)
  const { userToken } = useSelector((store) => store.user)

  const handleDelete = async() => {
    if(!password.current.value || !confirmPassword.current.value){
      return toast.error("Password can't be empty")
    }

    if(password.current.value !== confirmPassword.current.value){
      return toast.error("Password doesn't match")
    }

    try {
      
      const { data } = await axios.post(backendAPI+"/api/users/delete-account",
        {password: password.current.value},
        {headers: {token: userToken}},
      )
  
      if(data.success){
        toast.success("Account Deleted Sucessfully")
        dispatch(setIsUserDashboardOpen(false))
        dispatch(setUserData(null))
        dispatch(setUserApplications(null))
        dispatch(setUserToken(null))
        navigate('/')
      } else {
        toast.error(data.message)
      }
    } catch (error) {
      toast.error(error.message)
    }
  }

  return (
    <div>
      <div className='flex flex-col gap-3'>
        <label htmlFor="">Are you sure you want to delete this account?</label>
        <div className="flex items-center border-1 border-black/30 rounded-md pl-2">
          <img src={assets.lock_icon} alt="" />
          <input
            ref={password}
            className="outline-none px-2 py-2"
            type="password"
            placeholder="Password"
          />
        </div>
        <div className="flex items-center border-1 border-black/30 rounded-md pl-2">
          <img src={assets.lock_icon} alt="" />
          <input
            ref={confirmPassword}
            className="outline-none px-2 py-2"
            type="password"
            placeholder="Confirm Password"
          />
        </div>
      </div>
      <div className='flex items-center justify-center mt-10'>
        <button onClick={handleDelete} className='border-red-300 border-2 text-black px-4 py-2 rounded-lg cursor-pointer hover:bg-red-600 hover:text-white hover:border-none'>Delete Account</button>
      </div>
    </div>
  )
}

export default DeleteAccount
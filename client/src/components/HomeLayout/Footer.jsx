import React from 'react'
import { assets } from '../assets/assets'

function Footer() {
  return (
    <div className='container px-20 mx-auto flex items-center justify-between gap-4 py-3 mt-20'>
      <img src={assets.logo} alt="" />
      <p className='flex-1  pl-4 text-sm text-gray-500 max-sm:hidden'>Copyright @GreatStack.dev | All right reserved.</p>
      <div className='flex justify-center items-center gap-4'>
        <img className='cursor-pointer' width={38} src={assets.facebook_icon} alt="" />
        <img className='cursor-pointer' width={38} src={assets.twitter_icon} alt="" />
        <img className='cursor-pointer' width={38} src={assets.instagram_icon} alt="" />
      </div>
    </div>
  )
}

export default Footer
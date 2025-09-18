import React from 'react'
import { Link } from 'react-router-dom'

const Start = () => {
  return (
    <div>
      <div className='h-screen flex justify-between w-full flex-col pt-5 bg-[url("/Instara.png")] bg-cover bg-bottom'>
        <img  className='w-30 ml-5' src="/FLYER.png" alt="" />
        <div className='bg-white py-5 px-5 '>
           <h2 className='text-3xl font-bold '>Get Started with Instara</h2>
          <div className='w-full flex gap-4'>
           <Link to={"/store-home"} className='flex items-center justify-center bg-black  w-1/2 text-white py-4 px-4 rounded mt-4'>Store</Link>                            
           <Link to={"/home"} className='flex items-center justify-center bg-black  w-1/2 text-white py-4 px-4 rounded mt-4'>User</Link>
          </div>
          </div>
      </div>
    </div>
  )
}

export default Start

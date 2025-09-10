import React from 'react'
import './Failed.css'
import { Helmet } from 'react-helmet';
import { toastFailure } from '../../func.jsx';

import close from '../../Assets/close3.png'

function Failed() {
  window.onload = function(){
    setTimeout(() => { toastFailure("Payment Failed") }, 500); 
  }
  
  return (
    <div className='flex flex-col pt-20 w-screen mt-8'>
      <Helmet><title>Pro Work - Payment Failed</title></Helmet>
      <div className="w-full max-w-[1250px] mx-auto px-4 xl:px-0" >
        <h1 className='failedh1  text-[2rem] sm:text-[2.5rem]'>Payment Failed</h1>
          
        <h3 className='my-4 font-semibold text-gray-700 mb-4'>
          <span className='text-black'>Payment ID = </span> 
          <span className='text-blue-600'>Not Available</span>
        </h3>
        <h3 className='my-4 font-semibold text-gray-700 mb-4'>
          <span className='text-black'>Please try again later.</span>
        </h3>
        <div className="w-full max-w-[1250px] xl:px-0 pb-4">
          <h2>We apologize for the inconvenience.</h2>
          <p>Your transaction could not be completed.  <img src={close} alt="Failed" className='h-8 py-1' /></p>
        </div>
        <div className='flex items-center justify-between xs:justify-normal mb-4'>
          <h3 className='font-semibold text-gray-700 xs:mr-40'>Go back to </h3>
          <button className='text-[#1d6955] border border-[#1d6955] py-2 px-6 rounded-md hover:bg-[#edfbf7] hover:shadow-shadow5px'><a href='/'>Home</a></button>   
        </div>

      </div>
    </div>
    
  )
}

export default Failed
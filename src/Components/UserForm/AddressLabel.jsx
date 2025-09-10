// Package
import { useContext } from 'react'

// Assets
import next_icon from '../../Assets/next.png'

// Functions
import { toggleAddressLabel } from './funcUserForm'
import { MyContext } from '../../ContextAPI'

function AddressLabel() {
  const { AddressFormData, setEditAddressDetails } = useContext(MyContext);

  return (
    <div className="displayNone fixed inset-0 flex items-center justify-center z-50" id='AddressDetailsLabel'>
      <div className='absolute inset-0 bg-black opacity-50'></div>
      <div className='relative flex h-full sm:h-auto w-full flex-col bg-white sm:w-[32rem] sm:rounded-2xl shadow-shadow20px'>

        <div className='flex items-center h-12 w-full pl-4'>
          <img className='h-6 cursor-pointer rotate-180' src={next_icon} alt="back arrow" onClick={() => {toggleAddressLabel(false)}} />
          <h3 className='text-md '><span className='text-gray-500 cursor-pointer' onClick={() => {toggleAddressLabel(false)}}>Profile</span> / <span>Address Details</span></h3>
        </div>

        <div className='flex flex-wrap justify-center w-full py-8 md:py-2'>

          <div className='flex w-full flex-wrap justify-center'>
            <div className='flex w-full justify-center'>
              <fieldset className=' h-16 w-[95%] pl-4 border-2 border-gray-400 rounded-xl mb-8 '>
                <legend className='text-gray-400'>Address</legend>
                <label className='border-0 focus:outline-none w-[95%]'>{AddressFormData.Address}</label>
              </fieldset>
            </div>
          </div>

          <div className='flex w-full flex-wrap justify-center'>
            <div className='flex w-full justify-center'>
              <fieldset className=' h-16 w-[95%] pl-4 border-2 border-gray-400 rounded-xl mb-8 '>
                <legend className='text-gray-400'>Landmark</legend>
                <label className='border-0 focus:outline-none w-[95%]'>{AddressFormData.Landmark}</label>
              </fieldset>
            </div>
          </div>

          <div className='flex w-full flex-wrap justify-center'>
            <div className='flex w-full justify-center'>
              <fieldset className=' h-16 w-[95%] pl-4 border-2 border-gray-400 rounded-xl mb-8 '>
                <legend className='text-gray-400'>Pin Code</legend>
                <label className='border-0 focus:outline-none w-[95%]'>{AddressFormData.PinCode}</label>
              </fieldset>
            </div>
          </div>

        <button className='h-12 w-[95%] border-2 border-[#33806b] rounded-xl shadow-shadow5px shadow-black text-[#33806b] bg-[#f2da1d] ' id='send-OTP-BTN' onClick={() =>{setEditAddressDetails(true), toggleAddressLabel(false)}}>Edit Details</button>
      </div>
    </div>
  </div>
  
  )
}

export default AddressLabel
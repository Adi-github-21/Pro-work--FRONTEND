// Package
import { useState, useContext } from 'react'

// Assets
import next_icon from '../../Assets/next.png'
import loadState from '../../Assets/loadingState.gif';

// Functions
import { URL, toastSuccess, toastFailure } from '../../func.jsx';
import { toggleAddressForm } from './funcUserForm.js';
import { MyContext } from '../../ContextAPI'


function AddressForm() {
  const { error, setErrors, loadingState, setLoadingState, UserData, setAddressFormData } = useContext(MyContext);
  const [LocalAddressFormData, setLocalAddressFormData] = useState({ Address: '', Landmark: '', PinCode: '', isAddress: false })

  // Updating the address data in the state
  const handleAddressInput = (e) => {
    const { name, value } = e.target
    if (name === 'PinCode' && value.length <= 6) {
      setLocalAddressFormData({ ...LocalAddressFormData, [name]: value });
    }
    else if (name !== 'PinCode') {
      setLocalAddressFormData({ ...LocalAddressFormData, [name]: value });
    }

  }

  // Validating the user address, landmark, and pincode
  const ValidationErrors = {}
  function validateAddressDetails() {
    if (!LocalAddressFormData.Address) {
      ValidationErrors.Address = "House Address is Required"
      setLoadingState(false)
    }

    if (!LocalAddressFormData.Landmark) {
      ValidationErrors.Landmark = "Landmark is also Required"
      setLoadingState(false)
    }

    if (!LocalAddressFormData.PinCode) {
      ValidationErrors.PinCode = "Pin code is Required"
      setLoadingState(false)
    }
    else if (LocalAddressFormData.PinCode.length != 6) {
      ValidationErrors.PinCode = "Pin code is must be 6 digit"
      setLoadingState(false)
    }

    setErrors(ValidationErrors)
  }

  // Submintting the address data to the server
  const handleAddressSubmit = async (e) => {
    e.preventDefault()
    setLoadingState(true);
    validateAddressDetails()
    if (Object.keys(ValidationErrors).length === 0) {
      const UserObjectID = UserData.UserObjectID
      console.log('Address Form data before submission:', LocalAddressFormData);

      const addressResponse = await fetch(`${URL}/user/address`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, credentials: 'include', body: JSON.stringify({ LocalAddressFormData, UserObjectID }) });
      if (addressResponse.status == 201) {
        setTimeout(() => {
          toastSuccess("Address details saved successfully")
          setAddressFormData({ ...LocalAddressFormData, isAddress: true });
          toggleAddressForm(false)
          setLoadingState(false);
          setLocalAddressFormData({ Address: '', Landmark: '', PinCode: '', isAddress: false });
        }, 1300);
      } else if (addressResponse.status == 401 || addressResponse.status == 500) {
        const addressData = await addressResponse.json();
        toastFailure(addressData.message);
        setLoadingState(false);
      } else {
        toastFailure("Something went wrong, Please try again");
        setLoadingState(false);
      }
    }
  }

  return (
    <div className="displayNone fixed inset-0 flex items-center justify-center z-50" id='AddressDetailsForm'>
      <div className='absolute inset-0 bg-black opacity-50'></div>
      <div className='relative flex h-full sm:h-auto w-full flex-col bg-white sm:w-[32rem] sm:rounded-2xl shadow-shadow20px'>

        <div className='flex items-center h-12 w-full pl-4'>
          <img className='h-6 cursor-pointer rotate-180' src={next_icon} alt="back arrow" onClick={() => {toggleAddressForm(false)}} />
          <h3 className='text-md '><span className='text-gray-500 cursor-pointer' onClick={() => {toggleAddressForm(false)}} >Profile</span> / <span>Address Details</span></h3>
        </div>

        <form className='flex flex-wrap justify-center w-full py-8 md:py-2' onSubmit={handleAddressSubmit}>

          <div className='flex w-full flex-wrap justify-center'>
            <div className='flex w-full justify-center'>
              <fieldset className=' h-16 w-[95%] pl-4 border-2 border-gray-400 rounded-xl mb-8 '>
                <legend className='text-gray-400'>Address</legend>
                <input className='border-0 focus:outline-none w-[95%]' name='Address' placeholder='Enter your house address' type="text" onChange={handleAddressInput} autoFocus />
              </fieldset>
            </div>
            {error.Address && <span className='errormassDiv text-red-500 mb-6 -mt-8 w-[95%] pl-4'>{error.Address}</span>}
          </div>

          <div className='flex w-full flex-wrap justify-center'>
            <div className='flex w-full justify-center'>
              <fieldset className=' h-16 w-[95%] pl-4 border-2 border-gray-400 rounded-xl mb-8 '>
                <legend className='text-gray-400'>Landmark</legend>
                <input className='border-0 focus:outline-none w-[95%]' name='Landmark' placeholder='landmark (Optional)' type="text" onChange={handleAddressInput} autoFocus />
              </fieldset>
            </div>
            {error.Landmark && <span className='errormassDiv text-red-500 mb-6 -mt-8 w-[95%] pl-4'>{error.Landmark}</span>}
          </div>

          <div className='flex w-full flex-wrap justify-center'>
            <div className='flex w-full justify-center'>
              <fieldset className=' h-16 w-[95%] pl-4 border-2 border-gray-400 rounded-xl mb-8 '>
                <legend className='text-gray-400'>Pin Code</legend>
                <input className='border-0 focus:outline-none w-[95%]' name='PinCode' placeholder='Enter pin code' type='number' value={LocalAddressFormData.PinCode} onChange={handleAddressInput} autoFocus />
              </fieldset>
            </div>
            {error.PinCode && <span className='errormassDiv text-red-500 mb-6 -mt-8 w-[95%] pl-4'>{error.PinCode}</span>}
          </div>

          <button className='h-12 w-[95%] border-2 border-white rounded-xl shadow-shadow5px shadow-black bg-[#188e6d] text-white' id='send-OTP-BTN' onClick={handleAddressSubmit}>
            {loadingState ? <div className='flex justify-center items-center'><img src={loadState} className='h-8' alt="" /></div> : "Save Details"}
          </button>
        </form>
      </div>
    </div>
  )
}

export default AddressForm
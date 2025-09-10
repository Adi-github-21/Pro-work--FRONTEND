// Package
import { useState, useContext } from 'react'

// Assets
import next_icon from '../../Assets/next.png'
import loadState from '../../Assets/loadingState.gif';

// Functions
import { URL, toastSuccess, toastFailure } from '../../func.jsx';
import { toggleAddressEdit } from './funcUserForm'
import { MyContext } from '../../ContextAPI'


function AddressFormEdit() {

  const { UserData, error, setErrors, loadingState, setLoadingState, AddressFormData, setAddressFormData, setEditAddressDetails } = useContext(MyContext);
  const [EditAddressFormData, setEditAddressFormData] = useState({ Address: AddressFormData.Address, Landmark: AddressFormData.Landmark, PinCode: AddressFormData.PinCode })

  // Updating the address data in the state
  const handleAddressInputEdit = (e) =>{
    const {name, value} = e.target
    if(name === 'PinCode' && value.length <= 6) {
      setEditAddressFormData({ ...EditAddressFormData, [name]: value });
    }
    else if(name !== 'PinCode') {
      setEditAddressFormData({ ...EditAddressFormData, [name]: value });

    }
  }

  // Validating the user address, landmark, and pincode
  const ValidationErrors = {}
  function validateAddressDetails(){

    if(EditAddressFormData.Address == AddressFormData.Address && EditAddressFormData.Landmark == AddressFormData.Landmark && EditAddressFormData.PinCode == AddressFormData.PinCode ) { 
      ValidationErrors.Address = "No changes dectected"
      ValidationErrors.Landmark = "No changes dectected"
      ValidationErrors.PinCode = "No changes dectected"
      setLoadingState(false) 
    }

    if(!EditAddressFormData.Address) { 
      ValidationErrors.Address = "House Address is Required" 
      setLoadingState(false) 
    }

    if(!EditAddressFormData.Landmark) { 
      ValidationErrors.Landmark = "Landmark is also Required" 
      setLoadingState(false) 
    }

    if(!EditAddressFormData.PinCode) { 
      ValidationErrors.PinCode = "Pin code is Required"
      setLoadingState(false) 
     }
    else if(EditAddressFormData.PinCode.toString().length != 6) { 
      ValidationErrors.PinCode = "Pin code is must be 6 digit"
      setLoadingState(false) 
    }

    setErrors(ValidationErrors)
  }

  // Submitting the form address data to the server after editing
  const handleAddressEditSubmit = async (e) =>{
    e.preventDefault()
    setLoadingState(true);
    validateAddressDetails()
    if(Object.keys(ValidationErrors).length === 0){
      const UserObjectID = UserData.UserObjectID
      console.log('Form data before submission:', EditAddressFormData);

      const addressResponse = await fetch(`${URL}/user/address/edit`, { method: 'PATCH', headers: { 'Content-Type': 'application/json' }, credentials: 'include', body: JSON.stringify({ EditAddressFormData, UserObjectID }) });
      if(addressResponse.status == 201){
       setTimeout(() => { 
        toastSuccess("Address details updated successfully")
          toggleAddressEdit()
          setEditAddressDetails(false)
          setAddressFormData({ ...EditAddressFormData, isAddress: true });
          setLoadingState(false);
        }, 1300);
      } else if (addressResponse.status == 401 || addressResponse.status == 500){
        const addressData = await addressResponse.json();
        toastFailure(addressData.message);
        setLoadingState(false);
      } else {
        toastFailure("Something went wrong, Please try again");
        setLoadingState(false);
      }
    }
  }

  // Close the address edit form and update the address form data to previous state
  const CloseAddressEditForm = () => {
    toggleAddressEdit(),
    setEditAddressDetails(false),
    setEditAddressFormData({ ...EditAddressFormData, Address: AddressFormData.Address, Landmark: AddressFormData.Landmark, PinCode: AddressFormData.PinCode })
  }

  return (
    <div className="displayFlex fixed flex inset-0 justify-center items-center z-50" id='EditAddressDetailsForm'>
      <div className='absolute inset-0 bg-black opacity-50'></div>
      <div className=' relative flex h-full w-full flex-col bg-white sm:h-auto sm:w-[32rem] sm:rounded-2xl shadow-shadow20px'>

        <div className='flex items-center h-12 w-full pl-4'>
          <img className='h-6 cursor-pointer rotate-180' src={next_icon} alt="back arrow" onClick={CloseAddressEditForm} />
          <h3 className='text-md '><span className='text-gray-500 cursor-pointer' onClick={CloseAddressEditForm}>Profile</span> / <span>Address Details</span></h3>
        </div>

        <form className='flex flex-wrap justify-center w-full py-8 md:py-2' onSubmit={handleAddressEditSubmit}>

            <div className='flex w-full flex-wrap justify-center'>
              <div className='flex w-full justify-center'>
                <fieldset className=' h-16 w-[95%] pl-4 border-2 border-gray-400 rounded-xl mb-8 '>
                  <legend className='text-gray-400'>Address</legend>
                  <input className='border-0 focus:outline-none w-[95%]' name='Address' placeholder='Enter your house address' type="text" value={EditAddressFormData.Address}  onChange={handleAddressInputEdit} autoFocus />    
                </fieldset>
              </div>
             {error.Address && <span className='errormassDiv text-red-500 mb-6 -mt-8 w-[95%] pl-4'>{error.Address}</span>}
            </div>

            <div className='flex w-full flex-wrap justify-center'>
              <div className='flex w-full justify-center'>
                <fieldset className=' h-16 w-[95%] pl-4 border-2 border-gray-400 rounded-xl mb-8 '>
                  <legend className='text-gray-400'>Landmark</legend>
                  <input className='border-0 focus:outline-none w-[95%]' name='Landmark' placeholder='landmark (Optional)' type="text" value={EditAddressFormData.Landmark} onChange={handleAddressInputEdit} autoFocus />    
                </fieldset>
              </div>
              {error.Landmark && <span className='errormassDiv text-red-500 mb-6 -mt-8 w-[95%] pl-4'>{error.Landmark}</span>}
            </div>

            <div className='flex w-full flex-wrap justify-center'>
              <div className='flex w-full justify-center'>
                <fieldset className=' h-16 w-[95%] pl-4 border-2 border-gray-400 rounded-xl mb-8 '>
                  <legend className='text-gray-400'>Pin Code</legend>
                  <input className='border-0 focus:outline-none w-[95%]' name='PinCode' placeholder='Enter your number' type='number' value={EditAddressFormData.PinCode} onChange={handleAddressInputEdit} autoFocus />    
                </fieldset>
              </div>
              {error.PinCode && <span className='errormassDiv text-red-500 mb-6 -mt-8 w-[95%] pl-4'>{error.PinCode}</span>}
            </div>

          <button className='h-12 w-[95%] border-2 border-white rounded-xl shadow-shadow5px shadow-black bg-[#188e6d] text-white' id='send-OTP-BTN' onClick={handleAddressEditSubmit}>
            {loadingState ?  <div className='flex justify-center items-center'><img src={loadState} className='h-8' alt="" /></div>: "Update Details"}
          </button>
        </form>
      </div>
    </div>
  )
}

export default AddressFormEdit
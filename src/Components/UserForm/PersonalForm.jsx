// Package 
import { useState, useContext } from 'react'

// Assets
import next_icon from '../../Assets/next.png'
import loadState from '../../Assets/loadingState.gif';

// Functions
import { togglePersonalForm } from './funcUserForm.js';
import { URL, toastSuccess, toastFailure } from '../../func.jsx';
import { MyContext } from '../../ContextAPI'

function PersonalForm() {

  const { error, setErrors,  loadingState, setLoadingState, UserData, setPersonalFormData } = useContext(MyContext);
  const [LocalPersonalFormData, setLocalPersonalFormData] = useState({ Name: '', Email: '', isPersonal: false })

  // Updating the personal data in the state
  const handlePersonalInput = (e) =>{
    const {name, value} = e.target
    setLocalPersonalFormData({ ...LocalPersonalFormData, [name]: value });
  }

  // Validating the user Name and Email
  const ValidationErrors = {}
  function validatePersonalDetails(){
    if(!LocalPersonalFormData.Name) { ValidationErrors.Name = "Name is Required"
    setLoadingState(false) 
   }

    if(!LocalPersonalFormData.Email) { ValidationErrors.Email = "Email is Required"
    setLoadingState(false)  }
    else if(!/\S+@\S+\.\S+/.test(LocalPersonalFormData.Email)) { ValidationErrors.Email = "Email is not valid"
    setLoadingState(false)  }

    setErrors(ValidationErrors)
  }
 
  // Submitting the form personal data to the server
  const handlePersonalSubmit = async (e) =>{
    e.preventDefault()
    setLoadingState(true);
    validatePersonalDetails()
    if(Object.keys(ValidationErrors).length === 0){
      const UserObjectID = UserData.UserObjectID
      console.log('Personal Form data before submission:', LocalPersonalFormData);
    
      const personalResponse = await fetch(`${URL}/user/personal`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, credentials: 'include', body: JSON.stringify({ LocalPersonalFormData, UserObjectID }) });
      if(personalResponse.status == 201){        
        setTimeout(() => { 
          toastSuccess("Personal details saved successfully")
          setPersonalFormData({ ...LocalPersonalFormData, isPersonal: true });
          togglePersonalForm(false)
          setLoadingState(false);
          setLocalPersonalFormData({ Name: '', Email: '', isPersonal: false });
        }, 1300);
      } else if (personalResponse.status == 401 || personalResponse.status == 500){
        const personalData = await personalResponse.json();
        toastFailure(personalData.message);
        console.log("Error in personal details submission", personalData);
        setLoadingState(false);
      } else {
        toastFailure("Something went wrong, Please try again");
        setLoadingState(false);
      }
    }
  } 

  return (
    <div className="displayNone fixed inset-0 flex items-center justify-center z-50" id='PersonalDetailsForm'>
      <div className='absolute inset-0 bg-black opacity-50'></div>
      <div className='relative flex h-full sm:h-auto w-full flex-col bg-white sm:w-[32rem] sm:rounded-2xl shadow-shadow20px'>

        <div className='flex items-center h-12 w-full pl-4'>
          <img className='h-6 cursor-pointer rotate-180' src={next_icon} alt="back arrow" onClick={() => {togglePersonalForm(false)}}  />
          <h3 className='text-md '><span className='text-gray-500 cursor-pointer' onClick={() => {togglePersonalForm(false)}}>Profile</span> / <span>Personal Details</span></h3>
        </div>

        <form className='flex flex-wrap justify-center w-full py-8 md:py-2' onSubmit={handlePersonalSubmit}>

            <div className='flex w-full flex-wrap justify-center'>
              <div className='flex w-full justify-center'>
                <fieldset className=' h-16 w-[95%] pl-4 border-2 border-gray-400 rounded-xl mb-8 '>
                  <legend className='text-gray-400'>Name</legend>
                  <input className='border-0 focus:outline-none w-[95%]' name='Name' placeholder='Enter your name' type="text"  onChange={handlePersonalInput} />    
                </fieldset>
              </div>
             {error.Name && <span className='errormassDiv text-red-500 mb-6 -mt-8 w-[95%] pl-4'>{error.Name}</span>}
            </div>

            <div className='flex w-full flex-wrap justify-center'>
              <div className='flex w-full justify-center'>
                <fieldset className=' h-16 w-[95%] pl-4 border-2 border-gray-400 rounded-xl mb-8 '>
                  <legend className='text-gray-400'>Email</legend>
                  <input className='border-0 focus:outline-none w-[95%]' name='Email' placeholder='Enter your email' type="text"  onChange={handlePersonalInput} />    
                </fieldset>
              </div>
              {error.Email && <span className='errormassDiv text-red-500 mb-6 -mt-8 w-[95%] pl-4'>{error.Email}</span>}
            </div>

            <div className='flex w-full flex-wrap justify-center'>
              <div className='flex w-full justify-center'>
                <fieldset className=' h-16 w-[95%] pl-4 border-2 border-gray-400 rounded-xl mb-8 '>
                  <legend className='text-gray-400'>Phone Number</legend>
                  <input className='border-0 focus:outline-none w-[95%]' name='PhoneNumber' placeholder='Enter your number' type='number' value={UserData.UserNumber} />    
                </fieldset>
              </div>
              {error.PhoneNumber && <span className='errormassDiv text-red-500 mb-6 -mt-8 w-[95%] pl-4'>{error.PhoneNumber}</span>}
            </div>

          <button className='h-12 w-[95%] border-2 border-white rounded-xl shadow-shadow5px shadow-black bg-[#188e6d] text-white' id='send-OTP-BTN' onClick={handlePersonalSubmit}>
            {loadingState ? <div className='flex justify-center items-center'><img src={loadState} className='h-8' alt="" /></div> : "Save Details"}
          </button>
        </form>
      </div>
    </div>
)
}

export default PersonalForm
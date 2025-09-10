import { useState, useContext } from 'react'

// Assets
import next_icon from '../../Assets/next.png'
import loadState from '../../Assets/loadingState.gif';

// Functions
import { URL, toastSuccess, toastFailure } from '../../func.jsx';
import { togglePersonalEdit } from './funcUserForm'
import { MyContext } from '../../ContextAPI'

function PersonalFormEdit() {
  const { error, setErrors, loadingState, setLoadingState, UserData, PersonalFormData, setPersonalFormData, setEditPersonalDetails } = useContext(MyContext);
  const [EditPersonalFormData, setEditPersonalFormData] = useState({ Name: PersonalFormData.Name }) 

  // Updating the personal data in the state
  const handlePersonalInputEdit = (e) =>{
    const {name, value} = e.target
    setEditPersonalFormData({ ...EditPersonalFormData, [name]: value, Email: PersonalFormData.Email, PhoneNumber: UserData.UserNumber});
  }

  // Validating the user Name
  const ValidationErrors = {}
  function validatePersonalDetails(){
    if(!EditPersonalFormData.Name) { ValidationErrors.Name = "Name is Required"
      setLoadingState(false) }
      else if(EditPersonalFormData.Name == PersonalFormData.Name) { ValidationErrors.Name = "No changes dectected"
    setLoadingState(false)  }

    setErrors(ValidationErrors)
  }

  // Submitting the form personal data to the server after editing
  const handlePersonalEditSubmit = async (e) =>{
    e.preventDefault()
    setLoadingState(true);
    validatePersonalDetails()
    if(Object.keys(ValidationErrors).length === 0){
      const UserObjectID = UserData.UserObjectID
      console.log('Personal Form data before submission:', EditPersonalFormData);

      const personalResponse = await fetch(`${URL}/user/personal/edit`, { method: 'PATCH', headers: { 'Content-Type': 'application/json' }, credentials: 'include', body: JSON.stringify({ EditPersonalFormData, UserObjectID }) });
      if(personalResponse.status == 201){
        setTimeout(() => { 
          toastSuccess("Personal details updated successfully")
          togglePersonalEdit()
          setEditPersonalDetails(false)
          setPersonalFormData({ ...EditPersonalFormData, isPersonal: true }); // Update the global context
          setLoadingState(false);
        }, 1300);
        
      } else if (personalResponse.status == 401 || personalResponse.status == 500){
        const personalData = await personalResponse.json();
        toastFailure(personalData.message);
        setLoadingState(false);
      } else {
        toastFailure("Something went wrong, Please try again");
        setLoadingState(false);
      }
    }
  }    

  // prevent phone number and email to te edited
  const handlePersonalNotEditInput = (e) =>{
    toastFailure(e + " cannot be changed")
  }

  // Close the personal edit form and update the personal form data to previous state
  const ClosePersonalEditForm = () => {
    togglePersonalEdit(), 
    setEditPersonalDetails(false), 
    setEditPersonalFormData({ ...EditPersonalFormData, Name: PersonalFormData.Name , Email: PersonalFormData.Email, PhoneNumber: UserData.UserNumber }) 
  }

  return (
    <div className="displayFlex fixed flex inset-0 justify-center items-center z-50" id='EditPersonalDetailsForm'>
      <div className='absolute inset-0 bg-black opacity-50'></div>
      <div className='relative flex h-full w-full flex-col bg-white sm:h-auto sm:w-[32rem] sm:rounded-2xl shadow-shadow20px'>
        <div className='flex items-center h-12 w-full pl-4'>
          <img className='h-6 cursor-pointer rotate-180' src={next_icon} alt="back arrow" onClick={ClosePersonalEditForm}/>
          <h3 className='text-md '><span className='text-gray-500 cursor-pointer' onClick={ClosePersonalEditForm}>Profile</span> / <span>Personal Details</span></h3>
        </div>

      <form className='flex flex-wrap justify-center w-full py-8 md:py-2' onSubmit={handlePersonalEditSubmit}>

          <div className='flex w-full flex-wrap justify-center'>
            <div className='flex w-full justify-center'>
              <fieldset className=' h-16 w-[95%] pl-4 border-2 border-gray-400 rounded-xl mb-8 '>
                <legend className='text-gray-400'>Name</legend>
                <input className='border-0 focus:outline-none w-[95%]' name='Name' placeholder='Enter your name' type="text" value={EditPersonalFormData.Name}  onChange={handlePersonalInputEdit} autoFocus />    
              </fieldset>
            </div>
           {error.Name && <span className='errormassDiv text-red-500 mb-6 -mt-8 w-[95%] pl-4'>{error.Name}</span>}
          </div>

          <div className='flex w-full flex-wrap justify-center'>
            <div className='flex w-full justify-center'>
              <fieldset className=' h-16 w-[95%] pl-4 border-2 border-gray-400 rounded-xl mb-8 '>
                <legend className='text-gray-400'>Email</legend>
                <input className='border-0 focus:outline-none w-[95%]' name='Email' placeholder='Enter your email' type="text" value={PersonalFormData.Email} onChange={() =>{handlePersonalNotEditInput("Email")}} />    
              </fieldset>
            </div>
          </div>

          <div className='flex w-full flex-wrap justify-center'>
            <div className='flex w-full justify-center'>
              <fieldset className=' h-16 w-[95%] pl-4 border-2 border-gray-400 rounded-xl mb-8 '>
                <legend className='text-gray-400'>Phone Number</legend>
                <input className='border-0 focus:outline-none w-[95%]' name='PhoneNumber' placeholder='Enter your number' type='number' value={UserData.UserNumber} onChange={() =>{handlePersonalNotEditInput("Phone Number")}} />    
              </fieldset>
            </div>
          </div>

        <button className='h-12 w-[95%] border-2 border-white rounded-xl shadow-shadow5px shadow-black bg-[#188e6d] text-white' id='send-OTP-BTN' onClick={handlePersonalEditSubmit}>
          {loadingState ? <div className='flex justify-center items-center'><img src={loadState} className='h-8' alt="" /></div> : "Update Details"}
        </button>
      </form>
    </div>
  </div>
  )
}

export default PersonalFormEdit
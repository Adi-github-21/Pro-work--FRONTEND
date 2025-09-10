import { useContext } from 'react'
import next_icon from '../../Assets/next.png'
import { MyContext } from '../../ContextAPI'
import { togglePersonalLabel } from './funcUserForm'

function PersonalLabel() {

  const { UserData, PersonalFormData, setEditPersonalDetails } = useContext(MyContext);

  return (
    <div className="displayNone fixed inset-0 flex items-center justify-center z-50 " id='PersonalDetailsLabel'>
      <div className='absolute inset-0 bg-black opacity-50'></div>
      <div className='relative flex h-full sm:h-auto w-full flex-col bg-white sm:w-[32rem] sm:rounded-2xl shadow-shadow20px'>

        <div className='flex items-center h-12 w-full pl-4'>
          <img className='h-6 cursor-pointer rotate-180' src={next_icon} alt="back arrow" onClick={() => {togglePersonalLabel(false)}} />
          <h3 className='text-md'><span className='text-gray-500 cursor-pointer' onClick={() => {togglePersonalLabel(false)}}>Profile</span> / <span>Personal Details</span></h3>
        </div>

        <div className='flex flex-wrap justify-center w-full py-8 md:py-2'>

          <div className='flex w-full flex-wrap justify-center'>
            <div className='flex w-full justify-center'>
              <fieldset className=' h-16 w-[95%] pl-4 border-2 border-gray-400 rounded-xl mb-8 '>
                <legend className='text-gray-400'>Name</legend>
                <label className='border-0 focus:outline-none w-[95%]'>{PersonalFormData.Name}</label>
              </fieldset>
            </div>
          </div>

          <div className='flex w-full flex-wrap justify-center'>
            <div className='flex w-full justify-center'>
              <fieldset className=' h-16 w-[95%] pl-4 border-2 border-gray-400 rounded-xl mb-8 '>
                <legend className='text-gray-400'>Email</legend>
                <label className='border-0 focus:outline-none w-[95%]'>{PersonalFormData.Email}</label>
              </fieldset>
            </div>
          </div>

        <div className='flex w-full flex-wrap justify-center'>
          <div className='flex w-full justify-center'>
            <fieldset className=' h-16 w-[95%] pl-4 border-2 border-gray-400 rounded-xl mb-8 '>
              <legend className='text-gray-400'>Phone Number</legend>
              <label className='border-0 focus:outline-none w-[95%]'>{UserData.UserNumber}</label>
            </fieldset>
          </div>
        </div>

          <button className='h-12 w-[95%] border-2 border-[#33806b] rounded-xl shadow-shadow5px shadow-black text-[#33806b] bg-[#f2da1d] ' id='send-OTP-BTN' onClick={() =>{setEditPersonalDetails(true), togglePersonalLabel(false)}}>Edit Details</button>
        </div>
      </div>
    </div>
)
}

export default PersonalLabel
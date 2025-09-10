// Package
import { useContext, useRef } from 'react'
import { URL, toastSuccess, toastFailure } from '../../func.jsx'
import { Link } from 'react-router-dom'

// Assests
import next_icon from '../../Assets/next.png'
import loadState from '../../Assets/loadingState.gif'

// Functions
import { closeSignUpForm } from './signUp'
import { MyContext } from '../../ContextAPI'

function SignUpForm() {
  const { error, setErrors, loadingState, setLoadingState, setSendOTP, setOTP_ID, PhoneNumber, setPhoneNumber  } = useContext(MyContext);
  const ValidationErrors = {};
  const descRef = useRef();

  // validaiting the right length of PhoneNumber
  const handleSignUpNumberChange = async (e) => {
    const SendOTPBtn = document.getElementById("send-OTP-BTN")
    const ErrorMessageDiv = document.querySelector('.errormassDiv')
    if (e.target.value.length <= '10') {
      setPhoneNumber(e.target.value);
      SendOTPBtn.disabled = true;
      SendOTPBtn.classList.add('opacityhalf');
      SendOTPBtn.classList.remove('opacityfull');
    }
    if(e.target.value.length == '10') {
      descRef.current.blur();
      SendOTPBtn.disabled = false;
      SendOTPBtn.classList.add('opacityfull');
      SendOTPBtn.classList.remove('opacityhalf');
      SendOTPBtn.focus();

      if(error.PhoneNumber){ ErrorMessageDiv.classList.add('displayNone') }
    }
    else if(e.target.value.length > '10'){
      ValidationErrors.PhoneNumber = "Enter a valid number"
      setErrors(ValidationErrors)
      if(error.PhoneNumber){ ErrorMessageDiv.classList.remove('displayNone') }
    }
  }

  // Function to send OTP. This function is called when the user clicks on the "Send OTP" button
  const handleSendOtp = async () => {
    console.log(`Sending OTP to +91${PhoneNumber}`);

    const SendOTPBtn = document.getElementById("send-OTP-BTN");
    SendOTPBtn.disabled = true;
    SendOTPBtn.classList.add('opacityhalf');
    SendOTPBtn.classList.remove('opacityfull');

    setLoadingState(true);
    
    const otpResponse = await fetch(`${URL}/otp/generate-otp`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, credentials: 'include', body: JSON.stringify({ phoneNumber: '+'+91+PhoneNumber }) });
    if (otpResponse.status === 200) {
      toastSuccess('OTP sent Successfully')  
      const otpID = await otpResponse.json();
      setTimeout(() => {
        setOTP_ID(otpID.OTP_ID);
        setLoadingState(false)
        SendOTPBtn.disabled = false;
        SendOTPBtn.classList.add('opacityfull');
        SendOTPBtn.classList.remove('opacityhalf');
      }, 300);

      setTimeout(() => { 
        setSendOTP(true);
      }, 500);

      setTimeout(() => { 
        const verifyOTP = document.getElementById('verifyOTP')
        verifyOTP.disabled = true;
      }, 700);
    } else if (otpResponse.status === 500) {
      const errorResponse = await otpResponse.json();
      toastFailure(errorResponse.message);
      console.log("Error in sending OTP:", errorResponse);
      setLoadingState(false);
      SendOTPBtn.disabled = false;
      SendOTPBtn.classList.add('opacityfull');
      SendOTPBtn.classList.remove('opacityhalf');
    }
  };

  return (
    <div className="displayNone fixed h-screen w-screen md:justify-center md:items-center z-50 bg-opacity-50 bg-black" id='SignUpForm'>
      <div className='flex flex-col bg-white md:h-auto md:w-[32rem] md:rounded-2xl shadow-black shadow-shadow20px'>
        <div className='flex items-center h-12 w-full pl-4'>
          <img className='h-6 cursor-pointer rotate-180' src={next_icon} alt="back arrow" onClick={() => {closeSignUpForm(), setPhoneNumber('')}}/>
          <h3 className='text-md '>Sign Up / Sign In</h3>
        </div>

        <div className='flex flex-wrap justify-center w-full py-8 md:py-2'>
          <h2 className='w-full text-2xl pl-4 py-4'>Enter Your Phone Number</h2>
          <h3 className='w-full text-gray-400 pl-4 pb-4'>You will receive OTP via SMS</h3>

          <div className='flex w-full justify-center'>
            <fieldset className=' h-16 w-[95%] pl-4 border-2 border-gray-400 rounded-xl mb-8 '>
              <legend className='text-gray-400'>Phone number</legend>
              +91&nbsp; <input className='border-0 focus:outline-none w-4/5 ' id='signupInput' type="number" value={PhoneNumber} onChange={handleSignUpNumberChange} ref={descRef} autoFocus />
            </fieldset>
          </div>
          {error.PhoneNumber && <span className='errormassDiv text-red-500 mb-6 -mt-8 w-[95%] pl-4'>{error.PhoneNumber}</span>}
                
          <button className='h-14 w-[95%] border-2 border-black rounded-xl shadow-black bg-SignUpBtnBG text-white shadow-shadow10px flex justify-center items-center' id='send-OTP-BTN' onClick={handleSendOtp} >
            {loadingState ? <div className='flex justify-center items-center'><img src={loadState} className='h-8' alt="" /></div> : "Send OTP"}
          </button>

          <label className="text-xs text-gray-400 w-full flex flex-wrap justify-center mt-8"> 
            By signing in, you agree to our
            <Link to='/terms-of-service' className='mx-2 underline-offset-2 decoration-1 underline text-green-800' onClick={closeSignUpForm}>Terms of Service </Link>
            and
            <Link to='/privacy' className='mx-2 underline-offset-2 decoration-1 underline text-green-800' onClick={closeSignUpForm}>Privacy Policy</Link>
          </label>
        </div>
      </div>
    </div>

//     <div className="displayNone fixed h-screen w-screen md:justify-center md:items-center z-50 bg-opacity-50 bg-black" id='SignUpForm'>
//   <div className='flex flex-col bg-white md:h-auto md:w-[32rem] md:rounded-2xl shadow-black shadow-shadow20px'>
//     {/* Header */}
//     <div className='flex items-center h-12 w-full pl-4 border-b border-gray-200'>
//       <img className='h-6 cursor-pointer rotate-180' src={next_icon} alt="back arrow" onClick={() => { closeSignUpForm(), setPhoneNumber('') }} />
//       <h3 className='text-md text-[#33806b] font-semibold ml-4'>Sign Up / Sign In</h3>
//     </div>

//     {/* Form */}
//     <div className='flex flex-wrap justify-center w-full py-8 md:py-4'>
//       <h2 className='w-full text-2xl pl-4 py-4 font-bold text-[#33806b]'>Enter Your Phone Number</h2>
//       <h3 className='w-full text-gray-500 pl-4 pb-4'>You will receive OTP via SMS</h3>

//       <div className='flex w-full justify-center'>
//         <fieldset className='h-16 w-[95%] pl-4 border-2 border-[#33806b] rounded-xl mb-6 transition-all focus-within:border-[#f2da1d]'>
//           <legend className='text-gray-400'>Phone number</legend>
//           +91&nbsp;
//           <input
//             className='border-0 focus:outline-none w-4/5 text-gray-800'
//             id='signupInput'
//             type="number"
//             value={PhoneNumber}
//             onChange={handleSignUpNumberChange}
//             ref={descRef}
//             autoFocus
//           />
//         </fieldset>
//       </div>
//       {error.PhoneNumber && <span className='errormassDiv text-red-500 mb-6 -mt-4 w-[95%] pl-4 text-sm'>{error.PhoneNumber}</span>}

//       {/* Send OTP Button */}
//       <button
//         className='h-14 w-[95%] border-2 border-[#33806b] rounded-xl bg-[#33806b] hover:bg-[#2a6b59] text-white font-semibold transition-all duration-200 shadow-md flex justify-center items-center'
//         id='send-OTP-BTN'
//         onClick={handleSendOtp}
//       >
//         {loadingState ? (
//           <div className='flex justify-center items-center'>
//             <img src={loadState} className='h-8' alt="loading" />
//           </div>
//         ) : "Send OTP"}
//       </button>

//       {/* Terms & Privacy */}
//       <label className="text-xs text-gray-500 w-full flex flex-wrap justify-center mt-8 text-center px-4">
//         By signing in, you agree to our
//         <Link to='/terms-of-service' className='mx-1 underline text-[#f2da1d] hover:text-yellow-500 transition' onClick={closeSignUpForm}>
//           Terms of Service
//         </Link>
//         and
//         <Link to='/privacy' className='mx-1 underline text-[#f2da1d] hover:text-yellow-500 transition' onClick={closeSignUpForm}>
//           Privacy Policy
//         </Link>
//       </label>
//     </div>
//   </div>
// </div>


  )
}

export default SignUpForm
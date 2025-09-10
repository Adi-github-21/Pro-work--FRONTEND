// Package
import { useState, useEffect, useContext, useRef } from 'react'

// Functions
import { URL, toastSuccess, toastFailure } from '../../func.jsx'

// Assests
import loadState from '../../Assets/loadingState.gif'

// Functions
import { MyContext } from '../../ContextAPI'

function OTPForm() {
    const { loadingState, setLoadingState, setSendOTP, OTP_ID, setOTP_ID, PhoneNumber, setPhoneNumber, setUserData, setSessionID,  } = useContext(MyContext);
    const inputRefs = useRef([]);

    const [OTP, setOTP] = useState(new Array(6).fill(""));
    const [ResendTimer, setResendTimer] = useState(60);
    const [CanResend, setCanResend] = useState(false);

    // Handle input change, when entering OTP
    const handleChange = (e, index) => {
        const value = e.target.value.replace(/[^0-9]/g, '');
        if (!value) return;

        const newOTP = [...OTP];
        newOTP[index] = value;
        setOTP(newOTP);

        if (index < 5 && inputRefs.current[index + 1]) { inputRefs.current[index + 1].focus() }
    };

    // Handle Backspace to go back
    const handleKeyDown = (e, index) => {
        if (e.key === "Backspace") {
            if (OTP[index] === "") {
                if (index > 0) { inputRefs.current[index - 1].focus() }
            } else {
                const newOTP = [...OTP];
                newOTP[index] = "";
                setOTP(newOTP);
            }
        }
    };

    // Handle Paste Event
    const handlePaste = (e) => {
        const pasteData = e.clipboardData.getData('text').slice(0, 6).replace(/\D/g, '');
        if (pasteData.length !== 6) return;

        const newOTP = pasteData.split("");
        setOTP(newOTP);

        // Populate each input box
        newOTP.forEach((digit, i) => {
            if (inputRefs.current[i]) {
                inputRefs.current[i].value = digit;
            }
        });

        inputRefs.current[5]?.focus();
        e.preventDefault();
    };

    // Handle resend Timer
    useEffect(() => {
        let countdown;

        if (ResendTimer > 0) {
            setCanResend(false);
            countdown = setInterval(() => { setResendTimer(prev => prev - 1) }, 1000);
        } else { setCanResend(true) }

        return () => clearInterval(countdown);
    }, [ResendTimer])

    // Handle Resend OTP
    const handleResend = async () => {
        if (!CanResend) return;

        const otpResponse = await fetch(`${URL}/otp/generate-otp`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, credentials: 'include', body: JSON.stringify({ phoneNumber: '+'+91+PhoneNumber }) });
        if (otpResponse.status === 200) {
            toastSuccess('OTP sent Successfully')  
            const otpID = await otpResponse.json();
            setOTP_ID(otpID.OTP_ID);
        }
        setTimer(60);
    };

    // Handle Submit
    const handleVerifyOtp = async (e) => {
        e.preventDefault();
        console.log(`Verifying OTP: ${OTP.join("")}`);
        setLoadingState(true);
        const OTPValue = Number(OTP.join(""));
        const response = await fetch(`${URL}/otp/verify-otp`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, credentials: 'include', body: JSON.stringify({ OTPValue, OTP_ID }) });
        if (response.status === 201) {
            const userResponse = await fetch(`${URL}/user/signup`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, credentials: 'include', body: JSON.stringify({ PhoneNumber }) });
            if (userResponse.status === 201) {
                const userdata = await userResponse.json();
                const sessionId = userdata._id || userdata[0]._id;

                toastSuccess('OTP Verification Successful');

                setSessionID('SessionID', sessionId, { maxAge: 3600 * 24 * 21 });
                setPhoneNumber('');
                setUserData({ UserObjectID: userdata._id || userdata[0]._id,  UserNumber: userdata.PhoneNumber || userdata[0].PhoneNumber });
                setSendOTP(false);
                setLoadingState(false);

            } else {
                const userdata = await userResponse.json();
                toastFailure(userdata.message || "Something went wrong");
                console.log("Error in user signup/login:", userdata);
                setLoadingState(false);
            }
        } else if (response.status === 401 || response.status === 500) {
            const errorData = await response.json();
            toastFailure(errorData.message || "Something went wrong");
            console.log("Error in OTP verification:", errorData);
            setLoadingState(false);
        }
        else if (response.status === 204) { t
            toastFailure("OTP Verification Failed, Please try again") 
            setLoadingState(false);
        }
    };

    return (
        // <div className="fixed font-inter antialiased z-50 bg-opacity-50 bg-black">
        //     <main className="relative min-h-screen w-screen flex flex-col justify-center bg-slate-50 md:bg-transparent overflow-hidden">
        //         <div className="w-full max-w-6xl mx-auto px-4 md:px-6 py-24">
        //             <div className="flex justify-center">
        //                 <div className="max-w-md mx-auto text-center bg-white px-4 sm:px-8 py-10 rounded-xl shadow">
        //                     <header className="mb-8">
        //                         <h1 className="text-2xl font-bold mb-1">Phone Number Verification</h1>
        //                         <p className="text-[15px] text-slate-500">Enter the 6-digit verification code sent to your number.</p>
        //                     </header>
        //                     <form onSubmit={handleVerifyOtp} onPaste={handlePaste} >
        //                         <div className="flex items-center justify-center gap-3">
        //                             {OTP.map((_, index) => (
        //                                 <input
        //                                     key={index}
        //                                     type="text"
        //                                     maxLength="1"
        //                                     ref={(el) => inputRefs.current[index] = el}
        //                                     className="w-10 xs:w-14 h-10 xs:h-14 text-center text-md xs:text-2xl font-extrabold text-slate-900 bg-slate-100 border border-transparent hover:border-slate-200 rounded outline-none focus:bg-white focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100"
        //                                     value={OTP[index]}
        //                                     onChange={(e) => handleChange(e, index)}
        //                                     onKeyDown={(e) => handleKeyDown(e, index)}
        //                                     onFocus={(e) => e.target.select()}
        //                                 />
        //                             ))}
        //                         </div>
        //                         <div className="max-w-[260px] mx-auto mt-4">
        //                             <button type="submit"
        //                                 id="verifyOTP"
        //                                 disabled={OTP.includes("") || loadingState}
        //                                 className={`w-full shadow-shadow5px inline-flex justify-center rounded-lg px-3.5 py-2.5 text-sm font-medium text-white focus:outline-none transition-colors duration-150 ${OTP.includes("") || loadingState ? 'bg-indigo-300 cursor-not-allowed' : 'bg-indigo-600 hover:bg-indigo-700'}`}>
        //                                 {loadingState ? <img src={loadState} className="h-8" alt="loading" /> : "Verify Account" }
        //                             </button>
        //                         </div>
        //                     </form>
        //                     <div className="text-sm text-slate-500 mt-4">
        //                         Didn't receive code?{" "}
        //                         <button onClick={handleResend} disabled={!CanResend} className={`font-medium transition-colors duration-200 ${CanResend ? "text-indigo-500 hover:text-indigo-600" : "text-indigo-300 cursor-not-allowed"}`}>
        //                             Resend {CanResend ? "" : `(${ResendTimer}s)`}
        //                         </button>
        //                     </div>
        //                 </div>
        //             </div>
        //         </div>
        //     </main>
        // </div>

        <div className="fixed font-inter antialiased z-50 bg-opacity-50 bg-black">
    <main className="relative min-h-screen w-screen flex flex-col justify-center bg-slate-50 md:bg-transparent overflow-hidden">
        <div className="w-full max-w-6xl mx-auto px-4 md:px-6 py-24">
            <div className="flex justify-center">
                <div className="max-w-[22rem] xxxs:max-w-md mx-auto text-center bg-white px-6 sm:px-10 py-12 xxxs:rounded-xl shadow-xl xxxs:border xxxs:border-[#33806b]">
                    <header className="mb-8">
                        <h1 className="text-3xl font-bold text-[#33806b] mb-2">Phone Number Verification</h1>
                        <p className="text-sm text-slate-600">Enter the 6-digit verification code sent to your number.</p>
                    </header>
                    <form onSubmit={handleVerifyOtp} onPaste={handlePaste}>
                        <div className="flex items-center justify-center gap-4 mb-6">
                            {OTP.map((_, index) => (
                                <input
                                    key={index}
                                    type="text"
                                    maxLength="1"
                                    ref={(el) => inputRefs.current[index] = el}
                                    className="w-10 h-10 xxxs:w-12 xxxs:h-12 text-center text-2xl font-extrabold text-[#33806b] bg-slate-100 border-2 border-transparent hover:border-[#33806b] rounded-lg outline-none focus:bg-white focus:border-[#33806b] focus:ring-2 focus:ring-[#f2da1d] transition-all duration-200"
                                    value={OTP[index]}
                                    onChange={(e) => handleChange(e, index)}
                                    onKeyDown={(e) => handleKeyDown(e, index)}
                                    onFocus={(e) => e.target.select()}
                                />
                            ))}
                        </div>
                        <div className="max-w-[280px] mx-auto mt-4">
                            <button
                                type="submit"
                                id="verifyOTP"
                                disabled={OTP.includes("") || loadingState}
                                className={`w-full inline-flex justify-center rounded-lg px-4 py-2.5 text-sm font-medium text-white focus:outline-none transition-colors duration-150 ${OTP.includes("") || loadingState ? 'bg-[#33806b] cursor-not-allowed' : 'bg-[#f2da1d] hover:bg-[#f2c500]'}`}
                            >
                                {loadingState ? <img src={loadState} className="h-8" alt="loading" /> : "Verify Account"}
                            </button>
                        </div>
                    </form>
                    <div className="text-sm text-slate-600 mt-4">
                        Didn't receive the code?{" "}
                        <button
                            onClick={handleResend}
                            disabled={!CanResend}
                            className={`font-medium transition-colors duration-200 ${CanResend ? "text-[#33806b] hover:text-[#1e804e]" : "text-[#f2da1d] cursor-not-allowed"}`}
                        >
                            Resend {CanResend ? "" : `(${ResendTimer}s)`}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </main>
</div>

    );
}

export default OTPForm;

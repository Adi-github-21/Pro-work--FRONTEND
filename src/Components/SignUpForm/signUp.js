// Sign up form visibility toggle
export function showSignUpForm() {
    const SendOTPBtn = document.getElementById("send-OTP-BTN")
    const signUpForm = document.getElementById('SignUpForm');
    const signUpInput = document.getElementById('signupInput');
    
    // Check if elements exist, if Yes, then disable the Send OTP button and addd half opacity
    if (SendOTPBtn) {
        SendOTPBtn.disabled = true;
        SendOTPBtn.classList.add('opacityhalf');
        SendOTPBtn.classList.remove('opacityfull');
    } else { console.log("Element with ID 'SendOTPBtn' not found.") }

    // Check if elements exist, if Yes, then show the sign up form
    if (signUpForm) { signUpForm.classList.add('displayFlex') }
    else { console.log("Element with ID 'signUpForm' not found.") }

    // Check if elements exist, if Yes, then focus on the sign up input
    if (signUpInput) { signUpInput.focus() }
    else { console.log("Element with ID 'signUpInput' not found.") }
}

// Close sign up form and restore previous state
export function closeSignUpForm() {
    const signUpForm = document.getElementById('SignUpForm');
    if (signUpForm) { 
        signUpForm.classList.remove('displayFlex');
        signUpForm.classList.add('displayNone');
    }
    else { console.log("Element with ID 'signUpForm' not found.") }
}


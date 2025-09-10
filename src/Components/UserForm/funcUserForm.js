// Open and Close Personal Form
export function togglePersonalForm(isOpen) {
    const personalDetailsForm = document.getElementById('PersonalDetailsForm');

    if (personalDetailsForm) {
        personalDetailsForm.classList.toggle('displayFlex', isOpen);
        personalDetailsForm.classList.toggle('displayNone', !isOpen);
    } else {
        console.error("Element with ID 'PersonalDetailsForm' not found.");
    }
}
// Open and Close Personal Details
    export function togglePersonalLabel(isOpen) {
        const personalDetailsLabel = document.getElementById('PersonalDetailsLabel');

        if (personalDetailsLabel) {
            personalDetailsLabel.classList.toggle('displayFlex', isOpen);
            personalDetailsLabel.classList.toggle('displayNone', !isOpen);
        } else {
            console.error("Element with ID 'PersonalDetailsLabel' not found.");
        }
    }
// close personal edit form
export function togglePersonalEdit(){
    const EditPersonalDetailsForm = document.getElementById('EditPersonalDetailsForm')
    EditPersonalDetailsForm.classList.add('displayNone')
    EditPersonalDetailsForm.classList.remove('displayFlex')
}


// -----------------------------------------------Addresses -----------------------------------------------



// Open and Close Address Form
export function toggleAddressForm(isOpen) {    
    const addressDetailsForm = document.getElementById('AddressDetailsForm');

    if (addressDetailsForm) {
        addressDetailsForm.classList.toggle('displayFlex', isOpen);
        addressDetailsForm.classList.toggle('displayNone', !isOpen);
    }
    else {
        console.error("Element with ID 'AddressDetailsForm' not found.");
    }
}
// Open and Close Address Details
export function toggleAddressLabel(isOpen) {
    const addressDetailsLabel = document.getElementById('AddressDetailsLabel');

    if (addressDetailsLabel) {
        addressDetailsLabel.classList.toggle('displayFlex', isOpen);
        addressDetailsLabel.classList.toggle('displayNone', !isOpen);
    } else {
        console.error("Element with ID 'AddressDetailsLabel' not found.");
    }
}

// close address edit form
export function toggleAddressEdit(){
    const EditAddressDetailsForm = document.getElementById('EditAddressDetailsForm')
    EditAddressDetailsForm.classList.add('displayNone')
    EditAddressDetailsForm.classList.remove('displayFlex')
}

export function toggleWorkerForm(isOpen) {
    const AddShopForm = document.getElementById('WorkerDetailsForm');

    if(AddShopForm){
        AddShopForm.classList.toggle('displayFlex', isOpen);
        AddShopForm.classList.toggle('displayNone', !isOpen);
    } else {
        console.log("worker form element not found")
    }

}


export function toggleServiceForm(isOpen) {
    const AddShopForm = document.getElementById('ServiceDetailsForm');

    if(AddShopForm){
        AddShopForm.classList.toggle('displayFlex', isOpen);
        AddShopForm.classList.toggle('displayNone', !isOpen);
    } else {
        console.log("Service form element not found")
    }

}


export function toggleWorkerEdit(isOpen) {
    const AddShopForm = document.getElementById('EditWorkerDetailsForm');

    if(AddShopForm){
        AddShopForm.classList.toggle('displayFlex', isOpen);
        AddShopForm.classList.toggle('displayNone', !isOpen);
    } else {
        console.log("Worker Edit element not found")
    }

}

export function toggleBankForm(isOpen) {
    const AddShopForm = document.getElementById('BankDetailsForm');

    if(AddShopForm){
        AddShopForm.classList.toggle('displayFlex', isOpen);
        AddShopForm.classList.toggle('displayNone', !isOpen);
    } else {
        console.log("Worker Edit element not found")
    }

}

export function toggleWithdrawForm(isOpen) {
    const AddShopForm = document.getElementById('WidthdrawalDetailsForm');

    if(AddShopForm){
        AddShopForm.classList.toggle('displayFlex', isOpen);
        AddShopForm.classList.toggle('displayNone', !isOpen);
    } else {
        console.log("Worker Edit element not found")
    }

}

import React, { useState, useContext } from 'react';
import { MyContext } from '../../ContextAPI';
import { URL } from '../../func';
import { toggleBankForm } from './funcWorkerForm';

const BankDetailsForm = () => {

  const { showBankForm, setShowBankForm, UserData, WorkerFormData, setMyBank  } = useContext(MyContext)
  const [error, setError] = useState("");
  const [BankFormData, setBankFormData] = useState({
    AccountHolderName: '',
    BankName: '',
    AccountNumber: '',
    AccountIFSC_code: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setBankFormData({
      ...BankFormData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

     if (!BankFormData.AccountHolderName) {
      setError("Please enter amount and select a bank.");
      return;
    }else if (!BankFormData.BankName) {
      setError("Please enter amount Bank Name.");
      return;
    }else if (!BankFormData.AccountNumber) {
      setError("Please enter amount and Account Number.");
      return;
    }else if (!BankFormData.AccountIFSC_code) {
      setError("Please enter amount and select IFSC.");
      return;
    }

    try {
      // console.log('Form Data:', BankFormData);
      const UserObjectID = UserData.UserObjectID
      const WorkerObjectID = WorkerFormData.WorkerObjectID

      // TODO: Replace with your API endpoint
      const bankResponse = await fetch(`${URL}/worker/bank`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, credentials: 'include', body: JSON.stringify({BankFormData, UserObjectID, WorkerObjectID}) });

      if (bankResponse.status == 201) {
        alert('Bank details submitted successfully!');
        setShowBankForm(false)
        setBankFormData({ AccountHolderName: '', BankName: '', AccountNumber: '', AccountIFSC_code: '' });
        setMyBank(undefined)
      } else if (bankResponse.status == 401 || bankResponse.status == 500) {
        alert('Submission failed. Please try again.');
      } else {
              alert("Something went wrong, Please try again");
      }
    } catch (error) {
      console.log('Error submitting form:', error);
      // alert('An error occurred. Please try again later.');
    }
  };

  return (
    <div className="displayNone fixed inset-0 flex top-0 z-50 h-screen w-screen items-center justify-center bg-black bg-opacity-30 py-4" id='BankDetailsForm'>
      <div className="bg-white shadow-2xl rounded-2xl w-full max-w-md p-8">
        <div className='flex justify-between items-start'>
            <h2 className="text-2xl font-bold text-[#2a8655] mb-6 text-center">Bank Account Details</h2>
            <button className="-mt-6 -mr-4 text-gray-400 hover:text-[#1d6955] text-xl font-bold" onClick={() => toggleBankForm(false)} > &times;</button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Account Holder Name */}
          <div>
            <label className="block text-gray-700 mb-1 font-medium">Account Holder Name</label>
            <input
              type="text"
              name="AccountHolderName"
              value={BankFormData.AccountHolderName}
              onChange={handleChange}
              
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#2a8655]"
              placeholder="Enter account holder's name"
            />
       
          </div>

          {/* Bank Name */}
          <div>
            <label className="block text-gray-700 mb-1 font-medium">Bank Name</label>
            <input
              type="text"
              name="BankName"
              value={BankFormData.BankName}
              onChange={handleChange}
              
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#2a8655]"
              placeholder="Enter bank name"
            />
            
          </div>

          {/* Account Number */}
          <div>
            <label className="block text-gray-700 mb-1 font-medium">Account Number</label>
            <input
              type="number"
              name="AccountNumber"
              value={BankFormData.AccountNumber}
              onChange={handleChange}
              
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#2a8655]"
              placeholder="Enter account number"
            />
           
          </div>

          {/* IFSC Code */}
          <div>
            <label className="block text-gray-700 mb-1 font-medium">IFSC Code</label>
            <input
              type="text"
              name="AccountIFSC_code"
              value={BankFormData.AccountIFSC_code}
              onChange={handleChange}
              
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#2a8655]"
              placeholder="Enter IFSC code"
            />
          </div>

          {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-2 rounded-lg text-sm">
          {error}
        </div>
      )}

          {/* Submit Button */}
          <div className="pt-4">
            <button
              type="submit"
              className="w-full bg-[#2a8655] hover:bg-green-700 text-white font-semibold py-2 px-4 rounded-lg transition duration-300"
            >
              Save Details
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default BankDetailsForm;

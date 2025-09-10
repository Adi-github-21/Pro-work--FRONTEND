import React, { useState, useContext } from "react";
import { MyContext } from "../../ContextAPI";
import { URL } from "../../func";
import { toggleWithdrawForm } from "./funcWorkerForm";

const WithdrawalForm = ({  availableBalance = WorkerBalance }) => {
  const {  setShowBankForm, MyBank,  UserData, WorkerFormData, setWorkerBalance, WorkerBalance} = useContext(MyContext);
  const [amount, setAmount] = useState("");
  const [selectedBank, setSelectedBank] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!amount || !selectedBank) {
      setError("Please enter amount and select a bank.");
      return;
    }

    if (parseFloat(amount) > availableBalance) {
      setError("Withdrawal amount exceeds available balance.");
      return;
    }

    setError("");
    // onWithdraw({ amount: parseFloat(amount), selectedBank });
    console.log(amount, selectedBank)

    const UserObjectID = UserData.UserObjectID
    const WorkerObjectID = WorkerFormData.WorkerObjectID

    const response = await fetch(`${URL}/worker/widthrawal`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ selectedBank, amount, UserObjectID, WorkerObjectID}),
    })
    if (response.ok) {

      console.log("upd")
setWorkerBalance(WorkerBalance-amount)


    const updatedBalance = WorkerBalance-amount

    const response1 = await fetch(`${URL}/worker/balance`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ updatedBalance, UserObjectID, WorkerObjectID}),
    });

    }

  };

  return (
    <div className="displayNone fixed inset-0 flex top-0 z-50 h-screen w-screen items-center justify-center bg-black bg-opacity-30 p-4" id="WidthdrawalDetailsForm">
      <form onSubmit={handleSubmit} className="max-w-xl w-full bg-white shadow-lg rounded-2xl p-6 space-y-6 border border-green-100">
        <div className='flex justify-between items-start'>

      <h2 className="text-2xl font-bold text-[#2a8655]">Withdraw Funds</h2>
      <button className="-mt-6 -mr-4 text-gray-400 hover:text-[#1d6955] text-xl font-bold" onClick={() => toggleWithdrawForm(false)} > &times;</button>
        </div>

      {/* Available Balance */}
      <div className="text-gray-700 bg-green-50 border border-green-200 p-3 rounded-lg">
        <p className="text-sm">Available Balance</p>
        <p className="text-2xl font-semibold text-[#2a8655]">₹ {availableBalance.toLocaleString()}.00</p>
      </div>

      {/* Withdrawal Amount */}
      <div>
        <label className="block mb-1 font-medium text-gray-700">Amount (₹)</label>
        <input
          type="number"
          min="1"
          placeholder="Enter amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2a8655] text-gray-700"
        />
      </div>

      {/* Bank Dropdown */}
      <div>
        <label className="block mb-1 font-medium text-gray-700">Select Bank Account</label>
        <select
          value={selectedBank}
          onChange={(e) => setSelectedBank(e.target.value)}
          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2a8655] text-gray-700"
        >
          <option value="">Choose a bank</option>
          {MyBank.map((bank) => (
            <option
  key={bank.AccountNumber}
  value={JSON.stringify({
    AccountHolderName: bank.AccountHolderName,
    BankName: bank.BankName,
    AccountNumber: bank.AccountNumber,
    AccountIFSC_code: bank.AccountIFSC_code,
  })}
>
              {bank.AccountHolderName} - {bank.BankName} ({bank.AccountNumber})
            </option>
          ))}
        </select>
      </div>

      {/* Error Message */}
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-2 rounded-lg text-sm">
          {error}
        </div>
      )}

      {/* Submit Button */}
      <button
        type="submit"
        className="w-full bg-[#2a8655] hover:bg-green-700 text-white font-medium py-2 rounded-lg transition"
      >
        Withdraw Balance
      </button>
    </form>
    </div>
  );
};

export default WithdrawalForm;


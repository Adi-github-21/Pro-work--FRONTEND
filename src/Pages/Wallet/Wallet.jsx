import React, { useContext, useEffect, useState } from 'react'
import { Helmet } from 'react-helmet'
import BankForm from '../../Components/WorkerForm/BankForm';
import WithdrawalForm from '../../Components/WorkerForm/WidthdrawalForm';
import { MyContext } from '../../ContextAPI';
import WorkerInfo from '../../Utils/WorkerInfo';

import { toggleBankForm, toggleWithdrawForm } from '../../Components/WorkerForm/funcWorkerForm';
function ProWorkWalletDashboard() {

  const {  MyBank, WorkerWidthrawal, UserData, WorkerBalance, setWorkerBalance} = useContext(MyContext);

  // Use useEffect to handle side effects when MyBank value changes
  useEffect(() => {
    console.log('MyBank has been updated:', MyBank);  // Optional logging
  }, [MyBank]); // This will trigger every time MyBank is updated

  // Handle loading state when WorkerBalance or MyBank is not present
  if (!WorkerBalance || MyBank === undefined) {
    return (
      <div className="flex justify-center items-center h-screen">
        <WorkerInfo />
        Loading...
      </div>
    );
  }



  return (
    <div className='flex flex-col pt-20 w-screen mt-8'>
      <Helmet><title>Pro Work - Services</title></Helmet>
      {MyBank ?  <WithdrawalForm availableBalance={WorkerBalance[0].WorkerBalance} /> : <BankForm /> }
      
      
      <div className="w-full max-w-[1250px] mx-auto px-4 xl:px-0 mb-8" >
        <h1 className='text-3xl md:text-4xl lg:text-5xl mb-4 font-bold text-[#1d6955]'>Wallet</h1>
        <p className='text-sm md:text-base lg:text-lg text-gray-700'>Easily track your earnings and withdraw your balance anytime with ProWork Wallet.</p>
      </div>

      <div className=" flex bg-gray-100 font-sans">

        <main className="flex-1 p-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          
            <div className="flex items-start justify-center bg-gray-50 p-6 ">
              <div className="bg-white shadow-xl rounded-2xl p-6 max-w-sm w-full text-center border border-green-200">
                <h2 className="text-xl font-bold text-[#2a8655] mb-2">ProWork Wallet</h2>      
                <p className="text-gray-600 mb-1">Available Balance</p>      
                <div className="text-3xl font-semibold text-[#2a8655] mb-6">₹ {WorkerBalance[0].WorkerBalance}.00</div>
                <button className="w-full bg-[#2a8655] text-white font-medium py-2 rounded-lg hover:bg-green-700 transition" onClick={() => {MyBank ? toggleWithdrawForm(true) : toggleBankForm(true)}}>Withdraw Balance</button>
              </div>
            </div> 
           
            <div className="lg:col-span-2 bg-white shadow-xl rounded-2xl p-6 border border-green-100" >
              <h2 className="text-2xl font-bold text-[#2a8655] mb-4">Withdrawal History</h2>

              <div className="space-y-4 max-h-[400px] overflow-y-auto pr-2" id='RegisterShopForm'>
                {WorkerWidthrawal ? (
                  <div>
                    {WorkerWidthrawal.map((item, index) => (
                  <div key={index} className="flex flex-col md:flex-row justify-between items-start md:items-center bg-gray-50 p-2 sm:p-4 rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-all duration-200">
                    <div className="flex items-center space-x-4">
                      <div className="bg-[#2a8655] text-white p-2 rounded-full">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"> 
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.104 0-2 .672-2 1.5S10.896 11 12 11s2-.672 2-1.5S13.104 8 12 8zm0 6c-2.21 0-4-1.343-4-3h2a2 2 0 004 0h2c0 1.657-1.79 3-4 3z" />
                        </svg>
                      </div>

                      <div>
                        <p className="text-gray-800 font-medium">₹ {item.WidthrawalBalance}.00</p>
                        <p className="text-sm text-gray-500">To: {item.BankName} - A/C ****{(item.AccountNumber.toString()).substring(item.AccountNumber.toString().length - 4)}</p>
                      </div>
                    </div>

                    <div className="mt-2 md:mt-0 md:text-right w-full md:w-auto pl-14">
                      <p className="text-sm text-gray-500">{new Date(item.BookingDateTime).toLocaleString('en-GB', {day: '2-digit', month: 'short', year: 'numeric', hour: 'numeric', minute: '2-digit', hour12: true })}</p>
                      <span className="text-xs font-semibold px-3 py-1 rounded-full bg-green-100 text-green-700">Success</span>
                    </div>
                  </div>
                ))}
                  </div>
                ):(<div>
                  {[0].map((item, index) => (
                  <div key={index} className="flex flex-col md:flex-row justify-between items-start md:items-center bg-gray-50 p-2 sm:p-4 rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-all duration-200">
                    <div className="flex items-center space-x-4">
                      <div className="bg-[#2a8655] text-white p-2 rounded-full">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"> 
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.104 0-2 .672-2 1.5S10.896 11 12 11s2-.672 2-1.5S13.104 8 12 8zm0 6c-2.21 0-4-1.343-4-3h2a2 2 0 004 0h2c0 1.657-1.79 3-4 3z" />
                        </svg>
                      </div>

                      <div>
                        <p className="text-gray-800 font-medium">Amount</p>
                        <p className="text-sm text-gray-500">To: </p>
                      </div>
                    </div>

                    <div className="mt-2 md:mt-0 md:text-right w-full md:w-auto pl-14">
                      <p className="text-sm text-gray-500">Date</p>
                      <span className="text-xs font-semibold px-3 py-1 rounded-full bg-green-100 text-green-700">Status</span>
                    </div>
                  </div>
                ))}
                </div>)}
              </div>
            </div>

          </div>
        </main>
      </div>
    </div>
  );
}


export default ProWorkWalletDashboard
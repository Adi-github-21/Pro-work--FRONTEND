// Package
import React, { useState, useContext, useEffect } from 'react'
import { Helmet } from 'react-helmet'
import axios from 'axios'
// Utils
import WorkerInfo from '../../Utils/WorkerInfo'

// Functions
import { URL } from '../../func'
import { MyContext } from '../../ContextAPI'
import { use } from 'react'


function MyWork() {
  const { MyWork } = useContext(MyContext);
  const [status, setStatus] = useState('');
  const [selectedWork, setSelectedWork] = useState(null);
  const [canCall, setCanCall] = useState(true);

  useEffect(() => {}, [selectedWork]);

  if (!MyWork || MyWork.length === 0) {
    return( 
      <div className='flex flex-col pt-20 w-screen mt-8'>
        <Helmet><title>Pro Work - Work</title></Helmet>
        <div className="w-full max-w-[1250px] mx-auto px-4 xl:px-0">
          <div className="mb-8">
            <h1 className='text-3xl md:text-4xl lg:text-5xl mb-4 font-bold text-[#1d6955]'>Work</h1>
            <p >See all the details, who had booked you in past.</p>
          </div>
        </div>
          
        <div className="flex flex-wrap justify-center items-center h-full p-6">
          <div className="w-screen overflow-x-auto shadow-shadow10px shadow-[#1d6955] rounded-xl bg-white">
            <div className="p-6 text-center">
              <WorkerInfo />
              <h2 className="text-2xl font-bold text-gray-800 mb-4">No Booking Data Available</h2>
              <p className="text-gray-600">Please check back later or contact support if you believe this is an error.</p>
            </div>
          </div>
        </div>
      </div>
    )
  }

  const handleCall = async (props) => {
    const callingPhone = props.WorkerNumber;
    const recievingPhone = props.UserNumber;

    setStatus('Initiating call...');
    try {
      const response = await axios.post(`${URL}/call/mask-call`, { callingPhone, recievingPhone });
      if (response.data.success) { setStatus('Call initiated successfully') } 
      else { setStatus('Failed to initiate call') }
    } catch (error) {
      setStatus('Error: ' + error.message);
    }
  };

  const RejectWork = async () => {
    try {
      const response = await axios.patch(`${URL}/user/booking`, { BookingID: selectedWork._id }, { withCredentials: true, headers: { 'Content-Type': 'multipart/form-data' } });
      if (response.data.success) {
        setStatus('Booking cancelled successfully');
        setTimeout(() => { window.location.reload() }, 2000);
      } else {
        setStatus('Failed to cancel booking');
      }
    } catch (error) {
      setStatus('Error: ' + error.message);
    }
  };

  console.log(selectedWork);

  return (
    <div className='flex flex-col pt-20 w-screen mt-8'>
      <Helmet><title>Pro Work - Work</title></Helmet>
      <div className="w-full max-w-[1250px] mx-auto px-4 xl:px-0">
        <div className="mb-8">
          <h1 className='text-3xl md:text-4xl lg:text-5xl mb-4 font-bold text-[#1d6955]'>Work</h1>
          <p >See all the details, who had booked you in past.</p>
        </div>
      </div>
        
      <div className="flex flex-wrap justify-center items-center h-full overflow-hidden p-6">

        <div class="relative shadow-shadow10px shadow-[#1d6955] xs:w-full md:h-72 md:overflow-y-auto rounded-2xl" id='CustomScroll'>
          <table class="w-full text-sm text-left rtl:text-right md:rounded-t-2xl rounded-2xl overflow-hidden">
            <thead class="text-xs text-white uppercase bg-[#1d6955]">
              <tr>
                <th scope="col" class="px-6 py-3">Payment Status</th>
                <th scope="col" class="px-6 py-3">Final Price</th>
                <th scope="col" class="px-6 py-3">View</th>
              </tr>
            </thead>
            {MyWork.map((item, index) =>{
              const date = new Date(item.BookingDateTime);
              const options = { day: '2-digit', month: 'short', year: 'numeric', hour: 'numeric', minute: '2-digit', hour12: true };
              const formattedDate = date.toLocaleString('en-GB', options);

              const checkDif = () => {
                setCanCall(true)
                const now = new Date();
                const bookingDate = new Date(item.BookingDateTime);
                const timeDiff = now - bookingDate;
                const oneDay = 24 * 60 * 60 * 1000;
                if (timeDiff > oneDay) { setCanCall(false) }
              }

              return(                         
                <tbody id='data-container'>
                  <tr className="odd:bg-white even:bg-gray-100 border-b dark:border-gray-700 card" key={index} >
                    <th scope="row" className={`px-6 py-4 font-medium text-gray-900 whitespace-nowrap ${item.PaymentStatus === 'Completed' ? 'text-green-700' : 'text-yellow-700'}`}>{item.PaymentStatus}</th>
                    <td className="px-6 py-4">Rs.{item.TotalAmount}</td>
                    <td className="px-6 py-4 text-[#1d6955] underline cursor-pointer" onClick={() => {setSelectedWork(item), checkDif()}}>Details</td>
                  </tr>
                </tbody>
              )
            })}   
          </table>
        </div>

        {selectedWork && (       
          <div className="fixed inset-0 flex items-center justify-center z-40 bg-black bg-opacity-50 border-2 border-[#1d6955]">
            <div className="bg-white p-6 rounded-xl w-full max-w-lg z-50 relative">
        
              <button className="absolute top-3 right-4 text-gray-400 hover:text-[#1d6955] text-xl font-bold"onClick={() => setSelectedWork(null)} > &times; </button>
              <h2 className="text-2xl font-bold text-[#1d6955] mb-6 border-b pb-2">Booking Summary</h2>
                        
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-3 gap-x-6 text-sm text-gray-800">
                <div>
                  <span className="font-semibold text-gray-600">User Name:</span>
                  <p className="text-[#1d6955]">{selectedWork.UserName}</p>
                </div>
                <div>
                  <span className="font-semibold text-gray-600">Booking ID:</span>
                  <p>{selectedWork.UserObjectID.substring(0, 12)}</p>
                </div>
                <div>
                  <span className="font-semibold text-gray-600">Service:</span>
                  <p>{selectedWork.BookingService}</p>
                </div>
                <div>
                  <span className="font-semibold text-gray-600">Date & Time:</span>
                  <p>{new Date(selectedWork.BookingDateTime).toLocaleString('en-GB', {day: '2-digit', month: 'short', year: 'numeric', hour: 'numeric', minute: '2-digit', hour12: true })}</p>
                </div>
                <div>
                  <span className="font-semibold text-gray-600">Service Amount:</span>
                  <p>Rs.{selectedWork.ServiceAmount}.00</p>
                </div>
                <div>
                  <span className="font-semibold text-gray-600">Platform Fees:</span>
                  <p>Rs.{selectedWork.PlatformFees}</p>
                </div>
                <div>
                  <span className="font-semibold text-gray-600">Payment Gateway:</span>
                  <p>Rs.{selectedWork.PaymentGatewayFees}</p>
                </div>
                <div>
                  <span className="font-semibold text-gray-600">Total Amount:</span>
                  <p className="text-[#1d6955] font-semibold text-lg">Rs.{selectedWork.TotalAmount}</p>
                </div>
                <div className="sm:col-span-2">
                  <span className="font-semibold text-gray-600">Payment Status:</span>
                  <p className={`inline-block px-3 py-1 mt-1 rounded-full text-xs font-medium ${selectedWork.PaymentStatus === 'Completed' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700' }`}>{selectedWork.PaymentStatus}</p>
                </div>

                
              </div>
                        
              <div className="mt-6 flex justify-end gap-3">
                <p className='text-left w-full flex items-center'>{status}</p>
                <button className={`px-5 py-2  text-white rounded-lg ${ canCall ? "bg-[#f87171] hover:bg-[#e95050]" : "bg-gray-400 cursor-not-allowed" } ${selectedWork.isCancelled? "bg-gray-400 cursor-not-allowed" : "bg-[#f87171] hover:bg-[#e95050]"}`} onClick={() => RejectWork()} disabled={!canCall}>{selectedWork.isCancelled ? 'Cancelled' : 'Cancel' }</button>                   
                <button onClick={() => handleCall({WorkerNumber: selectedWork.WorkerNumber, UserNumber: selectedWork.UserNumber})} disabled={!canCall} className={`px-5 py-2 rounded-lg text-white transition-all duration-200 ${ canCall ? "bg-[#2a8655] hover:bg-green-700" : "bg-gray-400 cursor-not-allowed" } ${selectedWork?.isCancelled ? "bg-gray-400 cursor-not-allowed" : "bg-[#2a8655] hover:bg-green-700"}`}>Call&nbsp;User</button>
              </div>
            </div>
          </div>       
        )}
      </div> 
    </div>
  )
}

export default MyWork
// Package
import React, { useState, useContext } from 'react';
import { Helmet } from 'react-helmet'
import axios from 'axios';

// Functions
import { URL } from '../../func';
import { MyContext } from '../../ContextAPI';

function MyBooking() {
  const { MyBooking } = useContext(MyContext);
  const [status, setStatus] = useState('');
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [canCall, setCanCall] = useState(true);

  if (!MyBooking || MyBooking.length === 0) {
    return (
      <div className='flex flex-col pt-20 w-screen mt-8'>
        <Helmet><title>Pro Work - Bookings</title></Helmet>
        <div className="w-full max-w-[1250px] mx-auto px-4 xl:px-0">
          <div className="mb-8">
            <h1 className='text-3xl md:text-4xl lg:text-5xl mb-4 font-bold text-[#1d6955]'>Bookings</h1>
            <p className='text-gray-600'>See all your bookings here.</p>
          </div>

          <div className="border-2 shadow-shadow10px shadow-[#1d6955] bg-[#f8fafc] py-2 mb-10 sm:p-4 md:h-72 overflow-hidden rounded-2xl">
            <div className="w-full flex flex-col gap-4 overflow-y-auto h-[500px] px-4" >
              <div className="bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 p-4 cursor-pointer" >   
                <div className="flex flex-wrap justify-between items-center">
                  <h2 className='text-lg text-[#1d6955]'>No Bookings Found</h2>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const handleCall = async (props) => {
    const callingPhone = props.UserNumber;
    const recievingPhone = props.WorkerNumber;

    setStatus('Initiating call...');
    try {
      const response = await axios.post(`${URL}/call/mask-call`, { callingPhone, recievingPhone });
      if (response.data.success) { setStatus('Call initiated successfully') } 
      else { setStatus('Failed to initiate call') }
    } catch (error) {
      setStatus('Error: ' + error.message);
    }
  };

  const GivePayment = async () => {
    setSelectedBooking(null);
    console.log("Payment process to be implemented here.", selectedBooking.WorkerObjectID);
    // Implement payment logic here
    // For example, redirect to a payment gateway or open a payment modal
    // After payment is done, update the booking status in the backend
    // Example:
    try {
      const response = await axios.patch(`${URL}/user/payment-release`, { WorkerObjectID: selectedBooking.WorkerObjectID, ServiceAmount: selectedBooking.ServiceAmount }, { withCredentials: true, headers: { 'Content-Type': 'multipart/form-data' } });
      if (response.data.success) {
        // Update booking status in UI
      } else {
        // Handle payment failure
      }
    } catch (error) {
      console.error("Payment error:", error);
    }
  }

  return (
    <div className='flex flex-col pt-20 w-screen mt-8'>
      <Helmet><title>Pro Work - Bookings</title></Helmet>
      <div className="w-full max-w-[1250px] mx-auto px-4 xl:px-0">
        <div className="mb-8">
          <h1 className='text-3xl md:text-4xl lg:text-5xl mb-4 font-bold text-[#1d6955]'>Bookings</h1>
          <p className='text-gray-600'>See all your bookings here.</p>
        </div>

        <div className="border-2 shadow-shadow10px shadow-[#1d6955] bg-[#f8fafc] py-2 mb-10 sm:p-4  overflow-hidden rounded-2xl">
          <div className="w-full flex flex-col gap-4 overflow-y-auto h-[500px] px-4" id='CustomScroll'>
            {MyBooking.map((item, index) => {
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

              return (
                <div className="bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 p-4 cursor-pointer" key={index} >
                  <div className="flex flex-wrap justify-between items-center">
                    <div className='w-full mb-2'>
                      <h3 className="text-[#1d6955] font-semibold">{item.ShopName}</h3>
                      <p className="text-sm text-gray-500">{formattedDate}</p>
                    </div>

                    <button className="text-[#1d6955] py-1 underline" onClick={() => { setSelectedBooking(item), checkDif()}}>Details</button>

                    <div className={`px-3 py-1 text-sm font-medium rounded-full ${item.PaymentStatus === 'Completed' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>{item.PaymentStatus}</div> 
                  </div>
        
                  {selectedBooking && (
                    <div className="fixed inset-0 flex items-center justify-center z-40 bg-black bg-opacity-5 overflow-auto">
                      <div className="bg-white p-6 rounded-xl w-full max-w-lg z-50 relative">
        
                        <button className="absolute top-3 right-4 text-gray-400 hover:text-[#1d6955] text-xl font-bold"onClick={() => setSelectedBooking(null)} > &times; </button>
                        <h2 className="text-2xl font-bold text-[#1d6955] mb-6 border-b pb-2">Booking Summary</h2>
                                        
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-3 gap-x-6 text-sm text-gray-800">
                          {selectedBooking.isCancelled &&
                          <div className="sm:col-span-2">
                            <p className={`inline-block py-1 mt-1 rounded-full text-xs font-medium ${selectedBooking.PaymentStatus !== 'Completed' ? 'bg-green-100 text-green-700' : ' text-[#e95050]' }`}>Booking was cancelled by the worker, another worker will be reaching shortly.</p>
                          </div>
                          }
                          <div>
                              <span className="font-semibold text-gray-600">Shop Name:</span>
                              <p className="text-[#1d6955]">{selectedBooking.ShopName}</p>
                          </div>
                          <div>
                              <span className="font-semibold text-gray-600">Service:</span>
                              <p>{selectedBooking.BookingService}</p>
                          </div>
                          <div>
                              <span className="font-semibold text-gray-600">Category:</span>
                              <p>{selectedBooking.BookingCategory}</p>
                          </div>
                          <div>
                              <span className="font-semibold text-gray-600">Date & Time:</span>
                              <p>{new Date(selectedBooking.BookingDateTime).toLocaleString('en-GB', {day: '2-digit', month: 'short', year: 'numeric', hour: 'numeric', minute: '2-digit', hour12: true })}</p>
                          </div>
                          <div>
                              <span className="font-semibold text-gray-600">Service Amount:</span>
                              <p>Rs.{selectedBooking.ServiceAmount}.00</p>
                          </div>
                          <div>
                  <span className="font-semibold text-gray-600">Platform Fees:</span>
                  <p>Rs.{selectedBooking.PlatformFees}</p>
                </div>
                <div>
                  <span className="font-semibold text-gray-600">Payment Gateway:</span>
                  <p>Rs.{selectedBooking.PaymentGatewayFees}</p>
                </div>
                          <div>
                              <span className="font-semibold text-gray-600">Total Amount:</span>
                              <p className="text-[#1d6955] font-semibold text-lg">Rs.{selectedBooking.TotalAmount}</p>
                          </div>
                          <div className="sm:col-span-2">
                              <span className="font-semibold text-gray-600">Payment Status:</span>
                              <p className={`inline-block px-3 py-1 mt-1 rounded-full text-xs font-medium ${selectedBooking.PaymentStatus === 'Completed' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700' }`}>{selectedBooking.PaymentStatus}</p>
                          </div>
                        </div>

                        {/* Close Button */}
                        <div className="mt-6 flex justify-end gap-3">
                            <p className='text-left w-full flex items-center'>{status}</p>
                            <button className="px-5 py-2 bg-[#1d6955] text-white rounded-lg hover:bg-[#155d49]" onClick={() => GivePayment()}>Done</button>
                            <button onClick={() => handleCall({UserNumber: selectedBooking.UserNumber, WorkerNumber: selectedBooking.WorkerNumber})} disabled={!canCall || selectedBooking?.isCancelled} className={`px-5 py-2 rounded-lg text-white transition-all duration-200 ${ canCall ? "bg-[#2a8655] hover:bg-green-700" : "bg-gray-400 cursor-not-allowed"} ${selectedBooking?.isCancelled ? "bg-gray-400 cursor-not-allowed" : "bg-[#2a8655] hover:bg-green-700"}`}>Call&nbsp;Worker{selectedBooking.isCancelled}</button>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  )
}

export default MyBooking


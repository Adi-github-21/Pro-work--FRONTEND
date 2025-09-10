import React, { useContext, useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { MyContext } from '../../ContextAPI'
import axios from 'axios'
import { FRONTEND_URL, URL, toastFailure } from '../../func.jsx'
import ReviewStar from './ReviewStar'
import { useParams } from 'react-router-dom';
import ProWorkLogo from '../../../public/prowork-512x512.jpg'
import next_icon from '../../Assets/next.png'
import { addservice_List } from '../../Assets/AddServiceList'
import { showSignUpForm } from '../SignUpForm/signUp.js'
import PersonalForm from './../UserForm/PersonalForm.jsx'
import AddressForm from './../UserForm/AddressForm.jsx'

import { togglePersonalForm, toggleAddressForm } from './../UserForm/funcUserForm.js'


function FinalBookingCard({Category}) {

  const { SessionID, UserData, PersonalFormData, AddressFormData, OneWorker, OneWorkerService, SelectedService } = useContext(MyContext);
  const { id } = useParams();
  
  if (!OneWorker || !OneWorkerService) {
    return (
      <div className="flex justify-center items-center h-screen">
        <WorkerInfo id={id} />
        Loading...
      </div>
    );
  }

  async function PayServiceCharge(props){
    let myBookingID;
    let NamePayer = PersonalFormData.Name
    let AmountPayer = props.TotalAmount*100
   
    try {
      axios.post(`${URL}/payment/start`, { NamePayer, AmountPayer }, { withCredentials: true })
        .then(async function (response) {
          let options = {
            key: "rzp_test_YlsIMKyGXhS3ih",
            amount: response.data.order.amount,
            currency: "INR",
            name: "Pro Work",
            description: "Payment for Service",
            image: ProWorkLogo,
            order_id: response.data.order.id,
            callback_url: `${URL}/payment/verify-payment-signature?mybooking_id=${myBookingID}&Address=${AddressFormData.Address}&Landmark=${AddressFormData.Landmark}&Pincode=${AddressFormData.PinCode}`,
            prefill: {
              name: NamePayer,
              email: UserData.UserEmail,
              contact: UserData.UserNumber
            },
            notes: { address: "Mama Bhanja ka talab, Naini, Prayagraj, Uttar Pradesh 211008" },
            theme: { color: "#33806b" },
            handler: async function (response) {
              console.log("Payment successful", response);
              try{
                const bookingResponse = await axios.post(`${URL}/user/booking`, {BookingCategory: props.BookingCategory, BookingService:props.BookingService.detail, ShopName:props.ShopName, ServiceAmount:props.ServiceAmount, PlatformFees: props.PlatformFees, PaymentGatewayFees: props.PaymentGatewayFees, TotalAmount:props.TotalAmount, WorkerNumber:props.WorkerNumber, UserNumber:UserData.UserNumber, UserName: NamePayer, UserObjectID:UserData.UserObjectID, WorkerObjectID:OneWorker._id}, { withCredentials: true })
                if (bookingResponse.status == 201) {
                  myBookingID = bookingResponse.data._id;
                }
              } catch(error){
                console.log("Error in adding booking details")
              }
              
              // Voice calling to worker
              try {
                const workerPhone = OneWorker.ShopPhoneNumber
                const voiceMessageResponse = await axios.post(`${URL}/call/voice-message`, {workerPhone});
                if (voiceMessageResponse.status == 201) { console.log('Voice message sent successfully') }
              } catch(error) {
                console.log("Error in sending voice message to worker", error)
              }

              // SMS to worker
              try {
                const workerPhone = OneWorker.ShopPhoneNumber
                const smsResponse = await axios.post(`${URL}/call/sms`, {workerPhone, Address: AddressFormData.Address, Landmark: AddressFormData.Landmark, PinCode: AddressFormData.PinCode, BookingService:props.BookingService.detail, UserName: NamePayer });
                if (smsResponse.status == 201) { console.log('SMS sent successfully') }   
              } catch(error) {
                console.log("Error in sms to worker", error)
              }

              window.location.href = `${FRONTEND_URL}/payment_success?payment_id=${response.razorpay_payment_id}`
            },
            modal: {
              ondismiss: function () {
                // User closed the payment form
                console.log("Payment cancelled by user");
              }
            }
          };

          var rzp1 = new Razorpay(options);

          rzp1.on('payment.failed', function (response) {
            // Failure handler
            console.log("Payment failed", response);

            window.location.href = `${FRONTEND_URL}/payment_failed?payment_id=undefined`            
          });

        rzp1.open();
      });
    } catch (error) {
      console.log("Error in payment service", error);
    }
  }

  const PaymentGatewayFees = parseFloat(((SelectedService?.charge * 2) / 100).toFixed(2));
  const PlatformFees = parseFloat(((SelectedService?.charge * 3) / 100).toFixed(2));
  const TotalAmount = (SelectedService?.charge + PlatformFees + PaymentGatewayFees).toFixed(2);

  function FinalBooking(isOpen){
    if(SessionID.SessionID == undefined){
      toastFailure('Login First') 
      setTimeout(() => {  showSignUpForm() }, 800);
      return;
    }

    if(PersonalFormData.Name === ""){
      togglePersonalForm(true)
    } 
    else if(AddressFormData.Address === ""){
      toggleAddressForm(true)
    }
    else{
      console.log("Open summary")
      
        const personalDetailsLabel = document.getElementById('FinalSummary');

        if (personalDetailsLabel) {
            personalDetailsLabel.classList.toggle('displayFlex', isOpen);
            personalDetailsLabel.classList.toggle('displayNone', !isOpen);
        } else {
            console.error("Element with ID 'PersonalDetailsLabel' not found.");
        }
    
    }
  }

  return (
    <div className="w-full flex sm:flex-row sm:px-4 px-2 border-2 py-2 border-[#f2da1d] bg-white rounded-lg shadow-md">
      {/* Personal & Address Forms */}
  
    <PersonalForm />
    <AddressForm />
  

  {/* Matched Service Details */}
  {SelectedService ? (
  <div className="w-full flex flex-col sm:flex-wrap space-y-4" id="bookingblure1">
    <div className="w-full">

      {addservice_List.map((item, index) => {
        if (item.Category !== Category) return null;

        return item.Services.map((serviceItem, serviceIndex) => {
          if (serviceItem.ServiceName !== SelectedService?.parent) return null;
          return serviceItem.SubServices.map((subService, subIndex) => {
            if (subService.Service !== SelectedService?.service) return null;
            return subService.Details.map((detail, detailIndex) => {
  if (
    subService.Service !== SelectedService?.service ||
    detail.DetailsName !== SelectedService?.detail
  ) return null;

  return (
    <div key={`${index}-${serviceIndex}-${subIndex}-${detailIndex}`} className="bg-[#f9f9f9] p-4 rounded-lg shadow-sm mb-4">
      <h2 className="text-xl font-semibold text-[#33806b] mb-2">{SelectedService.detail}</h2>
      <p className="text-gray-700">{detail.DetailsDescription}</p>

      <div className="mt-4 flex flex-col sm:flex-row items-center gap-4">
        <img
          className="rounded-xl w-40 h-auto object-cover"
          src={detail.DetailsImage2}
          alt={detail.DetailsName}
        />

        <div className="text-end sm:text-left w-full">
          <p className={`text-sm ${SelectedService.charge === 0 ? 'text-[#f87171]': 'text-[#33806b]' }  font-semibold`}>
            Rs.{SelectedService.charge}
            <span className="text-xs line-through text-gray-400 ml-2">
              {SelectedService.charge === 0 ? '' :  `Rs.${SelectedService.overcharge}` }
            </span>
          </p>
          <div className="mt-2"><ReviewStar /></div>
        </div>

        <div className="w-full text-center sm:text-left">
          {SelectedService.charge === 0 ? 
          <button
          className="rounded-xl text-[#ffffff] sm:text-sm bg-[#f87171] shadow-md py-3 px-6 w-full sm:w-40 transition"
          >
            Not Available
          </button>:
          <button
          className="rounded-xl text-white bg-[#33806b] hover:bg-[#28745f] shadow-md py-3 px-6 w-full sm:w-40 transition"
          onClick={FinalBooking}
          >
            Book Service
          </button>
          }
        </div>
      </div>
    </div>
  );
});

          });
        });
      })}
    </div>

    
  </div>
) : (
  <p className="text-red-500 font-medium">No matching detail found.</p>
)}


  {/* Final Summary Popup */}
  <div
    className="fixed hidden h-screen w-screen items-center justify-center z-50 top-0 left-0 bg-black bg-opacity-40"
    id="FinalSummary"
  >
    <div className="bg-white h-full sm:h-auto w-full md:w-[32rem] sm:rounded-2xl shadow-xl p-6 space-y-4">
      {/* Header */}
      <div className="flex items-center" onClick={() => FinalBooking(false)}>
        <img className="h-6 cursor-pointer rotate-180 " src={next_icon} alt="Back" />
        <h3 className="text-md text-gray-600">Booking Summary</h3>
      </div>

      {/* Booking Info */}
      <div className="text-sm space-y-2">
        <div className="flex justify-between">
          <span>Service Category</span>
          <span className="font-medium">{OneWorker.ShopCategory}</span>
        </div>
        <div className="flex justify-between">
          <span>Shop/Worker Name</span>
          <span className="font-medium">{OneWorker.ShopName}</span>
        </div>
        <div className="flex justify-between">
          <span>Your Phone Number</span>
          <span className="font-medium">{UserData.UserNumber}</span>
        </div>
      </div>

      {/* Charges */}
      <div className="text-sm space-y-2 border-t pt-4 border-dashed border-[#33806b]">
        <div className="flex justify-between">
          <span>Service Charge</span>
          <span>Rs.{SelectedService?.charge}.00</span>
        </div>
        <div className="flex justify-between">
          <span>Platform Fees</span>
          <span>Rs.{PlatformFees}</span>
        </div>
        <div className="flex justify-between">
          <span>Payment Gateway Fees</span>
          <span>Rs.{PaymentGatewayFees}</span>
        </div>
        <div className="flex justify-between font-semibold text-[#33806b] pt-2 border-t border-[#f2da1d]">
          <span>Total Charge</span>
          <span>Rs.{TotalAmount}</span>
        </div>
      </div>

      {/* Pay Button */}
      <button
        className="w-full bg-[#f2da1d] hover:bg-yellow-400 text-[#33806b] font-semibold py-3 rounded-xl transition"
        onClick={() => {
          PayServiceCharge({
            BookingCategory: OneWorker.ShopCategory,
            ShopName: OneWorker.ShopName,
            BookingService: SelectedService,
            ServiceAmount: SelectedService.charge,
            PlatformFees: PlatformFees,
            PaymentGatewayFees: PaymentGatewayFees,
            TotalAmount: TotalAmount,
            WorkerNumber: OneWorker.ShopPhoneNumber,
          });
        }}
      >
        Pay Now - Rs.{TotalAmount}
      </button>
    </div>
  </div>
</div>




  )
}

export default FinalBookingCard

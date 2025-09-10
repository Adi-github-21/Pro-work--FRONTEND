// Package
import React, { useEffect, useContext } from 'react'
import { Link } from 'react-router-dom'
import { Helmet } from 'react-helmet'

// Component
import WorkerFormEdit from '../../Components/WorkerForm/WorkerFormEdit'
import ServiceForm from '../../Components/WorkerForm/ServiceForm'

// Functions
import { toggleWorkerEdit, toggleServiceForm } from '../../Components/WorkerForm/funcWorkerForm'
import { MyContext } from '../../ContextAPI'

function WorkerProfile() {
  const { UserData, WorkerFormData, ServiceFormData, EditWorkerDetails, setEditWorkerDetails, showBankForm, setShowBankForm } = useContext(MyContext);

  useEffect(() => {
    // console.log("isService changed to:", ServiceFormData.isService);
    // Do something when it changes
  }, [ServiceFormData.isService]);


  return (
    <div className='flex flex-wrap pt-20 w-full'>
      <Helmet><title>Pro Work - My Worker Profile</title></Helmet>

      {EditWorkerDetails && <WorkerFormEdit /> }

      {!ServiceFormData.isService && <ServiceForm />} 


      <div className="w-full px-4 flex flex-wrap justify-between items-center mb-6">
        <div className='text-xs sm:text-lg text-gray-500'>
          <Link to='/'><span className='hover:text-green-800'>Home</span> / </Link>
          <Link to={`/my-profile/${UserData.UserObjectID}`}><span className='hover:text-green-800'>Profile</span> / </Link>
          <span className='text-gray-400'>Shop Profile</span>
        </div>

        <div>
          {ServiceFormData.isService ? 
            <Link to={`/my-profile/${UserData.UserObjectID}/my-worker-profile/${WorkerFormData.WorkerObjectID}/my-wallet`}><button className='mr-4 rounded-md bg-[#188e6d] mt-4 2xs:mt-0  px-4 py-2 sm:px-5 sm:py-3 text-xs sm:text-sm font-semibold text-white shadow-lg transform transition-transform hover:scale-105 hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'>Show Wallet</button></Link>
            :
            <button onClick={() => toggleServiceForm(true) } className='mr-4 rounded-md bg-[#188e6d] mt-4 2xs:mt-0  px-4 py-2 sm:px-5 sm:py-3 text-xs sm:text-sm font-semibold text-white shadow-lg transform transition-transform hover:scale-105 hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'>Add Service</button>
          }
          <button onClick={() => { setEditWorkerDetails(true), setTimeout(() => { toggleWorkerEdit(true) }, 200); }} className="rounded-md bg-[#f2da1d] mt-4 2xs:mt-0 px-4 py-2 sm:px-5 sm:py-3 text-xs sm:text-sm font-semibold text-[#33806b] shadow-lg transform transition-transform hover:scale-105 hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#33806b]">Edit Profile</button>
        </div>
      </div>

      <div className='w-full px-4 flex justify-center flex-wrap mt-6'>
        <div className='w-full sm:w-95 grid grid-cols-1 sm:grid-cols-3 gap-4'>
          <div className='h-64 sm:h-[400px] row-span-2 col-span-1 sm:col-span-2 flex justify-center items-center'>
            <img src={WorkerFormData.ShopPhoto1} alt="Shop" className="object-cover h-full w-full" />
          </div>
          <div className='h-64 sm:h-[190px] col-span-1 flex justify-center items-center'>
            <img src={WorkerFormData.ShopPhoto2} alt="Shop" className="object-cover h-full w-full" />
          </div>
          <div className='h-64 sm:h-[190px] col-span-1 flex justify-center items-center'>
            <img src={WorkerFormData.ShopPhoto3} alt="Shop" className="object-cover h-full w-full" />
          </div>
        </div>
      </div>

      <div className='w-full flex justify-center sm:px-4'>
        <div className='w-full px-4 sm:p-0 bg-white shadow-lg'>
          <div className="border-b border-gray-300 pb-12 sm:px-8 ">

            <div className="mt-10 grid grid-cols-1  gap-x-6 gap-y-8 sm:grid-cols-6">
              <div className="col-span-2 sm:col-span-6">
                <label className="block text-lg px-2 font-medium text-gray-900">Shop name</label>
                <span className='mt-2 block px-2 w-full rounded-md border-0 py-1.5 ring-1 ring-inset ring-gray-300 capitalize text-gray-900 shadow-sm'>{WorkerFormData.ShopName}</span>
              </div>

              <div className="col-span-2 sm:col-span-6">
                <label className="block px-2 text-sm font-medium text-gray-900">Shop Description</label>
                <span className='mt-2 block px-2 capitalize w-full rounded-md border-0 py-1.5 ring-1 ring-inset ring-gray-300 text-gray-900 shadow-sm'>{WorkerFormData.ShopDescription}</span>
              </div>

              <div className="col-span-2 sm:col-span-6">
                <label className="block text-sm font-medium text-gray-900">Shop address</label>
                <span className='mt-2 block px-2 w-full rounded-md border-0 py-1.5 ring-1 ring-inset ring-gray-300 text-gray-900 shadow-sm'>{WorkerFormData.ShopAddress}</span>
              </div>

              <div className="col-span-2 sm:col-span-3 lg:col-span-2">
                <label className="block text-sm font-medium text-gray-900">Shop/Worker Category</label>
                <span className='mt-2 block px-2 w-full rounded-md border-0 py-1.5 ring-1 ring-inset ring-gray-300 text-gray-900 shadow-sm'>{WorkerFormData.ShopCategory}</span>
              </div>

              <div className="col-span-2 sm:col-span-3 lg:col-span-2">
                <label className="block text-sm font-medium text-gray-900">Area</label>
                <span className='mt-2 block px-2 w-full rounded-md border-0 py-1.5 ring-1 ring-inset ring-gray-300 text-gray-900 shadow-sm'>{WorkerFormData.Area.join(', ')}</span>
              </div>

              <div className="col-span-2 sm:col-span-3 lg:col-span-2">
                <label className="block text-sm font-medium text-gray-900">City</label>
                <span className='mt-2 block px-2 w-full rounded-md border-0 py-1.5 ring-1 ring-inset ring-gray-300 text-gray-900 shadow-sm'>{WorkerFormData.City}</span>
              </div>

            
              <div className='col-span-2 sm:col-span-6 mt-8 text-2xl'>Owner Details</div>


              <div className="col-span-2 sm:col-span-3 lg:col-span-2">
                <label className="block text-sm font-medium text-gray-900">Full name</label>
                <span className='mt-2 block px-2 capitalize w-full rounded-md border-0 py-1.5 ring-1 ring-inset ring-gray-300 text-gray-900 shadow-sm'>{WorkerFormData.FullName}</span>
              </div>
            

              <div className="col-span-2 sm:col-span-3 lg:col-span-2">
                <label className="block text-sm font-medium text-gray-900">Email address</label>              
                <span className='mt-2 block px-2 w-full rounded-md border-0 py-1.5 ring-1 ring-inset ring-gray-300 text-gray-900 shadow-sm'>{WorkerFormData.ShopEmail}</span>
              </div>

              <div className="col-span-2 sm:col-span-3 lg:col-span-2">
                <label className="block text-sm font-medium text-gray-900">Phone Number</label>
                <span className='mt-2 block px-2 w-full rounded-md border-0 py-1.5 ring-1 ring-inset ring-gray-300 text-gray-900 shadow-sm'>{WorkerFormData.ShopPhoneNumber}</span>
              </div>
            

              <div className="col-span-2 sm:col-span-4 lg:col-span-2">
                <label className="block text-sm font-medium text-gray-900">Owner's Aadhar Card</label>
                <div className="mt-2 w-full sm:w-[22rem] h-48 flex justify-center rounded-lg border border-dashed hover:shadow-lg border-gray-300">
                  <img src={WorkerFormData.AadharFront} alt="Owner's Aadhar Card" className="object-cover h-full w-full" />
                </div>
              </div>


              {/* Sub Service  */}
              
              {ServiceFormData?.isService && Array.isArray(ServiceFormData?.Services) && (
  <div className="col-span-2 sm:col-span-6 grid grid-cols-1 gap-x-6 gap-y-4 sm:grid-cols-8">

    <div className="col-span-2 mb-4 sm:col-span-6 lg:col-span-8">
      <div className='col-span-2 sm:col-span-6 mt-8 text-2xl text-gray-900'>Service Name & Charges</div>
    </div>

    {ServiceFormData.Services.map((serviceGroup, groupIdx) => (
      <div key={groupIdx} className="col-span-2 sm:col-span-6 lg:col-span-8">

        {/* Flat service (no subservices) */}
        {serviceGroup.Charge !== undefined ? (
          <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 mb-6">
            <div>
              <label className="block text-sm font-medium text-gray-900">Service</label>
              <span className="mt-2 block px-2 w-full rounded-md border border-gray-300 py-1.5 text-gray-900 shadow-sm">
                {serviceGroup.ServiceName}
              </span>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-900">Charge</label>
              <span className="mt-2 block px-2 w-full rounded-md border border-gray-300 py-1.5 text-gray-900 shadow-sm">
                Rs.{serviceGroup.Charge}
              </span>
            </div>
            {/* <div>
              <label className="block text-sm font-medium text-gray-900">OverCharge</label>
              <span className="mt-2 block px-2 w-full rounded-md border border-gray-300 py-1.5 text-gray-900 shadow-sm">
                Rs.{serviceGroup.OverCharge}
              </span>
            </div> */}
          </div>
        ) : (
          // Service with sub-services
          <>
            <h3 className="text-lg font-semibold text-gray-800 mb-2">{groupIdx + 1}. {serviceGroup.ServiceName}</h3>

            {serviceGroup.SubServices.map((sub, subIdx) => (
              <div key={subIdx} className="mb-6">
                <h4 className="text-sm font-medium text-indigo-700 mb-1">{sub.Service}</h4>

                {/* Subservice with details */}
                {Array.isArray(sub.Details) ? (
                  sub.Details.map((detail, idx) => (
                    <div key={idx} className="grid grid-cols-1 sm:grid-cols-4 gap-4 mb-3">
                      <div>
                        <label className="block text-sm font-medium text-gray-900">Detail</label>
                        <span className="mt-2 block px-2 w-full rounded-md border border-gray-300 py-1.5 text-gray-900 shadow-sm">
                          {detail.Detail}
                        </span>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-900">Charge</label>
                        <span className="mt-2 block px-2 w-full rounded-md border border-gray-300 py-1.5 text-gray-900 shadow-sm">
                          Rs.{detail.Charge}
                        </span>
                      </div>
                      {/* <div>
                        <label className="block text-sm font-medium text-gray-900">OverCharge</label>
                        <span className="mt-2 block px-2 w-full rounded-md border border-gray-300 py-1.5 text-gray-900 shadow-sm">
                          Rs.{detail.OverCharge}
                        </span>
                      </div> */}
                    </div>
                  ))
                ) : (
                  // Subservice without details (just name, charge, overcharge)
                  <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 mb-3">
                    <div>
                      <label className="block text-sm font-medium text-gray-900">Charge</label>
                      <span className="mt-2 block px-2 w-full rounded-md border border-gray-300 py-1.5 text-gray-900 shadow-sm">
                        Rs.{sub.Charge}
                      </span>
                    </div>
                    {/* <div>
                      <label className="block text-sm font-medium text-gray-900">OverCharge</label>
                      <span className="mt-2 block px-2 w-full rounded-md border border-gray-300 py-1.5 text-gray-900 shadow-sm">
                        Rs.{sub.OverCharge}
                      </span>
                    </div> */}
                  </div>
                )}
              </div>
            ))}
          </>
        )}
      </div>
    ))}
  </div>
)}


          </div>
        </div>
      </div>
    </div>
  </div>
  )
}

export default WorkerProfile
import React, { useState, useContext } from 'react';
import { URL, toastSuccess, toastFailure } from '../../func.jsx';
import next_icon from '../../Assets/next.png';
import { MyContext } from '../../ContextAPI';
import axios from 'axios';
import loadState from '../../Assets/loadingState.gif';
import { toggleWorkerEdit } from './funcWorkerForm.js';

function WorkerFormEdit() {
    
  const { UserData, WorkerFormData, error, setErrors, setEditWorkerDetails, setWorkerFormData, loadingState, setLoadingState, setIsFormOpen } = useContext(MyContext);
  const [EditShopFormData, setEditShopFormData] = useState({ ShopName: WorkerFormData.ShopName, ShopDescription: WorkerFormData.ShopDescription, ShopAddress: WorkerFormData.ShopAddress, ShopCategory: WorkerFormData.ShopCategory, Area: WorkerFormData.Area, City: WorkerFormData.City, FullName: WorkerFormData.FullName, ShopEmail: WorkerFormData.ShopEmail, ShopPhoneNumber: WorkerFormData.ShopPhoneNumber, AadharFront: WorkerFormData.AadharFront, AadharBack: WorkerFormData.AadharBack, ShopPhoto1: WorkerFormData.ShopPhoto1, ShopPhoto2: WorkerFormData.ShopPhoto2, ShopPhoto3: WorkerFormData.ShopPhoto3 });
  const [imagePreviews, setImagePreviews] = useState({ ShopPhoto1: WorkerFormData.ShopPhoto1, ShopPhoto2: WorkerFormData.ShopPhoto2, ShopPhoto3: WorkerFormData.ShopPhoto3, AadharFront: WorkerFormData.AadharFront, AadharBack: WorkerFormData.AadharBack });


  // Updating the worker text data in the state
  const handleEditShopInputChange = (e) => {
    const { name, value } = e.target;
    setEditShopFormData({ ...EditShopFormData, [name]: value });
  };

  // Updating the worker file data in the state
  const handleEditShopFileChange = (e) => {
    const { name, files } = e.target;
    const file = files[0];
    setEditShopFormData({ ...EditShopFormData, [name]: file });

    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => { setImagePreviews((prevPreviews) => ({ ...prevPreviews, [name]: reader.result })) };
      reader.readAsDataURL(file);
    }
  };

  // Validating the Worker Details
  const ValidationErrors = {}
  function validateWorkerDetails(){
    if(!EditShopFormData.ShopName) { ValidationErrors.ShopName = "Shop Name is Required"
    setLoadingState(false) }
    
    if(!EditShopFormData.ShopAddress) { ValidationErrors.ShopAddress = "Shop Address is Required"
    setLoadingState(false) }
    
    if(!EditShopFormData.FullName) { ValidationErrors.FullName = "Name is Required"
    setLoadingState(false) }

    if(!EditShopFormData.ShopEmail) { ValidationErrors.ShopEmail = "Email is Required"
    setLoadingState(false) }
    else if(!/\S+@\S+\.\S+/.test(EditShopFormData.ShopEmail)) { ValidationErrors.ShopEmail = "Email is not valid"
    setLoadingState(false) }

    if(!EditShopFormData.ShopCategory) { ValidationErrors.ShopCategory = "Shop Category is required"
    setLoadingState(false) }
    else if(EditShopFormData.ShopCategory !== WorkerFormData.ShopCategory) { ValidationErrors.ShopCategory = "Shop Category cannot be changed"
      setLoadingState(false)
    }

    if(!EditShopFormData.ShopPhoneNumber) { ValidationErrors.ShopPhoneNumber = "Phone Number is Required"
    setLoadingState(false) }

    if(!EditShopFormData.AadharFront) { ValidationErrors.AadharFront = "Worker Aadhar card is required"
    setLoadingState(false) }

    if(!EditShopFormData.AadharBack) { ValidationErrors.AadharBack = "Worker Aadhar card is required"
      setLoadingState(false) }

    if(!EditShopFormData.ShopPhoto1) { ValidationErrors.ShopPhoto1 = "Three Photos are required for your public profile"
  setLoadingState(false) }
    if(!EditShopFormData.ShopPhoto2) { ValidationErrors.ShopPhoto2 = "Three Photos are required for your public profile"
  setLoadingState(false) }
    if(!EditShopFormData.ShopPhoto3) { ValidationErrors.ShopPhoto3 = "Three Photos are required for your public profile"
  setLoadingState(false) }

    setErrors(ValidationErrors)
  }

  const handleEditShopSubmit = async (e) => {
    e.preventDefault();
    setLoadingState(true)
    validateWorkerDetails()
    if(Object.keys(ValidationErrors).length === 0){
      const UserObjectID = UserData.UserObjectID

      console.log("User ID before submission", UserObjectID)
      console.log('Form data before submission:', EditShopFormData);
    
    
      const WorkerResponse  = await axios.patch(`${URL}/worker/register`, {...EditShopFormData, UserObjectID},{ withCredentials: true, headers: { 'Content-Type': 'multipart/form-data' } })
      if(WorkerResponse.status == 201){
        // Reload the page after 800ms to reflect the updated data
        setTimeout(() => { 
          toastSuccess("Service details created successfully")   
          
          setEditWorkerDetails(false)
          toggleWorkerEdit(false)
          setLoadingState(false)
          setWorkerFormData({ ...EditShopFormData, isWorker: true }); // Update the global context
        }, 1300);
      } else if (WorkerResponse.status == 401 || WorkerResponse.status == 500){
        const WorkerResponse = await WorkerResponse.json();
        toastFailure(WorkerResponse.message);
         setLoadingState(false)
      } else {
        toastFailure("Something went wrong, Please try again");
         setLoadingState(false)
      }   
    }
  };
  

  return (
    <form className='displayNone fixed inset-0 flex sm:pt-20 w-full h-[100vh] sm:h-[99vh] z-50 justify-center bg-black bg-opacity-50' id='EditWorkerDetailsForm' onSubmit={handleEditShopSubmit}>
      <div className="sm:w-[90%] h-full sm:rounded-3xl bg-white overflow-y-scroll shadow-shadow10px" id='CustomScroll'>
        <div className='flex items-center h-12 w-full pl-4'>
          <img className='h-6 cursor-pointer rotate-180' src={next_icon} alt="back arrow"  onClick={() => { setEditWorkerDetails(false), toggleWorkerEdit(false)}} />
          <h3 className='text-md cursor-pointer'  onClick={() => { setEditWorkerDetails(false), toggleWorkerEdit(false) }}>Edit Shop</h3>
        </div>
        <div className="border-b border-gray-900/10 pb-12 px-8">
          <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
            <div className="sm:col-span-6">
              <label htmlFor="shopName" className="block text-lg font-medium text-gray-900">Shop name</label>
              <div className="mt-2">
                <input type="text" name="ShopName" id="shopName" value={EditShopFormData.ShopName} className="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm" onChange={handleEditShopInputChange} />
              </div>
              {error.ShopName && <span className='errormassDiv text-red-500 mb-6 -mt-8 w-[95%]'>{error.ShopName}</span>}
            </div>

            <div className="col-span-full">
              <label htmlFor="shopDescription" className="block text-sm font-medium text-gray-900">Shop Description</label>
              <div className="mt-2">
                <textarea id="shopDescription" name="ShopDescription" rows="3" value={EditShopFormData.ShopDescription} className="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm" onChange={handleEditShopInputChange}></textarea>
              </div>
            </div>

            <div className="col-span-full">
              <label htmlFor="shopAddress" className="block text-sm font-medium text-gray-900">Shop address</label>
              <div className="mt-2">
                <input type="text" name="ShopAddress" id="ShopAddress" value={EditShopFormData.ShopAddress} className="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm" onChange={handleEditShopInputChange} />
              </div>
              {error.ShopAddress && <span className='errormassDiv text-red-500 mb-6 -mt-8 w-[95%]'>{error.ShopAddress}</span>}
            </div>

            <div className="sm:col-span-2">
              <label htmlFor="shopcategory" className="block text-sm/6 font-medium text-gray-900">Shop/Worker Category</label>
              <div className="mt-2">
              <select id="area" name="ShopCategory" value={EditShopFormData.ShopCategory} className="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm" onChange={handleEditShopInputChange}>
              <option>Beautician</option>
                  <option>Carpenter</option>
                  <option>Electrician</option>
                  <option>Househelp</option>
                  <option>Priest</option>
                  <option>Plumber</option>
                  <option>Painter</option>
                  <option>Tutor</option>
                </select>
              </div>
              {error.ShopCategory && <span className='errormassDiv text-red-500 mb-6 -mt-8 w-[95%]'>{error.ShopCategory}</span>}
            </div>

            <div className="sm:col-span-2">
              <label htmlFor="area" className="block text-sm font-medium text-gray-900">Area</label>
              <div className="mt-2">
                <select id="area" name="Area" value={EditShopFormData.Area} className="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm" onChange={handleEditShopInputChange}>
                  <option>Civil Lines</option>
                  <option>Jhunsi</option>
                  <option>Mama Bhanja</option>
                  <option>Naini</option>
                </select>
              </div>
            </div>

            <div className="sm:col-span-2">
              <label htmlFor="city" className="block text-sm font-medium text-gray-900">City</label>
              <div className="mt-2">
                <select id="city" name="Aity" value={EditShopFormData.City} className="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm" onChange={handleEditShopInputChange}>
                  <option>Prayagraj</option>
                </select>
              </div>
            </div>

            

            <div className='sm:col-span-6 mt-8'>
              <h2 className='text-2xl'>Owner Details</h2>
            </div>

            <div className="sm:col-span-2">
              <label htmlFor="fullName" className="block text-sm font-medium text-gray-900">Full name</label>
              <div className="mt-2">
                <input type="text" name="FullName" id="fullName" value={EditShopFormData.FullName} className="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm" onChange={handleEditShopInputChange} />
              </div>
              {error.FullName && <span className='errormassDiv text-red-500 mb-6 -mt-8 w-[95%]'>{error.FullName}</span>}
            </div>

            <div className="sm:col-span-2">
              <label htmlFor="emailAddress" className="block text-sm font-medium text-gray-900">Email address</label>
              <div className="mt-2">
                <input id="emailAddress" name="ShopEmail" type="email" value={EditShopFormData.ShopEmail} className="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm" onChange={handleEditShopInputChange} />
              </div>
              {error.ShopEmail && <span className='errormassDiv text-red-500 mb-6 -mt-8 w-[95%]'>{error.ShopEmail}</span>}
            </div>

            <div className="sm:col-span-2">
              <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-900">Phone Number</label>
              <div className="mt-2">
                <input type="text" name="ShopPhoneNumber" id="phoneNumber" value={EditShopFormData.ShopPhoneNumber} className="block w-full rounded-md border-0 py-1.5 px-2 ring-1 ring-inset ring-gray-300 text-gray-900 shadow-sm" onChange={handleEditShopInputChange} />
              </div>
              {error.ShopPhoneNumber && <span className='errormassDiv text-red-500 mb-6 -mt-8 w-[95%]'>{error.ShopPhoneNumber}</span>}
            </div>

            <div className="col-span-full">
              <label htmlFor="ownerAadharCard" className="block text-sm/6 font-medium text-gray-900">Owner&apos;s Aadhar Card</label>
              <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
              <div className="text-center flex flex-wrap justify-center w-60 h-48">
                  {imagePreviews.AadharFront ? (
                    <img src={imagePreviews.AadharFront} alt="Aadhar Card Preview" className="mb-4 h-24 w-24 object-cover" />
                  ) : (
                    <svg className="mx-auto size-12 text-gray-300" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" data-slot="icon">
                      <path fillRule="evenodd" d="M1.5 6a2.25 2.25 0 0 1 2.25-2.25h16.5A2.25 2.25 0 0 1 22.5 6v12a2.25 2.25 0 0 1-2.25 2.25H3.75A2.25 2.25 0 0 1 1.5 18V6ZM3 16.06V18c0 .414.336.75.75.75h16.5A.75.75 0 0 0 21 18v-1.94l-2.69-2.689a1.5 1.5 0 0 0-2.12 0l-.88.879.97.97a.75.75 0 1 1-1.06 1.06l-5.16-5.159a1.5 1.5 0 0 0-2.12 0L3 16.061Zm10.125-7.81a1.125 1.125 0 1 1 2.25 0 1.125 1.125 0 0 1-2.25 0Z" clipRule="evenodd" />
                    </svg>
                  )}
                  <div className="mt-4 flex text-sm text-gray-600">
                    <label htmlFor="file-upload" className="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500">
                      <span>Upload a file</span>
                      <input id="file-upload" name="AadharFront" type="file" className="sr-only" onChange={handleEditShopFileChange} />
                    </label>
                    <p className="pl-1 pt-1 ml-1">or drag and drop</p>
                  </div>
                  <p className="text-xs/5 mt-1  text-gray-600">PNG, JPG up to 10MB</p>
                </div>
              </div>
              {error.AadharFront && <span className='errormassDiv text-red-500 mb-6 -mt-8 w-[95%]'>{error.AadharFront}</span>}

              <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
              <div className="text-center flex flex-wrap justify-center w-60 h-48">
                  {imagePreviews.AadharBack ? (
                    <img src={imagePreviews.AadharBack} alt="Aadhar Card Preview" className="mb-4 h-24 w-24 object-cover" />
                  ) : (
                    <svg className="mx-auto size-12 text-gray-300" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" data-slot="icon">
                      <path fillRule="evenodd" d="M1.5 6a2.25 2.25 0 0 1 2.25-2.25h16.5A2.25 2.25 0 0 1 22.5 6v12a2.25 2.25 0 0 1-2.25 2.25H3.75A2.25 2.25 0 0 1 1.5 18V6ZM3 16.06V18c0 .414.336.75.75.75h16.5A.75.75 0 0 0 21 18v-1.94l-2.69-2.689a1.5 1.5 0 0 0-2.12 0l-.88.879.97.97a.75.75 0 1 1-1.06 1.06l-5.16-5.159a1.5 1.5 0 0 0-2.12 0L3 16.061Zm10.125-7.81a1.125 1.125 0 1 1 2.25 0 1.125 1.125 0 0 1-2.25 0Z" clipRule="evenodd" />
                    </svg>
                  )}
                  <div className="mt-4 flex text-sm text-gray-600">
                    <label htmlFor="file-upload" className="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500">
                      <span>Upload a file</span>
                      <input id="file-upload" name="AadharBack" type="file" className="sr-only" onChange={handleEditShopFileChange} />
                    </label>
                    <p className="pl-1 pt-1 ml-1">or drag and drop</p>
                  </div>
                  <p className="text-xs/5 mt-1  text-gray-600">PNG, JPG up to 10MB</p>
                </div>
              </div>
              {error.AadharBack && <span className='errormassDiv text-red-500 mb-6 -mt-8 w-[95%]'>{error.AadharBack}</span>}
            </div>

            <div className="col-span-full">
              <label className="block text-sm/6 font-medium text-gray-900">Shop Photos</label>
              <div className="mt-2 flex flex-wrap md:justify-between lg:space-r-4">
                {['ShopPhoto1', 'ShopPhoto2', 'ShopPhoto3'].map((photoName, index) => (
                  <div key={index} className="flex w-full md:w-auto flex-col items-center justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10 my-2">
                    {imagePreviews[photoName] ? (
                      <img src={imagePreviews[photoName]} alt={`Preview ${photoName}`} className="mb-4 h-24 w-24 object-cover" />
                    ) : (
                      <svg className="mx-auto size-12 text-gray-300" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" data-slot="icon">
                        <path fillRule="evenodd" d="M1.5 6a2.25 2.25 0 0 1 2.25-2.25h16.5A2.25 2.25 0 0 1 22.5 6v12a2.25 2.25 0 0 1-2.25 2.25H3.75A2.25 2.25 0 0 1 1.5 18V6ZM3 16.06V18c0 .414.336.75.75.75h16.5A.75.75 0 0 0 21 18v-1.94l-2.69-2.689a1.5 1.5 0 0 0-2.12 0l-.88.879.97.97a.75.75 0 1 1-1.06 1.06l-5.16-5.159a1.5 1.5 0 0 0-2.12 0L3 16.061Zm10.125-7.81a1.125 1.125 0 1 1 2.25 0 1.125 1.125 0 0 1-2.25 0Z" clipRule="evenodd" />
                      </svg>
                    )}
                    <div className="mt-4 flex text-sm/6 text-gray-600">
                    <label htmlFor={photoName} className="flex items-center relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500">
                        <span>Upload a file</span>
                        <input id={photoName} name={photoName} type="file" className="sr-only" onChange={handleEditShopFileChange} />
                      </label>
                      <p className="pl-1 py-1 ml-1">or drag and drop</p>
                    </div>
                    <p className="text-xs/5 mt-1 text-gray-600">PNG, JPG up to 10MB</p>
                  </div>
                ))}
              </div>
              {error.ShopPhoto3 && <span className='errormassDiv text-red-500 mb-6 -mt-8 w-[95%]'>{error.ShopPhoto3}</span>}
            </div>
          </div>
        </div>

        <div className="pb-4 pt-2 pl-8 flex items-center justify-between px-8 gap-x-6">
          <button type="button" className="text-sm/6 text-gray-900 rounded-md w-32 px-3 py-2  font-semibold  shadow-sm hover:text-red-500 hover:border hover:border-red-500"  onClick={() => {setEditWorkerDetails(false), toggleWorkerEdit(false)}}>Cancel</button>
          <button type="submit" className="rounded-md bg-[#42DCB3] px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-[#3dc5a1] focus-visible:outline-[#3dc5a1] w-32" onClick={handleEditShopSubmit}>
            {loadingState ? <div className='flex justify-center items-center'> <img src={loadState} className='h-4' alt="" /> </div> : "Save"}
          </button>
        </div>
      </div>
    </form>
  );
}

export default WorkerFormEdit;
//Package
import React, { useState, useEffect, useContext } from 'react'
import axios from 'axios'

// Assets
import next_icon from '../../Assets/next.png'
import loadState from '../../Assets/loadingState.gif';

// Functions
import { URL, toastSuccess, toastFailure } from '../../func.jsx'
import { toggleWorkerForm, toggleServiceForm } from './funcWorkerForm'
import { MyContext } from '../../ContextAPI'

function WorkerForm() {

  const { error, setErrors, loadingState, setLoadingState, UserData, setWorkerFormData, SessionID } = useContext(MyContext);
  const [LocalWorkerFormData, setLocalWorkerFormData] = useState({ WorkerObjectID: "", ShopName: '', ShopDescription: '', ShopAddress: '', ShopCategory: 'Electrician', Area: ['Civil Lines'], City: 'Prayagraj', FullName: '', ShopEmail: '', ShopPhoneNumber: '', AadharFront: null, AadharBack: null, ShopPhoto1: null ,ShopPhoto2: null, ShopPhoto3: null, isWorker: false  })
  const [ImagePreviews, setImagePreviews] = useState({ OwnerAadharCardFront: null, OwnerAadharCardBack: null, ShopPhoto1: null, ShopPhoto2: null, ShopPhoto3: null });

  // checking if user is Logged in before creating a shop
  // useEffect(() =>{ if(SessionID.SessionID == undefined){ toastFailure('Login First') } }, [SessionID.SessionID])
    
  // Updating the worker text data in the state
  const handleWorkerInput = (e) => {
    let { name, value } = e.target;
    
    if(name == 'ShopPhoneNumber'){
      const ErrorMessageDiv = document.querySelector('.errormassDiv')
      if (e.target.value.length <= '10') {
        setLocalWorkerFormData({ ...LocalWorkerFormData, [name]: value });
        if(error.ShopPhoneNumber){ ErrorMessageDiv.classList.add('displayNone') }
      }
      if(e.target.value.length == '10') {
        if(error.ShopPhoneNumber){ ErrorMessageDiv.classList.add('displayNone') }
      }
      else if(e.target.value.length > '10'){
        ValidationErrors.ShopPhoneNumber = "Enter a valid number"
        setErrors(ValidationErrors)
        if(error.ShopPhoneNumber){ ErrorMessageDiv.classList.remove('displayNone') }
      }
    }
    if(name != 'ShopPhoneNumber'){
    setLocalWorkerFormData({ ...LocalWorkerFormData, [name]: value });
    }
    
  };
  
  // Updating the worker file data in the state
  const handleWorkerFile = (e) => {
    const { name, files } = e.target;
    const file = files[0];
    setLocalWorkerFormData({ ...LocalWorkerFormData, [name]: file });

    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => { setImagePreviews((prevPreviews) => ({ ...prevPreviews, [name]: reader.result,})) };
      reader.readAsDataURL(file);
    }
  };

  // Validating the Worker Details
  const ValidationErrors = {}
  async function validateWorkerDetails(){
    if(!LocalWorkerFormData.ShopName) { 
      ValidationErrors.ShopName = "Shop Name is Required"
      setLoadingState(false) 
    }
    
    if(!LocalWorkerFormData.ShopAddress) { ValidationErrors.ShopAddress = "Shop Address is Required"
    setLoadingState(false) }
    
    if(!LocalWorkerFormData.FullName) { ValidationErrors.FullName = "Name is Required"
    setLoadingState(false) }

    if(!LocalWorkerFormData.ShopEmail) { ValidationErrors.ShopEmail = "Email is Required"
    setLoadingState(false) }
    else if(!/\S+@\S+\.\S+/.test(LocalWorkerFormData.ShopEmail)) { ValidationErrors.ShopEmail = "Email is not valid"
    setLoadingState(false) }

    if(!LocalWorkerFormData.ShopCategory) { ValidationErrors.ShopCategory = "Shop Category is required"
    setLoadingState(false) }
    

    if(!LocalWorkerFormData.ShopPhoneNumber) { ValidationErrors.ShopPhoneNumber = "Phone Number is Required"
    setLoadingState(false) }

    if(!LocalWorkerFormData.AadharFront) { ValidationErrors.AadharFront = "Front Aadhar Page is required"
      setLoadingState(false) }
    if(!LocalWorkerFormData.AadharBack) { ValidationErrors.AadharBack = "Back Aadhar Page is required"
      setLoadingState(false) }


    if(!LocalWorkerFormData.ShopPhoto1) { 
      ValidationErrors.ShopPhoto1 = "Three Photos are required for your public profile"
      setLoadingState(false) 
    }
    if(!LocalWorkerFormData.ShopPhoto2) { ValidationErrors.ShopPhoto2 = "Three Photos are required for your public profile"
      setLoadingState(false) }
    if(!LocalWorkerFormData.ShopPhoto3) { ValidationErrors.ShopPhoto3 = "Three Photos are required for your public profile"
      setLoadingState(false) 
    }

    setErrors(ValidationErrors)
  }

  
  
  // Submitting the form worker data to the server
  const handleWorkerSubmit = async (e) => {
    console.log('Worker Registration process started');
    e.preventDefault();
    console.log('Worker Registration Initiated');
    setLoadingState(true) 
    if(SessionID.SessionID == undefined){ 
      toastFailure('Login First');
      setLoadingState(false);
      return 
    }
    validateWorkerDetails()
    if(Object.keys(ValidationErrors).length === 0){
      const UserObjectID = UserData.UserObjectID
      console.log('Worker Form data before submission:', LocalWorkerFormData);
      const formData = new FormData();

// Loop through each key in LocalWorkerFormData
for (const key in LocalWorkerFormData) {
  const value = LocalWorkerFormData[key];
  if (key === 'Area' && Array.isArray(value)) {
    // For Area[], append each area individually with same key
    value.forEach((area) => {
      formData.append('Area', area); // Don't use 'Area[]' unless your backend expects it
    });
  } else if (
    key === 'AadharFront' || key === 'AadharBack' ||
    key === 'ShopPhoto1' || key === 'ShopPhoto2' || key === 'ShopPhoto3'
  ) {
    // Only append if file is present (not null)
    if (value) {
      formData.append(key, value);
    }
  } else {
    // Append regular field
    formData.append(key, value);
  }
}

// Also append UserObjectID separately if needed
formData.append('UserObjectID', UserData.UserObjectID);
for (let pair of formData.entries()) {
  console.log(pair[0] + ':', pair[1]);
}


// Now send via Axios
const delay = new Promise(resolve => setTimeout(resolve, 5000)); 
 const apiCall = axios.post(`${URL}/worker/register`, formData, {withCredentials: true })
  try {
    const [response] = await Promise.all([apiCall, delay]);
    console.log("Upload successful", response);
    // You can proceed to next step or show a success message
    toastSuccess("Shop/Worker registered successfully")          
        setWorkerFormData({ ...LocalWorkerFormData, isWorker: true });
        toggleWorkerForm(false)
        setTimeout(() => toggleServiceForm(true), 200);
        setLoadingState(false) 
        setLocalWorkerFormData({ WorkerObjectID: "", ShopName: '', ShopDescription: '', ShopAddress: '', ShopCategory: 'Electrician', Area: 'Civil Lines', City: 'Prayagraj', FullName: '', ShopEmail: '', ShopPhoneNumber: '', AadharFront: null, AadharBack: null, ShopPhoto1: null ,ShopPhoto2: null, ShopPhoto3: null, isWorker: false  })
  } catch (error) {
    console.error("Upload failed", error);
    // Handle error (e.g., show toast)
  } finally {
    setLoadingState(false);
  }


    
    //  setTimeout( async () => {
    //   try {
    //   // const WorkerResponse =  await axios.post(`${URL}/worker/register`, { ...LocalWorkerFormData, UserObjectID },{ withCredentials: true, headers: { 'Content-Type': 'multipart/form-data, application/json' } })
    //   if(WorkerResponse.status == 201){ 
    //     toastSuccess("Shop/Worker registered successfully")          
    //     setWorkerFormData({ ...LocalWorkerFormData, isWorker: true });
    //     toggleWorkerForm(false)
    //     toggleServiceForm(true)
    //     setLoadingState(false) 
    //     setLocalWorkerFormData({ WorkerObjectID: "", ShopName: '', ShopDescription: '', ShopAddress: '', ShopCategory: 'Electrician', Area: 'Civil Lines', City: 'Prayagraj', FullName: '', ShopEmail: '', ShopPhoneNumber: '', AadharFront: null, AadharBack: null, ShopPhoto1: null ,ShopPhoto2: null, ShopPhoto3: null, isWorker: false  })
    //   } else if (WorkerResponse.status == 400 || WorkerResponse.status == 401 || WorkerResponse.status == 500){
    //     const WorkerResponse = await WorkerResponse.json();
    //     toastFailure(WorkerResponse.message);
    //     setLoadingState(false);
    //   } else {
    //     toastFailure("Something went wrong, Please try again");
    //     setLoadingState(false);
    //   }
    //  } catch (error) {
    //   console.log('Error: ======>', error);
    //   setLoadingState(false);
    //  }
    //  }, 1300);
    }
  }

  return (  
    <form className='displayNone fixed inset-0 flex sm:pt-20 w-full h-screen sm:h-[99vh] z-50 justify-center bg-black bg-opacity-50' id='WorkerDetailsForm'>
      <div className="sm:w-[90%] h-full border-2 border-[#33806b] sm:rounded-3xl bg-white overflow-y-scroll shadow-shadow10px" id='CustomScroll'>
    
        <div className='flex items-center h-12 w-full pl-4'>
          <img className='h-6 cursor-pointer rotate-180' src={next_icon} alt="back arrow" onClick={() => toggleWorkerForm(false) }/>
          <h3 className='text-md cursor-pointer' onClick={() => toggleWorkerForm(false) }>Shop Registration</h3>
        </div>

        <div className="border-b border-gray-900/10 pb-12 px-8">

          <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
            <div className="sm:col-span-6">
              <label htmlFor="first-name" className="block text-lg font-medium text-gray-900">Shop name</label>
              <label htmlFor="last-name" className="block text-xs font-medium text-gray-500">Customers will see this name on Pro Work</label>
              <div className="mt-2">
                <input type="text" name="ShopName" id="first-name" autoComplete="given-name" className="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6" onChange={handleWorkerInput} />
              </div>
              {error.ShopName && <span className='errormassDiv text-red-500 mb-6 -mt-8 w-[95%]'>{error.ShopName}</span>}
            </div>

            <div className="col-span-full">
              <label htmlFor="about" className="block text-sm/6 font-medium text-gray-900">Shop Description</label>
              <div className="mt-2">
                <textarea id="RegisterShopForm" name="ShopDescription" rows="7" className="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6" onChange={handleWorkerInput}></textarea>
              </div>
              <p className="mt-3 text-sm/6 text-gray-600">Write 75 words about your shop.</p>
            </div>

            <div className="col-span-full">
              <label htmlFor="street-address" className="block text-sm/6 font-medium text-gray-900">Shop address</label>
              <div className="mt-2">
                <input type="text" name="ShopAddress" id="street-address" autoComplete="street-address" className="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6" onChange={handleWorkerInput} />
              </div>
              {error.ShopAddress && <span className='errormassDiv text-red-500 mb-6 -mt-8 w-[95%]'>{error.ShopAddress}</span>}
            </div>

            <div className="sm:col-span-2">
              <label htmlFor="shopcategory" className="block text-sm/6 font-medium text-gray-900">Shop/Worker Category</label>
              <div className="mt-2">
                <select id="shopcategory" name="ShopCategory" autoComplete="country-name" className="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm/6" onChange={handleWorkerInput} value={LocalWorkerFormData.ShopCategory}>
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
            </div>

            <div className="sm:col-span-2">
  <label className="block text-sm/6 font-medium text-gray-900">Area</label>
  <div className="mt-2 grid grid-cols-2 gap-2 text-sm text-gray-700">
    {[
      'Allapur', 'Bairahna', 'Civil Lines', 'Daraganj', 'George Town',
      'Jhunsi', 'Katra', 'Mama Bhanja', 'Naini', 'Tagore Town'
    ].map((area) => (
      <label key={area} className="flex items-center space-x-2">
        <input
          type="checkbox"
          value={area}
          checked={LocalWorkerFormData.Area.includes(area)}
          onChange={(e) => {
            const { value, checked } = e.target;
            setLocalWorkerFormData((prevData) => {
              const newAreas = checked ? [...prevData.Area, value] : prevData.Area.filter((item) => item !== value);
              return { ...prevData, Area: newAreas };
            });
          }}
          className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
        />
        <span>{area}</span>
      </label>
    ))}
  </div>
</div>


            <div className="sm:col-span-2">
              <label htmlFor="city" className="block text-sm/6 font-medium text-gray-900">City</label>
              <div className="mt-2">
                <select id="city" name="City" autoComplete="country-name" className="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm/6" onChange={handleWorkerInput} value={LocalWorkerFormData.City}>
                  <option>Prayagraj</option>
                </select>
              </div>
            </div>

            

            <div className='sm:col-span-6 mt-8'>
              <h2 className='text-2xl'>Owner Details</h2>
              <h2 className='block text-xs font-medium text-gray-500'>Pro Work will use these details for all business communications and updates</h2>
            </div>

            <div className="sm:col-span-2">
              <label htmlFor="fullName" className="block text-sm/6 font-medium text-gray-900">Full name</label>
              <div className="mt-2">
                <input type="text" name="FullName" id="fullName" autoComplete="family-name" className="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6" onChange={handleWorkerInput} />
              </div>
              {error.FullName && <span className='errormassDiv text-red-500 mb-6 -mt-8 w-[95%]'>{error.FullName}</span>}
            </div>

            <div className="sm:col-span-2">
              <label htmlFor="email" className="block text-sm/6 font-medium text-gray-900">Email address</label>
              <div className="mt-2">
                <input id="email" name="ShopEmail" type="email" autoComplete="email" className="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6" onChange={handleWorkerInput} />
              </div>
              {error.ShopEmail && <span className='errormassDiv text-red-500 mb-6 -mt-8 w-[95%]'>{error.ShopEmail}</span>}
            </div>

            <div className="sm:col-span-2">
              <label htmlFor="phoneNumber" className="block text-sm/6 font-medium text-gray-900">Phone Number</label>
              <div className="mt-2">
                <input type="number" name="ShopPhoneNumber" id="phoneNumber" autoComplete="family-name" className="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6" value={LocalWorkerFormData.ShopPhoneNumber}  onChange={handleWorkerInput} />
              </div>
              {error.ShopPhoneNumber && <span className='errormassDiv text-red-500 mb-6 -mt-8 w-[95%]'>{error.ShopPhoneNumber}</span>}
            </div>

            <div className="sm:col-span-full">
              <label htmlFor="ownerAadharCard" className="block text-sm/6 font-medium text-gray-900">Owner's Aadhar Card </label>
              <label htmlFor="last-name" className="block text-xs font-medium text-gray-500">Upload Front side of Aadhar</label>
              <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
              <div className="flex w-full md:w-auto flex-col items-center justify-center rounded-lg border-gray-900/25 px-6 py-10 my-2">
                  {ImagePreviews.AadharFront ? (
                    <img src={ImagePreviews.AadharFront} alt="Aadhar Card Preview" className="mb-4 h-24 w-24 object-cover" />
                  ) : (
                    <svg className="mx-auto size-12 text-gray-300" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" data-slot="icon">
                      <path fillRule="evenodd" d="M1.5 6a2.25 2.25 0 0 1 2.25-2.25h16.5A2.25 2.25 0 0 1 22.5 6v12a2.25 2.25 0 0 1-2.25 2.25H3.75A2.25 2.25 0 0 1 1.5 18V6ZM3 16.06V18c0 .414.336.75.75.75h16.5A.75.75 0 0 0 21 18v-1.94l-2.69-2.689a1.5 1.5 0 0 0-2.12 0l-.88.879.97.97a.75.75 0 1 1-1.06 1.06l-5.16-5.159a1.5 1.5 0 0 0-2.12 0L3 16.061Zm10.125-7.81a1.125 1.125 0 1 1 2.25 0 1.125 1.125 0 0 1-2.25 0Z" clipRule="evenodd" />
                    </svg>
                  )}
                  <div className="mt-4 flex text-sm/6 text-gray-600">
                    <label htmlFor="file-upload" className="flex items-center relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500">
                      <span>Upload a file</span>
                      <input id="file-upload" name="AadharFront" type="file" className="sr-only" onChange={handleWorkerFile} />
                    </label>
                    <p className="pl-1 pt-1 ml-1">or drag and drop</p>
                  </div>
                  <p className="text-xs/5 mt-1 text-gray-600">PNG, JPG up to 10MB</p>
                </div>
              </div>
              {error.AadharFront && <span className='errormassDiv text-red-500 mb-6 -mt-8 w-[95%]'>{error.AadharFront}</span>}

              <label htmlFor="last-name" className="block text-xs mt-8 font-medium text-gray-500">Upload Back side of Aadhar</label>
              <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
                <div className="flex w-full md:w-auto flex-col items-center justify-center rounded-lg border-gray-900/25 px-6 py-10 my-2">
                  {ImagePreviews.AadharBack ? (
                    <img src={ImagePreviews.AadharBack} alt="Aadhar Card Preview" className="mb-4 h-24 w-24 object-cover" />
                  ) : (
                    <svg className="mx-auto size-12 text-gray-300" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" data-slot="icon">
                      <path fillRule="evenodd" d="M1.5 6a2.25 2.25 0 0 1 2.25-2.25h16.5A2.25 2.25 0 0 1 22.5 6v12a2.25 2.25 0 0 1-2.25 2.25H3.75A2.25 2.25 0 0 1 1.5 18V6ZM3 16.06V18c0 .414.336.75.75.75h16.5A.75.75 0 0 0 21 18v-1.94l-2.69-2.689a1.5 1.5 0 0 0-2.12 0l-.88.879.97.97a.75.75 0 1 1-1.06 1.06l-5.16-5.159a1.5 1.5 0 0 0-2.12 0L3 16.061Zm10.125-7.81a1.125 1.125 0 1 1 2.25 0 1.125 1.125 0 0 1-2.25 0Z" clipRule="evenodd" />
                    </svg>
                  )}
                  <div className="mt-4 flex text-sm/6 text-gray-600">
                    <label htmlFor="file-upload1" className=" flex items-center relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500">
                      <span>Upload a file</span>
                      <input id="file-upload1" name="AadharBack" type="file" className="sr-only" onChange={handleWorkerFile} />
                    </label>
                    <p className="pl-1 pt-1 ml-1">or drag and drop</p>
                  </div>
                  <p className="text-xs/5 mt-1 text-gray-600">PNG, JPG up to 10MB</p>
                </div>
              </div>
              {error.AadharBack && <span className='errormassDiv text-red-500 mb-6 -mt-8 w-[95%]'>{error.AadharBack}</span>}
            </div>

            <div className="col-span-full">
              <label className="block text-sm/6 font-medium text-gray-900">Shop Photos</label>
              <div className="mt-2 flex flex-wrap md:justify-between lg:space-r-4">
                {['ShopPhoto1', 'ShopPhoto2', 'ShopPhoto3'].map((photoName, index) => (
                  <div key={index} className="flex w-full md:w-auto flex-col items-center justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10 my-2">
                    {ImagePreviews[photoName] ? (
                      <img src={ImagePreviews[photoName]} alt={`Preview ${photoName}`} className="mb-4 h-24 w-24 object-cover" />
                    ) : (
                      <svg className="mx-auto size-12 text-gray-300" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" data-slot="icon">
                        <path fillRule="evenodd" d="M1.5 6a2.25 2.25 0 0 1 2.25-2.25h16.5A2.25 2.25 0 0 1 22.5 6v12a2.25 2.25 0 0 1-2.25 2.25H3.75A2.25 2.25 0 0 1 1.5 18V6ZM3 16.06V18c0 .414.336.75.75.75h16.5A.75.75 0 0 0 21 18v-1.94l-2.69-2.689a1.5 1.5 0 0 0-2.12 0l-.88.879.97.97a.75.75 0 1 1-1.06 1.06l-5.16-5.159a1.5 1.5 0 0 0-2.12 0L3 16.061Zm10.125-7.81a1.125 1.125 0 1 1 2.25 0 1.125 1.125 0 0 1-2.25 0Z" clipRule="evenodd" />
                      </svg>
                    )}
                    <div className="mt-4 flex text-sm/6 text-gray-600">
                      <label htmlFor={photoName} className="flex items-center relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500">
                        <span>Upload a file</span>
                        <input id={photoName} name={photoName} type="file" className="sr-only" onChange={handleWorkerFile} />
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

        <div className="sticky bottom-0 bg-white border-t border-gray-200 px-8 py-4 flex justify-between items-center">
          <button type="button" className="text-sm/6 text-gray-900 rounded-md w-32 px-3 py-2  font-semibold  shadow-sm hover:text-red-500 hover:border hover:border-red-500" onClick={() =>{toggleWorkerForm(false), setLoadingState(false)}}>Cancel</button>
          <button onClick={handleWorkerSubmit} type="button" className="rounded-md w-32 bg-[#42DCB3] px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-[#3dc5a1] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#3dc5a1]">
            {loadingState ? <div className='flex justify-center items-center'> <img src={loadState} className='h-4' alt="" /> </div> : "Next"}
          </button>
        </div>
      </div>
    </form>

  )
}

export default WorkerForm

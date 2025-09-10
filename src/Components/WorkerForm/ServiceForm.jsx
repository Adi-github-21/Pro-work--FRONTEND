import { useState, useEffect, useContext } from 'react'
import {addservice_List} from '../../Assets/AddServiceList'
import {URL,  toastSuccess, toastFailure } from '../../func.jsx';
import next_icon from '../../Assets/next.png'
import { MyContext } from '../../ContextAPI';
import loadState from '../../Assets/loadingState.gif';
import WorkerInfo from '../../Utils/WorkerInfo.jsx';

import { toggleServiceForm } from './funcWorkerForm'


function ServiceForm() {
  const { loadingState, setLoadingState, UserData, WorkerFormData, setServiceFormData } = useContext(MyContext);
  const [AddServiceFormData, setAddServiceFormData] = useState({});

  const handleAddServiceFormInputChange = (e) => {
    const { name, value } = e.target;
    setAddServiceFormData((prev) => ({ ...prev, [name]: value }));
  };    

  if(!WorkerFormData.WorkerObjectID){ return <WorkerInfo />  }

  const handleAddServiceSubmit = async (e) => {
    e.preventDefault();
    console.log('Adding pricing Initiated');
    setLoadingState(true);

    const selectedItem = addservice_List.find(
      (item) => item.Category === WorkerFormData.ShopCategory
    );

    const UserObjectID = UserData.UserObjectID;
    const WorkerObjectID = WorkerFormData.WorkerObjectID;

    const FinalServiceFormData = {
      Category: selectedItem.Category,
      Services: selectedItem.Services.map((serviceGroup) => {
        const subServices = serviceGroup.SubServices.map((sub) => {
          const details = sub.Details.map((detailItem) => {
            const detailName = detailItem?.DetailsName || ""; 
            const detailKey = `price_${sub.Service}_${detailName}`;
            const price = AddServiceFormData[detailKey];

            return { Detail: detailName, Charge: price ? Number(price) : 0 };
          });

          return { Service: sub.Service, Details: details };
        });

        return { ServiceName: serviceGroup.ServiceName, SubServices: subServices };
      })
    };

    console.log("Final structured form data:", FinalServiceFormData);
const delay = new Promise(resolve => setTimeout(resolve, 5000)); 
    const apiCall = await fetch(`${URL}/worker/service`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, credentials: 'include', body: JSON.stringify({ FinalServiceFormData, UserObjectID, WorkerObjectID })});
try {
  const [serviceResponse] = await Promise.all([apiCall, delay]);
  toastSuccess("Service details created successfully");
        setLoadingState(false);
        toggleServiceForm(false);
        setServiceFormData({ isService: true });
} catch (error) {
  console.log("Error during service submission:", error);
  toastFailure("Network error. Please try again.");
  setLoadingState(false);
  return;
} finally {
    setLoadingState(false);
  }
    // if (serviceResponse.status === 201) {
    //   setTimeout(() => {
    //     toastSuccess("Service details created successfully");
    //     setLoadingState(false);
    //     toggleServiceForm(false);
    //     setServiceFormData({ isService: true });
    //   }, 800);
    // } else {
    //   const data = await serviceResponse.json();
    //   toastFailure(data?.message || "Something went wrong");
    //   setLoadingState(false);
    // }
  };

  const selectedCategory = addservice_List.find(
    (item) => item.Category === WorkerFormData.ShopCategory
  );

  return (

<form className='displayNone fixed inset-0 flex sm:pt-20 w-full h-[100vh] sm:h-[99vh] z-50 justify-center bg-black bg-opacity-50' id='ServiceDetailsForm'>

  <div className="w-screen md:w-[90%] h-full sm:rounded-3xl bg-white overflow-y-scroll pb-[70%] xs:p-0 shadow-shadow10px" id='CustomScroll'>

    {/* Header */}
    <div className='flex items-center h-12 w-full pl-4'>
      <img className='h-6 cursor-pointer rotate-180' src={next_icon} alt="back arrow" onClick={() => toggleServiceForm(false)} />
      <h3 className='text-md cursor-pointer' onClick={() => toggleServiceForm(false)}>Add Services & Prices</h3> 
    </div>

    {/* Form Fields */}
    <div className="border-b border-gray-900/10 pb-12 px-8">
      <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-8">

        {Array.isArray(selectedCategory?.Services) && selectedCategory.Services.map((serviceGroup, groupIdx) => (
          <div key={groupIdx} className="col-span-1 sm:col-span-8 flex flex-wrap">
            <h3 className="text-lg w-full font-semibold text-gray-800 mb-4">
              {groupIdx + 1}. {serviceGroup.ServiceName}
            </h3>

            {serviceGroup.SubServices.map((sub, subIdx) => (
              <div key={subIdx} className="mb-6 flex flex-wrap w-full">
                <h4 className="text-sm w-full font-medium text-indigo-700 mb-2">
                  {sub.Service}
                </h4>

                {sub.Details.map((detail, detailIdx) => (
                  <div key={detailIdx} className="mb-2 sm:mx-4 w-full sm:w-auto">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      {detail.DetailsName}
                    </label>
                    <input
                      type="number"
                      name={`price_${sub.Service}_${detail.DetailsName}`}
                      placeholder="Enter Price"
                      className="block w-full rounded-md border border-gray-300 px-3 py-2 text-sm shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                      onChange={handleAddServiceFormInputChange}
                    />
                  </div>
                ))}
              </div>
            ))}
          </div>
        ))}

      </div>
    </div>

    {/* Action Buttons */}
    <div className="sticky bottom-0 bg-white border-t border-gray-200 px-8 py-4 flex justify-between items-center">
      <button
        type="button"
        className="text-sm/6 text-gray-900 rounded-md w-32 px-3 py-2 font-semibold shadow-sm hover:text-red-500 hover:border hover:border-red-500"
        onClick={() => toggleServiceForm(false)}
      >
        Cancel
      </button>
      <button onClick={handleAddServiceSubmit} type="submit" disabled={loadingState} className={`rounded-md w-32 px-3 py-2 text-sm font-semibold text-white shadow-sm ${loadingState ? 'bg-gray-400 cursor-not-allowed' : 'bg-[#42DCB3] hover:bg-[#3dc5a1]'} focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#3dc5a1]`} >
        {loadingState ? <div className='flex justify-center items-center'><img src={loadState} className='h-4' alt="" /></div> : "Save Details"}
      </button>

    </div>

  </div>
</form>

  )
}

export default ServiceForm
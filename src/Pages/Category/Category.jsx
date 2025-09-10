import React, { useState, useContext, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { Link, Navigate, Outlet } from 'react-router-dom';
import axios from 'axios';
// Assets
import { service_List } from '../../Assets/serviceList';
// Component
// import DDropdown from '../../Components/DDropdown';
import ReviewStar from '../../Components/Category/ReviewStar';
// Functions
import { URL, toastFailure } from '../../func.jsx';

import { MyContext } from '../../ContextAPI';

function Category() {
  const { WorkerFormData } = useContext(MyContext);
  const [ViewWorkerData, setViewWorkerData] = useState();
  const [peopleBooked, setPeopleBooked] = useState(0);
  const [Delay, setDelay] = useState(false);
  const [SketetalDelay, setSketetalDelay] = useState(false);
  const [isWorkerFetched, setIsWorkerFetched] = useState(false); // Track if worker data has been fetched

  let CategoryURL = window.location.href;

  useEffect(() => {
    service_List.map(async (item, index) => {
      if (CategoryURL === item.URL) {
        try {
          const viewWorkerResponse = await axios.post(`${URL}/worker/register/category`, { ShopCategory: item.Category }, { withCredentials: true, headers: { 'Content-Type': 'multipart/form-data' } });
          if (viewWorkerResponse.status === 200) {
            setViewWorkerData(viewWorkerResponse.data);
            setIsWorkerFetched(true); // Data has been fetched successfully
          } else if(viewWorkerResponse.status === 204) {
            setIsWorkerFetched(true); // Mark as fetched even when no data is returned
          }
        } catch (error) {
          toastFailure('Failed to fetch worker data');
          setIsWorkerFetched(true); // Mark as fetched in case of error
        }
      }
    });
  }, []); 

  // Only log if no workers are registered and it's the first time checking
  useEffect(() => {
    if (isWorkerFetched && !ViewWorkerData) {
      setTimeout(() => {
        toastFailure('No shop is registered in this Category');
        setDelay(true);
      }, 3200);
    }
  }, [isWorkerFetched, ViewWorkerData]); // Trigger when the fetch is done and ViewWorkerData is still empty

  const categoryMeta = {
  Electrician: {
    description: "Hire professional electricians in Prayagraj from ProWork. Affordable rates, verified experts, quick repair & installation services.",
    canonical: "https://prowork.org.in/services/electrician"
  },
  Plumber: {
    description: "Book experienced plumbers in Prayagraj for leak repairs, fittings, installations & maintenance. Trusted & verified only at ProWork.",
    canonical: "https://prowork.org.in/services/plumber"
  },
  Beautician: {
    description: "Get the best at-home beauty services in Prayagraj. Bridal makeup, facials, waxing, and more by verified beauticians on ProWork.",
    canonical: "https://prowork.org.in/services/beautician"
  },
  Priest: {
    description: "Book certified Pandit/Priests in Prayagraj for pujas, havan, marriage & religious rituals. Reliable & easy booking via ProWork.",
    canonical: "https://prowork.org.in/services/priest"
  }
};

  const category = WorkerFormData.ShopCategory;
  const meta = categoryMeta[category] || {};

  if (!ViewWorkerData) {
    return (
      <div className='h-screen w-screen flex flex-wrap pt-20 px-4 pb-8'>
        <Helmet>
          <title>Pro Work - -----</title>
          {meta.description && <meta name="description" content={meta.description} /> }
          {meta.canonical && <link rel="canonical" href={meta.canonical} />}
        </Helmet>
        <div className="w-full">
          <Breadcrumb />
          <NoDataFallback SketetalDelay={SketetalDelay} />
        </div>
      </div>
    );
  }

  setTimeout(() => setSketetalDelay(true), 3000);

  
  return (
    <div className='flex flex-wrap pt-20 px-4 pb-8 w-screen'>
      <Helmet>
        <title>Pro Work - {category}</title>
        {meta.description && <meta name="description" content={meta.description} /> }
        {meta.canonical && <link rel="canonical" href={meta.canonical} /> }
      </Helmet>

      {service_List.map((item, index) => {
        if (CategoryURL === item.URL) {
          return (
            <div className="w-screen flex flex-wrap pt-4" key={index}>
              <Breadcrumb category={item.Category} />

              <div className='flex flex-wrap w-full mt-8 overflow-auto'>
                {ViewWorkerData.length > 0 ? (
                  ViewWorkerData.map((worker, index) => {
                    return (
                    <div className="bg-[#33806b] cursor-pointer group flex justify-between rounded-lg shadow-md transition hover:shadow-lg my-4 sm:mx-4" key={index}>
                      <p className="p-4 flex flex-wrap w-[280px]"> 
                        <span className="w-full text-md text-white ">
                         {worker.ShopName.length > 10 ? worker.ShopName.substring(0, 18) + '' : worker.ShopName}
                        </span>
                        <span className="w-full text-sm text-white">
                          Area: {worker.Area.slice(0, 2).join(', ')} {worker.Area.length > 2 ? '...' : ''}
                        </span>
                        <Link to={`/services/${worker.ShopCategory.toLowerCase()}/${worker._id}`}  className="w-auto text-center px-4 py-2 mt-2 text-xs text-[#33806b] bg-white font-semibold border-2 border-[#33806b] rounded-lg hover:bg-[#f9f9f9] transition">View Profile</Link>
                      </p>
                      <div className="bg-gray-300 flex items-center justify-center rounded-r-lg">
                        <img src={worker.ShopPhoto1} alt="" className="w-40 h-20 sm:w-44 sm:h-24 transition" />
                      </div>
                    </div>
                  )})
                ) : (
                  <div className='flex h-[80%] pl-4 pr-4 md:pr-48 flex-wrap w-full bg-gray-100 py-4'>
                    {SketetalDelay ?
                      <h1 className="w-full text-center text-xl ">No Worker found in this Area</h1>
                      :
                      <NoDataFallback SketetalDelay={SketetalDelay} />
                    }
                  </div>
                )}
              </div>
            </div>
          );
        }
      })}
     
    </div>
  );
}

const Breadcrumb = ({ category }) => (
  <h1 className="w-full text-start text-xs sm:text-lg text-gray-500 px-4">
    <Link to="/"><span className="hover:text-green-800">Home</span> / </Link>
    <Link to="/services"><span className="hover:text-green-800">Services</span> / </Link>
    <span className="text-[#33826b]">{category}</span>
  </h1>
);


const NoDataFallback = ({ SketetalDelay }) => (
  <div className="flex h-[80%] pl-4 pr-4 md:pr-48 flex-wrap w-full bg-gray-100 py-4">
    {SketetalDelay ? (
      <h1 className="w-full text-center text-xl">No Worker found in this Area</h1>
    ) : (
      <div className="flex w-full h-[80%] overflow-hidden bg-white rounded-lg shadow-lg animate-pulse">
        <div className="w-1/3 bg-gray-300"></div>
        <div className="w-2/3 p-4">
          <div className="w-40 h-2 bg-gray-200 rounded-lg mb-4"></div>
          <div className="w-48 h-2 bg-gray-200 rounded-lg mb-4"></div>
          <div className="flex gap-x-2 mb-4">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="w-5 h-2 bg-gray-200 rounded-lg"></div>
            ))}
          </div>
          <div className="flex justify-between items-center">
            <div className="w-10 h-2 bg-gray-200 rounded-lg"></div>
            <div className="h-4 bg-gray-200 rounded-lg w-28"></div>
          </div>
        </div>
      </div>
    )}
  </div>
);


export default Category;

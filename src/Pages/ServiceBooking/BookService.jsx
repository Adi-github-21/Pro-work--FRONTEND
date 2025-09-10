


import React, { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { Helmet } from 'react-helmet';


import WorkerInfo from '../../Utils/WorkerInfo';
import ShopHeader from '../../Components/Category/ShopHeader';
import FinalBookingCard from '../../Components/Category/FinalBookingCard';

import { addservice_List } from '../../Assets/AddServiceList';

import { MyContext } from '../../ContextAPI';

function BookService() {
  const { OneWorker, OneWorkerService, setSelectedService } = useContext(MyContext);
  const { id } = useParams();

  const [openIndex, setOpenIndex] = useState(null); // Track which service is open

  useEffect(() => {
    if (
      OneWorkerService?.Services?.[0]?.ServiceName &&
      OneWorkerService?.Services?.[0]?.SubServices?.[0]?.Details?.[0]
    ) {
      const firstService = OneWorkerService.Services[0];
      const firstSubService = firstService.SubServices[0];
      const firstDetail = firstSubService.Details[0];

      handleServiceClick({
        parent: firstService.ServiceName,
        service: firstSubService.Service,
        detail: firstDetail.Detail,
        charge: firstDetail.Charge,
        overcharge: firstDetail.OverCharge,
      });
    }
  }, [OneWorkerService]); // Empty dependency array = run once on mount


  if (!OneWorker || OneWorker._id !== id) {
    return (
      <div className="flex justify-center items-center h-screen">
        <WorkerInfo id={id} />
        Loading...
      </div>
    );
  }

  if (!OneWorkerService || OneWorkerService.WorkerObjectID !== id) {
    return (
      <div className="flex justify-center items-center h-screen">
        <WorkerInfo id={id} />
        Loading...
      </div>
    );
  }
   

  function handleServiceClick(serviceObj, event) {
    const services = document.querySelectorAll('#bookingblure #blook');
    if (services){
    services.forEach(service => {
      service.classList.remove('border-[#f2da1d]');
      service.classList.add('border-[#33826b]');
    });
    }
    if (event) {
      event.target.classList.remove('border-[#33826b]');
      event.target.classList.add('border-[#f2da1d]');
    }
    setSelectedService(serviceObj);
  }

  

  const toggleAccordion = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

 

  return (
    <div>
      <Helmet><title>Pro Work - Shop / Worker</title></Helmet>
      <ShopHeader />

      <div className='w-full flex justify-center mb-8'>
        <div className='grid grid-cols-4 gap-4 w-95 px-4'>

          {/* Left Sidebar with Services */}
          <div className="row-span-2 col-span-4 lg:col-span-1 border-2 py-2 sm:px-4 px-2 border-[#f2da1d] bg-white rounded-lg shadow-md" id="bookingblure">
            {OneWorkerService?.Services?.map((service, sIdx) => {
              const isOpen = openIndex === sIdx;

              // Service has SubServices
              if (service.SubServices) {
                return (
                  <div key={sIdx} className="mb-4 border-2 border-[#33826b] rounded-lg overflow-hidden">
                    {/* Accordion Header */}
                    <button onClick={() => toggleAccordion(sIdx)} className="w-full text-left px-4 py-3 font-semibold text-white bg-[#33826b] hover:bg-[#286a57] transition">
                      {service.ServiceName}
                    </button>

                    {/* Accordion Body */}
                    {isOpen && (
                    <div className="px-4 py-3 bg-white flex flex-wrap">
                      {service.SubServices.map((sub, subIdx) => {
                        if (sub.Details) {
                          return sub.Details.map((detail, dIdx) => (
                            <div key={`${subIdx}-${dIdx}`} className="m-2 cursor-pointer"
                              onClick={(e) => handleServiceClick( { 
                                parent: service.ServiceName, 
                                service: service.SubServices[subIdx].Service, 
                                detail: detail.Detail, 
                                charge: detail.Charge, 
                                overcharge: detail.OverCharge }, e) }
                            >
                              <div className="h-[60px] w-[60px] transition-all">
                                {(() => {
                                  let matchedImage = null;

                                  addservice_List.forEach((category) => {
                                    if (category.Category !== OneWorker.ShopCategory) return;
                                  
                                    category.Services.forEach((serviceItem) => {
                                      serviceItem.SubServices.forEach((subService) => {
                                        subService.Details.forEach((detailItem) => {
                                          if (detailItem.DetailsName === detail.Detail) {
                                            matchedImage = detailItem.DetailsImage1;
                                          }
                                        });
                                      });
                                    });
                                  });

                                  return (
                                    <img src={matchedImage || Split_AC} alt={detail.Detail} className="h-full w-full object-cover rounded border-2 border-[#33826b] hover:scale-110" id="blook"/>
                                  );
                                })()}
                              </div>
                            </div>

                      ));
                    } else {
                      return (
                        <h3
                          key={subIdx}
                          className="text-sm py-1 px-2 text-gray-600 hover:text-[#33826b] cursor-pointer"
                          onClick={(e) =>
                            handleServiceClick(
                              {
                                parent: service.ServiceName,
                                service: sub.Service,
                                charge: sub.Charge,
                                overcharge: sub.OverCharge,
                              },
                              e
                            )
                          }
                        >
                          {sub.Service}
                        </h3>
                      );
                    }
                  })}
                </div>
              )}
            </div>
          );
        }

        // Flat Service
        return (
          <h3
            key={sIdx}
            className={`text-sm py-2 pl-2 ${
              sIdx === 0 ? 'text-[#33826b] text-[1.1rem] my-[2px]' : 'text-gray-500'
            } cursor-pointer hover:text-[#33826b] hover:text-[1.1rem] hover:my-[2px]`}
            onClick={(e) =>
              handleServiceClick(
                {
                  service: service.ServiceName,
                  charge: service.Charge,
                  overcharge: service.OverCharge,
                },
                e
              )
            }
          >
            {service.ServiceName}
          </h3>
        );
      })}
    </div>

         <div className='row-span-2 col-span-4 lg:col-span-3'>

          <FinalBookingCard Category={OneWorker.ShopCategory} />
         </div>
         

        </div>
      </div>
    </div>
  );
}

export default BookService;

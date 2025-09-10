// Package
import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { Helmet } from 'react-helmet'
// Assets
import { service_List } from '../../Assets/serviceList'

import { MyContext } from '../../ContextAPI'
function Service() {
  const { setServiceCategory, CategoryCount } = useContext(MyContext);

  return (
    

    <div className='flex flex-col pt-20 w-screen mt-8 bg-gray-50'>
  <Helmet><title>Pro Work - Services</title></Helmet>
  
  {/* Header Section */}
  <div className="w-full max-w-[1250px] mx-auto px-4 xl:px-0 mb-8">
    <h1 className='text-4xl md:text-5xl lg:text-6xl mb-4 font-bold text-[#33806b]'>
      Services
    </h1>
    <p className='text-sm md:text-base lg:text-lg text-gray-700'>
      All the workers here are skilled and they have years of experience in their field, so you can trust them for your work.
    </p>
  </div>

  {/* Service Cards Section */}
  <div className="w-full max-w-[1250px] mx-auto px-4 xl:px-0 pb-4">
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
      {service_List.map((item, index) => {
        return (
          <div
            className="rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 flex flex-col bg-white border border-gray-200 hover:border-green-600"
            key={index}
          >
            {/* Image Section */}
            <div className="relative group">
              <Link
                to={item.URL}
                onClick={() => {
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                  setServiceCategory('ServiceCategory', item.Category, { maxAge: 3600 * 2 });
                }}
              >
                <img
                  className="w-full h-48 md:h-56 object-cover"
                  src={item.image}
                  alt={`${item.Category} Service`}
                />
                <div className="absolute inset-0 bg-black opacity-30 group-hover:opacity-10 transition duration-300"></div>
              </Link>
            </div>

            {/* Text Description Section */}
            <div className="px-4 sm:px-6 py-4 mb-auto">
              <Link
                to={item.URL}
                onClick={() => {
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                  setServiceCategory('ServiceCategory', item.Category, { maxAge: 3600 * 2 });
                }}
                className="font-semibold text-lg md:text-xl inline-block text-[#1F4A42] hover:text-[#14532d] transition duration-300 mb-2"
              >
                {item.Category}
              </Link>
              <p className="text-gray-600 text-sm md:text-base">{item.CategoryDescription}</p>
            </div>

            {/* Category Worker Count */}
            <div className="px-4 sm:px-6 py-3 flex flex-row items-center justify-between bg-gray-50 border-t border-gray-200">
              <span className="py-1 text-xs md:text-sm font-medium text-gray-900 flex flex-row items-center">
                <span className="ml-1">
                  {/* Category count rendering based on item.Category */}
                  {item.Category === 'Beautician' && <div className="text-sm text-[#1F4A42]">{CategoryCount.TotalBeautician} {item.TotalWorkers}</div>}
                  {item.Category === 'Carpenter' && <div className="text-sm text-[#1F4A42]">{CategoryCount.TotalCarpenter} {item.TotalWorkers}</div>}
                  {item.Category === 'Electrician' && <div className="text-sm text-[#1F4A42]">{CategoryCount.TotalElectrician} {item.TotalWorkers}</div>}
                  {item.Category === 'Househelp' && <div className="text-sm text-[#1F4A42]">{CategoryCount.TotalHousehelp} {item.TotalWorkers}</div>}
                  {item.Category === 'Painter' && <div className="text-sm text-[#1F4A42]">{CategoryCount.TotalPainter} {item.TotalWorkers}</div>}
                  {item.Category === 'Plumber' && <div className="text-sm text-[#1F4A42]">{CategoryCount.TotalPlumber} {item.TotalWorkers}</div>}
                  {item.Category === 'Priest' && <div className="text-sm text-[#1F4A42]">{CategoryCount.TotalPriest} {item.TotalWorkers}</div>}
                  {item.Category === 'Tutor' && <div className="text-sm text-[#1F4A42]">{CategoryCount.TotalTutor} {item.TotalWorkers}</div>}
                </span>
              </span>
            </div>
          </div>
        );
      })}
    </div>
  </div>
</div>



  )
}

export default Service

import React, { useState, useEffect, useContext, useRef } from 'react'
import { Link, useParams, useLocation } from 'react-router-dom'

import ReviewStar from './ReviewStar'
import { MyContext } from '../../ContextAPI'
import Next from '../../Assets/next_W.png'


function ShopHeader() {

  const { id } = useParams();
  const { OneWorker } = useContext(MyContext);
  const [activeLink, setActiveLink] = useState('');
  const location = useLocation();
  const scrollRef = useRef(null);
  
  useEffect(() => {
    if (location.pathname.includes('overview')) { setActiveLink('overview') } 
    else if (location.pathname.includes('reviews')) { setActiveLink('reviews') }
    else if (location.pathname.includes("")) { setActiveLink('book') } 
  
  }, [location]);

  const scrollRight = () => {
    if (scrollRef.current) {
      const slideWidth = scrollRef.current.firstChild.offsetWidth;
      scrollRef.current.scrollBy({
        left: slideWidth + 16,
        behavior: 'smooth',
      });
    }
  };

  const scrollLeft = () => {
    if (scrollRef.current) {
      const slideWidth = scrollRef.current.firstChild.offsetWidth;
      scrollRef.current.scrollBy({
        left: slideWidth + -16,
        behavior: 'smooth',
      });
    }
  };
 
  return (
    <div className='flex flex-wrap pt-20 pb-8 w-screen' >
      
      <div className="w-full px-4  pt-4" >
        <h1 className='w-full text-xs sm:text-lg text-gray-500'>
          <Link to='/'><span className='hover:text-green-800'>Home</span> / </Link>
          <Link to='/services'><span className='hover:text-green-800'>Services</span> / </Link>    
          <Link to={`/services/${OneWorker.ShopCategory.toLowerCase()}`}><span className='hover:text-green-800'>Category</span> / </Link>    
          <span className='text-[#33826b]'>Shop</span>
        </h1>
      </div>

      <div className='w-full flex flex-wrap justify-between items-center pt-6  '>

        <h2 className='text-2xl md:text-3xl px-4 text-[#33826b] mb-2'>{OneWorker.ShopName}</h2>
        <div className='sm:pr-4 md:pr-6 px-4'><ReviewStar/></div>

        {/* Image */}
        <div className="w-full px-4 mt-6">
          {/* Mobile Carousel */}
          <div ref={scrollRef} className="md:hidden flex overflow-x-auto space-x-4" id="Frame">
            {[OneWorker.ShopPhoto1, OneWorker.ShopPhoto2, OneWorker.ShopPhoto3].map((photo, idx) => (
              <div key={idx} className="relative min-w-[100%] h-60 rounded-lg overflow-hidden flex-shrink-0">
                <img src={photo} alt={`Shop ${idx + 1}`} className="w-full h-full object-cover" />

                {/* Scroll Right */}
                <button onClick={scrollRight} className="absolute bottom-[45%] right-2 bg-black bg-opacity-50 p-2 rounded-full z-10">
                  <img src={Next} alt="Next" className="h-3" />
                </button>

                {/* Scroll Left */}
                <button onClick={scrollLeft} className="absolute bottom-[45%] left-2 rotate-180 bg-black bg-opacity-50 p-2 rounded-full z-10">
                  <img src={Next} alt="Prev" className="h-3" />
                </button>
              </div>
            ))}
          </div>


          {/* Desktop Grid */}
          <div className="hidden md:grid grid-cols-3 grid-rows-2 gap-4 md:h-[400px]">
            <div className="row-span-2 col-span-2 overflow-hidden rounded-lg">
              <img src={OneWorker.ShopPhoto1} alt="" className="w-full h-full object-cover" />
            </div>
            <div className="overflow-hidden rounded-lg">
              <img src={OneWorker.ShopPhoto2} alt="" className="w-full h-full object-cover" />
            </div>
            <div className="overflow-hidden rounded-lg">
              <img src={OneWorker.ShopPhoto3} alt="" className="w-full h-full object-cover" />
            </div>
          </div>
        </div>

        {/* Overview, Book Service, Review */}
        <div className='w-full flex justify-center'>
          <div className='w-full sm:w-95 flex border-b-2 border-gray-300'>
            <Link to={`/services/${OneWorker.ShopCategory.toLowerCase()}/${id}/overview`} className={`mt-4 text-gray-400 hover:text-green-800 cursor-pointer hover:border-b-2 border-green-800 hover:py-[1px] p-2 px-2 sm:px-6 mr-2 ${activeLink === 'overview' ? 'text-green-800 border-b-2 border-green-800 py-[1px]' : ''}`} onClick={() => setActiveLink('overview')}>
              Overview
            </Link>
            <Link to={`/services/${OneWorker.ShopCategory.toLowerCase()}/${id}`} className={`mt-4 text-gray-400 hover:text-green-800 cursor-pointer hover:border-b-2 border-green-800 hover:py-[1px] p-2 px-2 active:text-green-800 sm:px-6 mx-1 ${activeLink === 'book' ? 'text-green-800 border-b-2 border-green-800 py-[1px]' : ''}`} onClick={() => setActiveLink('book')}>
              Book Service
            </Link>
            <Link to={`/services/${OneWorker.ShopCategory.toLowerCase()}/${id}/reviews`} className={`mt-4 text-gray-400 hover:text-green-800 cursor-pointer hover:border-b-2 border-green-800 hover:py-[1px] p-2 px-2 sm:px-6 ml-2 ${activeLink === 'reviews' ? 'text-green-800 border-b-2 border-green-800 py-[1px]' : ''}`} onClick={() => setActiveLink('reviews')}>
              Reviews
            </Link>
          </div>
        </div>

      </div>
    </div>
  )
}

export default ShopHeader



import React, { useContext } from 'react'
import ShopHeader from '../../Components/Category/ShopHeader'
import { Helmet } from 'react-helmet'
import { MyContext } from '../../ContextAPI';
import { useParams } from 'react-router-dom';
import WorkerInfo from '../../Utils/WorkerInfo';

function Overview() {

  const { OneWorker } = useContext(MyContext);
  const { id } = useParams();

  const currentUrl = window.location.href;

  // Share via native share API (mobile)
  const shareViaNative = () => {
    if (navigator.share) {
      navigator.share({
        title: document.title, // Page title
        url: currentUrl, // Page URL
      })
      .then(() => console.log('Successfully shared'))
      .catch((error) => console.error('Error sharing', error));
    } else {
      alert('Sharing is not supported on this device.');
    }
  };

  if (!OneWorker || OneWorker._id !== id) {
    return ( 
      <div className="flex justify-center items-center h-screen">
        <WorkerInfo id={id} />
        Loading...
      </div> 
    )
  }

  return (
    <div className='w-screen flex flex-wrap justify-center md:justify-start'>
      <Helmet><title>Pro Work - Shop / Worker</title></Helmet>
      <ShopHeader/>
      

      <div className="w-[95%] max-w-4xl mx-4 px-4 py-6 mb-10 bg-white rounded-lg shadow-md">
  {/* Area Info */}
  <div className="mb-6">
    <p className="text-base text-gray-700 break-words">
      <span className="font-semibold text-[#33826b]">Area:</span> {OneWorker.Area.slice().join(', ')}
    </p>
  </div>

  {/* Description */}
  <div className="mb-6">
    <h4 className="text-2xl font-bold text-[#33826b] mb-2">Description</h4>
    <p className="text-gray-800 text-base break-words">{OneWorker.ShopDescription}</p>
  </div>

  {/* Share Button */}
  <div className="text-right">
    <button
      className="mt-4 px-6 py-2 rounded-lg text-white bg-[#33826b] hover:bg-[#286a57] border-2 border-[#33826b] hover:border-black transition-all duration-200"
      onClick={shareViaNative}
    >
      Share
    </button>
  </div>
</div>

    </div>
  )
}

export default Overview
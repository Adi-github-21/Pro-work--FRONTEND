import React, {useState} from 'react'
import { Link } from 'react-router-dom'
import { Helmet } from 'react-helmet'
import ExploreForm from '../../Components/ExploreForm/ExploreForm'

function Explore() {
  const[showForm, setShowForm] = useState(false)
  const[modalContent, setModalContent]  = useState(null) 
  const [modalData, setModalData]  = useState({ heading: '', text: '' })
  const [events, setEvents] = useState([])
  
  //static box
  const ideaText = `The idea of ProWork first sparked in the minds of our founders during their college days. With passion and persistence, they spent a year shaping that vision—turning a simple idea into a powerful business plan through careful planning and flawless execution.`
  const startingText = `On January 1st, 2025, we proudly launched our ProWork website. It's a moment of celebration, filled with joy and excitement. As we stand at the beginning of this journey, we have a clear vision for the future and a well-defined plan to execute, ensuring we continue to grow and serve with excellence.`
  
  //Add event handler
  const handleAddEvent = (event) => {
    setEvents(prev => [...prev, event])
    setShowForm(false)
  }

  //Modal data helper
  const getModalData = () => modalData

  //open modal for static and dynamic
  const openModal = (heading, text, image = null, color= '' ) => {
    setModalData({ heading, text, image, color })
    setModalContent(true)
  }

  // Modal color classes
  const getModalColorClasses = () => {
    if (modalData.color === 'idea') {
      return 'bg-[#f2da1d] text-[#1f2937]'
    }
    if (modalData.color === 'starting') {
      return 'bg-[#33806b] text-white '
    }
    if (modalData.color && modalData.color.startsWith('event')) {
      // Alternate event colors based on index
      const idx = parseInt(modalData.color.replace('event', ''), 10)
      return idx % 2 === 0
        ? 'bg-[#f2da1d] text-[#1f2937]'
        : 'bg-[#33806b] text-white'
    }
    return 'bg-white text-gray-800'
  }

  return (
    <div className='flex flex-col pt-20 w-screen mt-8'>
      <Helmet>
        <title>Pro Work - Explore</title>
          <meta
            name="description"
            content="Explore all the home and personal services offered by ProWork in Prayagraj. Verified professionals, fair pricing, quick booking."
          />
          <link rel="canonical" href="https://prowork.org.in/explore" />
        </Helmet>
      <div className="w-full max-w-[1250px] mx-auto px-4 xl:px-0">
        <div className="mb-8">
          <h1 className='text-3xl md:text-4xl lg:text-5xl mb-4 font-bold text-[#33806b]'>Explore</h1>
           <button
            onClick={() => setShowForm(true)}
            className="bg-[#33806b] text-white px-4 py-2 rounded-lg font-semibold hover:bg-[#24604e] transition"
          >
            Add Event
          </button>
          <p className='text-sm md:text-base lg:text-lg text-gray-700 leading-relaxed'>
            We are here to provide you with the best work at the most affordable price with just one click. No hassle of walking out and finding the right person for your work, because we have already done that for you. At ProWork, we employ experienced workers to solve your daily problems.
          </p>
        </div>

      {/* Add Event Modal */}
        {showForm && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
            <div className="bg-white rounded-xl shadow-lg p-6 w-full max-w-md relative">
              <button
                className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 text-xl"
                onClick={() => setShowForm(false)}
              >
                &times;
              </button>
              <ExploreForm
                onClose={() => setShowForm(false)}
                onAddEvent={handleAddEvent} // <-- Pass this prop!
              />
            </div>
          </div>
        )}  

      {/* Idea/Starting popup window   */}
      {modalContent && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
          <div className={`rounded-xl shadow-lg p-8 w-full max-w-3xl h-[85vh] relative flex flex-col ${getModalColorClasses()}`}>
           <button
            className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 text-xl"
            onClick={() => setModalContent(null)}
          >
          &times;
          </button>
          <h2 className="text-3xl font-bold mb-4">{getModalData().heading}</h2>
          {/* Show image if present */}
          {getModalData().image && (
            <img
              src={typeof getModalData().image === 'string' ? getModalData().image : URL.createObjectURL(getModalData().image)}
              alt="Event"
              className="mb-4 rounded-lg max-h-60 object-cover mx-auto"
            />
          )}
          <div
            id="CustomScroll"
            className="flex-1 overflow-y-auto pr-4"
          >
            <p className="text-base md:text-lg lg:text-xl leading-relaxed">
              {getModalData().text}
            </p>
          </div>
        </div>
      </div>
     )}

        
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 mb-8">
          {/* Idea Box */}
         <div className="bg-[#f2da1d] border-2 border-[#33806b] rounded-xl lg:rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 h-74 flex flex-col">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#1f2937] mb-6 md:mb-8">Idea</h2>
            <p className="text-base md:text-lg lg:text-xl text-[#1f2937] leading-relaxed mb-4 line-clamp-4 max-h-28 overflow-hidden flex-1">
              {ideaText}
            </p>
            <button
              className="inline-block text-right w-full hover:text-[#33806b] transition-colors duration-300 text-lg md:text-xl lg:text-2xl font-semibold hover:underline"
              onClick={() => openModal('Idea', ideaText, null, 'idea')}
            >
              Read more
            </button>
          </div>

          {/* Starting Box */}
           <div className="bg-[#33806b] border-2 border-[#f2da1d] rounded-xl lg:rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 h-74 flex flex-col">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6 md:mb-8">Starting</h2>
            <p className="text-base md:text-lg lg:text-xl text-white leading-relaxed mb-4 line-clamp-4 max-h-28 overflow-hidden flex-1">
              {startingText}
            </p>
            <button
              className="inline-block text-right w-full hover:text-[#f2da1d] transition-colors duration-300 text-lg md:text-xl lg:text-2xl font-semibold hover:underline"
              onClick={() => openModal('Starting', startingText, null, 'starting')}
            >
              Read more
            </button>
          </div>

          {/* Dynamic Event Boxes */}
           {events.map((event, idx) => (
            <div
              key={idx}
              className={`border-2 rounded-xl lg:rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 flex flex-col h-auto
                ${idx % 2 === 0 ? 'bg-[#f2da1d] border-[#33806b]' : 'bg-[#33806b] border-[#f2da1d]'}
              `}
            >
              <h2 className={`text-3xl md:text-4xl lg:text-5xl font-bold mb-6 md:mb-8 ${idx % 2 === 0 ? 'text-[#1f2937]' : 'text-white'}`}>
                {event.eventName}
              </h2>
              <p className={`text-base md:text-lg lg:text-xl leading-relaxed mb-4 line-clamp-4 max-h-28 overflow-hidden flex-1 ${idx % 2 === 0 ? 'text-[#1f2937]' : 'text-white'}`}>
                {event.eventDescription}
              </p>
              <button
                className={`inline-block text-right w-full transition-colors duration-300 text-lg md:text-xl lg:text-2xl font-semibold hover:underline ${idx % 2 === 0 ? 'hover:text-[#33806b]' : 'hover:text-[#f2da1d]'}`}
                onClick={() => openModal(event.eventName, event.eventDescription, event.eventImage, `event${idx}`)}
              >
                Read more
              </button>
              <div className="mt-2 text-sm">
                <span className={idx % 2 === 0 ? "text-[#1f2937]" : "text-white"}>
                  {event.eventDate}
                </span>
              </div>
            </div>
          ))}
     </div>
  </div>
 </div>
  )
}

export default Explore
import React, { useContext } from 'react'
import { MyContext } from '../../ContextAPI'
import WorkerInfo from '../../Utils/WorkerInfo'
import { useParams } from 'react-router-dom';

function ReviewUserCard() {

    const { id } = useParams();
  const { ReviewFormData } = useContext(MyContext);

  if (!ReviewFormData) {
    return ( 
      <div className="flex justify-center items-center h-full">
        <WorkerInfo id={id} />
        <div>
          <h2>Be the first to write the review</h2>
        </div>
      </div> 
    )
  }

  return (
    <>
      {ReviewFormData.map((item, index) => {
       return ( 
        <div className='my-6 border-b border-black pb-2' key={index}>
          <div className="flex items-start">
            <div className="ml-6">

              <p className="flex items-baseline">
                <span className="text-gray-600 font-bold">{item.UserObjectID}</span>
                <span className="ml-2 text-green-600 text-xs">Verified Profile</span>
              </p>  
  
            <div className="flex items-center mt-2">
              <span>{ReviewFormData.StarRating}</span>
             { [...Array(item.StarRating)].map((e, i) => {
              return(
                <svg className="w-4 h-4 fill-current text-yellow-600" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z"/></svg>
              )
             })}
              
            </div>
      
            <div className="my-3">
              <p className="mt-1">{item.TextReview}</p> 
            </div>
          
        
            <div className="flex items-center">
              <span>Was this review helplful?</span>
              <button className="flex items-center ml-6" >
                <svg className="w-3 h-3" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M11 0h1v3l3 7v8a2 2 0 0 1-2 2H5c-1.1 0-2.31-.84-2.7-1.88L0 12v-2a2 2 0 0 1 2-2h7V2a2 2 0 0 1 2-2zm6 10h3v10h-3V10z"/></svg>
                <span className="ml-2"></span>
              </button>
              <button className="flex items-center ml-4" >
                <svg className="w-3 h-3" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M11 20a2 2 0 0 1-2-2v-6H2a2 2 0 0 1-2-2V8l2.3-6.12A3.11 3.11 0 0 1 5 0h8a2 2 0 0 1 2 2v8l-3 7v3h-1zm6-10V0h3v10h-3z"/></svg>
                <span className="ml-2"></span>
              </button>
            </div>  
  
          </div>
        </div>
      </div>
        )
      })}
      
    </>
  )
}

export default ReviewUserCard
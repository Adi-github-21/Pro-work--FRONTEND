import React, { useState, useContext, useEffect } from 'react'
import { toastFailure, toastSuccess } from '../../func.jsx';

import { URL } from '../../func.jsx'

import { MyContext } from '../../ContextAPI'

function ReviewForm() {

  const { UserData, OneWorker, SessionID } = useContext(MyContext);
  const [LocalReviewFormData, setLocalReviewFormData] = useState({ StarRating: 0, TextReview: ''})

  const [StarRating, setStarRating] = useState(0); 

  useEffect(() => {
    const stars = document.querySelectorAll('#rating svg');
    const ratingText = document.getElementById('rating-text');

    stars.forEach((star, index) => {
      star.addEventListener('click', () => {
        const rating = index + 1; 
        setStarRating(rating); 
        updateStars(rating);
      });
    });

    function updateStars(rating) {
      stars.forEach((star, i) => {
        if (i < rating) {
          star.classList.add('text-yellow-400');
        } else {
          star.classList.remove('text-yellow-400');
        }
      });
      // updating the star rating value
      handleReviewInputChange({ target: { name: 'StarRating', value: rating } });
      ratingText.innerHTML = `Rating: ${rating} star${rating > 1 ? 's' : ''}`;
    }

    
    // Clean up event listeners when the component unmounts or changes
    return () => {
      stars.forEach((star) => {
        star.removeEventListener('click', () => {});
      });
    };
  }, []);

  useEffect(() => { /*console.log('Selected rating:', selectedRating) */}, [StarRating]);
	

  const handleReviewInputChange = (e) => {
    const { name, value } = e.target;
    setLocalReviewFormData({ ...LocalReviewFormData, [name]: value });
  };


  const handleReviewSubmit = async (e) => {
    if(SessionID.SessionID == undefined){ toastFailure('Login First'); setTimeout(() => { showSignUpForm() }, 800) }
    e.preventDefault();
    const resultDiv = document.getElementById('result');
    const submittedRatingText = document.getElementById('submitted-rating');
    if (StarRating > 0) {
      resultDiv.classList.remove('hidden');
      submittedRatingText.textContent = StarRating;
    } else {
     alert('Please select a rating');
    }
    console.log(LocalReviewFormData)

    const UserObjectID = UserData.UserObjectID
    const WorkerObjectID = OneWorker._id;

    const reviewResponse = await fetch(`${URL}/worker/review`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, credentials: 'include', body: JSON.stringify({ LocalReviewFormData, UserObjectID, WorkerObjectID }) });
    if(reviewResponse.status == 201){
      toastSuccess("Review added successfully")
            
      // Reload the page after 800ms to reflect the updated data
      setTimeout(() => { window.location.reload();}, 800);
    } else if (reviewResponse.status == 401 || reviewResponse.status == 500){
      const reviewData = await reviewResponse.json();
      toastFailure(reviewData.message);
    } else if (reviewResponse.status == 204){  // Checking if user has booked this service
      toastFailure("Book a service to review it.");
    } else if (reviewResponse.status == 200){
      const reviewData = await reviewResponse.json();  // Checking if review is already given
      toastFailure(reviewData.message);
    } else {
      toastFailure("Something went wrong, Please try again");
    }
  }

  return (
    <div className="bg-white w-[80vw] rounded-lg shadow-lg 1xs:p-6 grid grid-cols-1 lg:grid-cols-3">
      
      <div className="lg:col-span-3 col-span-1 px-4">
        <form className="space-y-4" onSubmit={handleReviewSubmit}>
          <h2 className="text-2xl font-semibold text-gray-700 mb-4">Write a review</h2>
          <div className="flex justify-start items-center flex-wrap space-x-1 mb-4">

            <div id="rating" class="flex space-x-2 mb-4">
		          <svg class="w-8 h-8 text-gray-400 hover:text-yellow-400 cursor-pointer" fill="currentColor" viewBox="0 0 20 20" data-value="1">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.95 4.146.018c.958.004 1.355 1.226.584 1.818l-3.36 2.455 1.287 3.951c.3.922-.7561.688-1.541 1.125L10 13.011l-3.353 2.333c-.785.563-1.841-.203-1.541-1.125l1.287-3.951-3.36-2.455c-.77-.592-.374-1.814.584-1.818l4.146-.018 1.286-3.95z" />
		          </svg>
		          <svg class="w-8 h-8 text-gray-400 hover:text-yellow-400 cursor-pointer" fill="currentColor" viewBox="0 0 20 20" data-value="2">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.95 4.146.018c.958.004 1.355 1.226.584 1.818l-3.36 2.455 1.287 3.951c.3.922-.7561.688-1.541 1.125L10 13.011l-3.353 2.333c-.785.563-1.841-.203-1.541-1.125l1.287-3.951-3.36-2.455c-.77-.592-.374-1.814.584-1.818l4.146-.018 1.286-3.95z" />
		          </svg>
		          <svg class="w-8 h-8 text-gray-400 hover:text-yellow-400 cursor-pointer" fill="currentColor" viewBox="0 0 20 20" data-value="3">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.95 4.146.018c.958.004 1.355 1.226.584 1.818l-3.36 2.455 1.287 3.951c.3.922-.7561.688-1.541 1.125L10 13.011l-3.353 2.333c-.785.563-1.841-.203-1.541-1.125l1.287-3.951-3.36-2.455c-.77-.592-.374-1.814.584-1.818l4.146-.018 1.286-3.95z" />
		          </svg>
		          <svg class="w-8 h-8 text-gray-400 hover:text-yellow-400 cursor-pointer" fill="currentColor" viewBox="0 0 20 20" data-value="4">
			          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.95 4.146.018c.958.004 1.355 1.226.584 1.818l-3.36 2.455 1.287 3.951c.3.922-.7561.688-1.541 1.125L10 13.011l-3.353 2.333c-.785.563-1.841-.203-1.541-1.125l1.287-3.951-3.36-2.455c-.77-.592-.374-1.814.584-1.818l4.146-.018 1.286-3.95z" />
		          </svg>
		          <svg class="w-8 h-8 text-gray-400 hover:text-yellow-400 cursor-pointer" fill="currentColor" viewBox="0 0 20 20" data-value="5">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.95 4.146.018c.958.004 1.355 1.226.584 1.818l-3.36 2.455 1.287 3.951c.3.922-.7561.688-1.541 1.125L10 13.011l-3.353 2.333c-.785.563-1.841-.203-1.541-1.125l1.287-3.951-3.36-2.455c-.77-.592-.374-1.814.584-1.818l4.146-.018 1.286-3.95z" />
		          </svg>
	          </div>

	          <div id="rating-text" class="text-lg mb-4">Rating: 0 stars</div>

          </div>
          <textarea id="review" name="TextReview" rows="4" required={true} className="block w-full p-3 text-sm text-gray-900 bg-gray-50 rounded-md border border-gray-300 focus:ring-blue-500 focus:border-blue-500" placeholder="Write your review" onChange={handleReviewInputChange}></textarea>

          <div id="result" class="mt-4 hidden text-green-600 text-lg font-bold">Thank you, for rating <span id="submitted-rating">0</span> stars.</div>
          <div className="text-right py-4">
            {SessionID.SessionID ? 
             (<button id='subbtnXreview' className=" text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-semibold rounded-lg text-sm px-5 py-3" onClick={handleReviewSubmit}>Post Review</button>)
             :
             (<button id='subbtnXreview' className=" text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-semibold rounded-lg text-sm px-5 py-3" onClick={handleReviewSubmit}>Login to Post Review</button>)
            }
            
            
          </div>

        </form>
      </div>
    </div>
  )
}

export default ReviewForm
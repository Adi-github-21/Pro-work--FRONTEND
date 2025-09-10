import React , { useContext } from 'react'
import ShopHeader from '../../Components/Category/ShopHeader'
import ReviewForm from '../../Components/Category/ReviewForm'
import ReviewUserCard from '../../Components/Category/ReviewUserCard'
import { useParams } from 'react-router-dom';
import { MyContext } from '../../ContextAPI';
import { Helmet } from 'react-helmet';
import WorkerInfo from '../../Utils/WorkerInfo';

function Review() {
  const { OneWorker } = useContext(MyContext);
  const { id } = useParams();

  if (!OneWorker || OneWorker._id !== id) {
    return ( 
      <div className="flex justify-center items-center h-screen">
        <WorkerInfo id={id} />
        Loading...
      </div> 
    )
  }
  

  return (
    <div className='w-full flex flex-wrap justify-center'>
      <Helmet><title>Pro Work - Shop / Worker</title></Helmet>
      <ShopHeader/>

        <div>
            <div className='w-full'><ReviewForm /></div>
        
            <div className='w-95 my-6'><ReviewUserCard /></div>
        </div>
      
    </div>
  )
}

export default Review


// import React , { useContext } from 'react'
// import ShopHeader from '../../Components/ShopHeader'
// import ReviewForm from '../../Components/ReviewForm'
// import ReviewUserCard from '../../Components/ReviewUserCard'
// import { useParams } from 'react-router-dom';
// import { MyContext } from '../../ContextAPI';
// import { URL } from '../../func';
// import { Helmet } from 'react-helmet';
// import WorkerInfo from '../../Utils/WorkerInfo';

// function Review() {
//   const { OneWorker } = useContext(MyContext);
//   const { id } = useParams();

//   if (!OneWorker) {
//     return ( 
//       <div className="flex justify-center items-center h-screen">
//         <WorkerInfo id={id} />
//         Loading...
//       </div> 
//     )
//   }
  

//   return (
//     <div className='w-full flex flex-wrap justify-center'>
//       <Helmet><title>Pro Work - Shop / Worker</title></Helmet>
//       <ShopHeader/>

//         <div>
//             <div className='w-full'><ReviewForm /></div>
        
//             <div className='w-95 my-6'><ReviewUserCard /></div>
//         </div>
      
//     </div>
//   )
// }

// export default Review
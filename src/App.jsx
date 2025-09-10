// Package
import { useContext } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { Toaster } from 'react-hot-toast';
import { MyContext } from './ContextAPI';

// Utils
import UserInfo from './Utils/UserInfo';
import WorkerInfo from './Utils/WorkerInfo';

// Components
import Navbar from './Components/Navbar/Navbar'
import Footer from './Components/Navbar/Footer'
import SignUpForm from './Components/SignUpForm/SignUpForm'
import OTPForm from './Components/SignUpForm/OTPForm'

// Pages
import Home from './Pages/Home/Home'
import Service from './Pages/Service/Service'
import Category from './Pages/Category/Category'
import Profile from './Pages/Profile/Profile'
import WorkerProfile from './Pages/WorkerProfile/WorkerProfile'
import WorkerRegister from './Pages/WorkerRegister/WorkerRegister';
import Error404 from './Pages/Error404/Error404'
import BookService from './Pages/ServiceBooking/BookService'
import Overview from './Pages/ServiceBooking/Overview'
import Review from './Pages/ServiceBooking/Review.jsx';
import ProtectedRoutes from './Pages/ProtectedRoutes'
import Success from './Pages/Success/Success'
import Failed from './Pages/Failed/Failed.jsx';
import MyBooking from './Pages/MyBooking/MyBooking'
import MyWork from './Pages/MyWork/MyWork'
import Terms from './Pages/Terms/Terms'
import PrivacyPolicy from './Pages/PrivacyPolicy/PrivacyPolicy'
import Explore from './Pages/Explore/Explore'
import About from './Pages/About/About'
import Contact from './Pages/Contact/Contact.jsx';
import Feedback from './Pages/Feedback/Feedback.jsx';
import Wallet from './Pages/Wallet/Wallet.jsx'
// NEW: change-location page
import ChangeLocation from './Pages/ChangeLocation';

function App() {
  const { SendOTP } = useContext(MyContext);
  const location = useLocation();
  
  return (
    <div className='flex justify-center items-start flex-wrap'>
      <Helmet><title>Pro Work - Home</title></Helmet>
      <Toaster/>

      <UserInfo />
      <WorkerInfo />

      <Navbar />
      {SendOTP ? <OTPForm /> : <SignUpForm />}
      
      <div id='Body-routes' className="body-routes">
        <Routes location={location} key={location.pathname} >
          <Route path='/' element={<Home/>}/>
          <Route path='/services' element={<Service/>}/>
          <Route path='/services/:category' element={<Category/>}/>
          <Route path='/explore' element={<Explore/>}/>
          <Route path='/about-us' element={<About/>}/>
          <Route path='/contact-us' element={<Contact/>}/>
          <Route path='/register-with-us' element={<WorkerRegister/>}/>
          <Route path='/services/:category/:id' element={<BookService/>}/>
          <Route path='/services/:category/:id/overview' element={<Overview/>}/>
          <Route path='/services/:category/:id/reviews' element={<Review/>}/>
          <Route path='/:error404' element={<Error404/>}/>
          <Route path='/terms-of-service' element={<Terms/>}/>
          <Route path='/privacy-policy' element={<PrivacyPolicy/>}/>
          <Route path='/feedback' element={<Feedback/>}/>

          {/* route to show change-location simple page */}
          <Route path='/change-location' element={<ChangeLocation/>} />

          <Route element={<ProtectedRoutes/>}>
            <Route path='/payment_success?' element={<Success/>}/>
            <Route path='/payment_failed?' element={<Failed/>}/>
            <Route path='/my-profile/:id' element={<Profile/>}/>
            <Route path='/my-profile/:id/my-booking' element={<MyBooking/>}/>
            <Route path='/my-profile/:id/my-worker-profile/:id' element={<WorkerProfile/>}/>
            <Route path='/my-profile/:id/my-work/:id' element={<MyWork/>}/>
            <Route path='/my-profile/:id/my-worker-profile/:id/my-wallet' element={<Wallet/>}/>
          </Route>
        </Routes>
      </div>
      
      <Footer />
    </div>
  )
}

export default App








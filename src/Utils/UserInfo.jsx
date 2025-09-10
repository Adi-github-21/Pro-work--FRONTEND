// Package
import { useEffect, useContext } from 'react'

// Functions
import { URL, toastFailure } from '../func.jsx'
import { MyContext } from '../ContextAPI'

function UserInfo() {
  const { setUserData, setPersonalFormData, setAddressFormData, setMyBooking, SessionID } = useContext(MyContext);

  const fetchUserData = async () => {

    // Asking for user information only if SessionID is present
    if(SessionID.SessionID){
      // Fetch User Data
      try {
        const userResponse = await fetch(`${URL}/user/signup`, { credentials: 'include', headers: { 'Content-Type': 'multipart/form-data' } });
        if(userResponse.status == 200){
          const userData = await userResponse.json();
          setUserData({ UserObjectID: userData[0]._id, UserNumber: userData[0].PhoneNumber });
        } else if(userResponse.status == 401 || userResponse.status == 500){
          const userData = await userResponse.json();
          toastFailure(userData.message);
        } else if (userResponse.status == 204){
          console.log("No user data found");
          return null
        } else {
          toastFailure("Something went wrong, Please try again");
        }
      } catch (error) {
        toastFailure('Something went wrong, Please try again');
        console.log("Error fetching user data:", error);
      }


      // Fetch Personal Data
      try{
        const personalResponse = await fetch(`${URL}/user/personal`, { credentials: 'include', headers: { 'Content-Type': 'multipart/form-data' } });        
        if (personalResponse.status == 200) {
          const personalData = await personalResponse.json();
          setPersonalFormData({ Name: personalData[0].Name, Email: personalData[0].Email, isPersonal: personalData[0].isPersonal });
        } else if (personalResponse.status == 401 || personalResponse.status == 500){
          const personalData = await personalResponse.json();
          toastFailure(personalData.message)
        } else if (personalResponse.status == 204){
          return null;
        } else {
          toastFailure("Something went wrong, Please try again");
        }
      } catch(error){        
        toastFailure("Something went wrong, Please try again")
      }
      


      // Fetch Address Data
      try{
        const addressResponse = await fetch(`${URL}/user/address`, { credentials: 'include', headers: { 'Content-Type': 'multipart/form-data' } });
        if (addressResponse.status == 200) {
          const addressData = await addressResponse.json();
          setAddressFormData({ Address: addressData[0].Address, Landmark: addressData[0].Landmark, PinCode: addressData[0].PinCode, isAddress: addressData[0].isAddress });
        } else if (addressResponse.status == 401 || addressResponse.status == 500){
          const addressData = await addressResponse.json();
          toastFailure(addressData.message)
        } else if (addressResponse.status == 204){
          return null;
        } else{
          toastFailure("Something went wrong, Please try again")
        }
      } catch(error){
        toastFailure("Something went wrong, Please try again")
      }


      // Fetch Booking Data
      try{
        const myBookingResponse = await fetch(`${URL}/user/booking`, { credentials: 'include', headers: { 'Content-Type': 'multipart/form-data' } });
        if (myBookingResponse.status == 200) {
          const myBookingData = await myBookingResponse.json();
          setMyBooking(myBookingData);
        } else if (myBookingResponse.status == 401 || myBookingResponse.status == 500){
          const myBookingData = await myBookingResponse.json();
          toastFailure(myBookingData.message)
        } else if (myBookingResponse.status == 204){
          return null;
        } else{
          toastFailure("Something went wrong, Please try again")
        }
      } catch(error){
        toastFailure("Something went wrong, Please try again")
      }

    }
  };

  useEffect(() => {
    fetchUserData();
  }, []); // this runs only once on mount.

  return null; // Returning null as this component is only fetching data and not rendering UI.
}

export default UserInfo;

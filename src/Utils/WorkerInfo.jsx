// Package
import { useEffect, useContext } from 'react'
// Functions
import { URL, toastFailure } from '../func.jsx'

import { MyContext } from '../ContextAPI'


function WorkerInfo({id}) {

  const { SessionID, WorkerFormData, setWorkerFormData, setServiceFormData, setMyWork, setMyBank, setWorkerWidthrawal, setWorkerBalance, setOneWorker, setReviewFormData,  setOneWorkerService, setCategoryCount  } = useContext(MyContext);

  const fetchWorkerData = async () => {

    // Asking for user information only if SessionID is present
    if(SessionID.SessionID){

      let workerPresent;
      // Fetch Worker Data
      try{
        const workerResponse = await fetch(`${URL}/worker/register`, { credentials: 'include', headers: { 'Content-Type': 'multipart/form-data' } });
        if (workerResponse.status == 200) {
          const workerData = await workerResponse.json();          
          setWorkerFormData({ UserObjectID: workerData[0].UserObjectID, WorkerObjectID: workerData[0]._id, ShopName: workerData[0].ShopName, ShopDescription: workerData[0].ShopDescription, ShopAddress: workerData[0].ShopAddress, ShopCategory: workerData[0].ShopCategory, Area: workerData[0].Area, City: workerData[0].City, FullName: workerData[0].FullName, ShopEmail: workerData[0].ShopEmail, ShopPhoneNumber: workerData[0].ShopPhoneNumber, AadharFront: workerData[0].AadharFront, AadharBack: workerData[0].AadharBack, ShopPhoto1: workerData[0].ShopPhoto1 ,ShopPhoto2: workerData[0].ShopPhoto2, ShopPhoto3: workerData[0].ShopPhoto3, isWorker: workerData[0].isWorker});
          workerPresent = workerData[0].isWorker
        } else if(workerResponse.status == 401 || workerResponse.status == 500){
          const workerData = await workerResponse.json();
          toastFailure(workerData.message);
        } else if (workerResponse.status == 204){
          console.log("No data available")
        } else {
          toastFailure("Something went wrong, Please try again");
        }
      } catch (error) {
        toastFailure('Something went wrong, Please try again');
      }

      if(workerPresent){
      // Fetch Worker Sub Service Data
      try{
        const serviceResponse = await fetch(`${URL}/worker/service`, { credentials: 'include', headers: { 'Content-Type': 'multipart/form-data' } });
        if (serviceResponse.status == 200) {
          const serviceData = await serviceResponse.json();          
          setServiceFormData({
  isService: serviceData[0].isService,
  Services: serviceData[0].Services  // dynamically set the full Services array
});

        } else if(serviceResponse.status == 401 || serviceResponse.status == 500){
          const serviceData = await serviceResponse.json();
          toastFailure(serviceData.message);
        } else if (serviceResponse.status == 204){
          console.log("No data available")
        } else {
          toastFailure("Something went wrong, Please try again");
        }
      } catch (error) {
        toastFailure('Something went wrong, Please try again');
      }

      // Fetch My Work Data
      try{
        const myWorkResponse = await fetch(`${URL}/worker/my-work`, { credentials: 'include', headers: { 'Content-Type': 'multipart/form-data' } });
        if (myWorkResponse.status == 200) {
          const myWorkData = await myWorkResponse.json();
          setMyWork(myWorkData);
        } else if (myWorkResponse.status == 401 || myWorkResponse.status == 500){
          const myWorkData = await myWorkResponse.json();
          toastFailure(myWorkData.message)
        } else if (myWorkResponse.status == 204){
          console.log("No data available")
        } else{
          toastFailure("Something went wrong, Please try again")
        }
      } catch(error){
        toastFailure("Something went wrong, Please try again")
        console.log(error.message)
      }

      // Fetch Bank Data
      try{
        const myBankResponse = await fetch(`${URL}/worker/bank`, { credentials: 'include', headers: { 'Content-Type': 'multipart/form-data' } });
        if (myBankResponse.status == 200) {
          const myBankData = await myBankResponse.json();
          setMyBank(myBankData);
        } else if (myBankResponse.status == 401 || myBankResponse.status == 500){
          const myBankData = await myBankResponse.json();
          toastFailure(myBankData.message)
        } else if (myBankResponse.status == 204){
          console.log("No data available")
        } else{
          toastFailure("Something went wrong, Please try again")
        }
      } catch(error){
        toastFailure("Something went wrong, Please try again")
        console.log(error.message)
      }


      // Fetch Worker Widthrawal Data
      try{
        const widthrawalResponse = await fetch(`${URL}/worker/widthrawal`, { credentials: 'include', headers: { 'Content-Type': 'multipart/form-data' } });
        if (widthrawalResponse.status == 200) {
          const widthrawalData = await widthrawalResponse.json();
         setWorkerWidthrawal(widthrawalData);
        } else if (widthrawalResponse.status == 401 || widthrawalResponse.status == 500){
          const widthrawalData = await widthrawalResponse.json();
          toastFailure(myWorkData.message)
        } else if (widthrawalResponse.status == 204){
          console.log("No data available")
        } else{
          toastFailure("Something went wrong, Please try again")
        }
      } catch(error){
        toastFailure("Something went wrong, Please try again")
        console.log(error.message)
      }

      // Fetch Worker Moeny Data
      try{
        const MoenyResponse = await fetch(`${URL}/worker/balance`, { credentials: 'include', headers: { 'Content-Type': 'multipart/form-data' } });
        if (MoenyResponse.status == 200) {
          const MoenyData = await MoenyResponse.json();
         setWorkerBalance(MoenyData);
        } else if (MoenyResponse.status == 401 || MoenyResponse.status == 500){
          const MoenyData = await MoenyResponse.json();
          toastFailure(MoenyData.message)
        } else if (MoenyResponse.status == 204){
          console.log("No data available")
        } else{
          toastFailure("Something went wrong, Please try again")
        }
      } catch(error){
        toastFailure("Something went wrong, Please try again")
        console.log(error.message)
      }
    }

    }    
  };

  useEffect(() => {
    fetchWorkerData();
  }, []); // Empty dependency array ensures this runs only once on mount.

  

  

  // This data can be shown to user wheather they have log in or not

  useEffect(() => {

    const fetchOneWorkerData = async () => {
      const oneWorkerResponse = await fetch(`${URL}/worker/register/category/${id}`, { credentials: 'include', headers: { 'Content-Type': 'multipart/form-data' } });
      if (oneWorkerResponse.status == 200) {
        const oneWorkerData = await oneWorkerResponse.json();          
        setOneWorker(oneWorkerData[0])
      }
    


      const oneWorkerServiceResponse = await fetch(`${URL}/worker/register/category/service/${id}`, { credentials: 'include', headers: { 'Content-Type': 'multipart/form-data' } });      
      if (oneWorkerServiceResponse.status == 200) {
        const oneWorkerServiceData = await oneWorkerServiceResponse.json();          
        // console.log(oneWorkerServiceData)
        setOneWorkerService(oneWorkerServiceData[0]) 
      }


      const oneWorkerReviewResponse = await fetch(`${URL}/worker/review/${id}`, { credentials: 'include', headers: { 'Content-Type': 'multipart/form-data' } });
      // console.log(oneWorkerServiceResponse)
      if (oneWorkerReviewResponse.status == 200) {
        const oneWorkerReviewData = await oneWorkerReviewResponse.json();          
        setReviewFormData(oneWorkerReviewData) 
      }
    }


    if (id) {
      fetchOneWorkerData ();
    }
  }, [id]);


  // fetch total number of workers in each category individually
  const fetchCategoryNumberData = async () => {
    const categoryNumberResponse = await fetch(`${URL}/worker/category-number`, { credentials: 'include', headers: { 'Content-Type': 'multipart/form-data' } });
    if (categoryNumberResponse.status == 200) {
      const categoryNumberData = await categoryNumberResponse.json();          
      setCategoryCount({ TotalBeautician: categoryNumberData[0].TotalBeautician, TotalCarpenter: categoryNumberData[0].TotalCarpenter, TotalElectrician: categoryNumberData[0].TotalElectrician, TotalHousehelp: categoryNumberData[0].TotalHousehelp, TotalPainter: categoryNumberData[0].TotalPainter, TotalPlumber: categoryNumberData[0].TotalPlumber, TotalPriest: categoryNumberData[0].TotalPriest, TotalTutor: categoryNumberData[0].TotalTutor })
    } else if(categoryNumberResponse.status == 401 || categoryNumberResponse.status == 500){
      const categoryNumberData = await categoryNumberResponse.json();
      toastFailure(categoryNumberData.message);
    } else if (categoryNumberResponse.status == 204){
      return null;
    } else {
      toastFailure("Something went wrong, Please try again");
    }
  }

  useEffect(() => {
    fetchCategoryNumberData()
  }, []); // Empty dependency array ensures this runs only once on mount.
    
  return null // Returning null as this component is only fetching data and not rendering UI.
}

export default WorkerInfo
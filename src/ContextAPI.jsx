import { createContext, useState,  } from 'react';
import { useCookies } from 'react-cookie';
export const MyContext = createContext(null);

const MyContextProvider = (props) =>{

    const [error, setErrors] = useState({})
    const [loadingState, setLoadingState] = useState(false);


    const [SendOTP, setSendOTP] = useState(false)
    const [OTP_ID, setOTP_ID] = useState('');
    const [PhoneNumber, setPhoneNumber] = useState(null) 

    
    const [UserData, setUserData] = useState({ UserObjectID: "", UserNumber: "" })
    const [PersonalFormData, setPersonalFormData] = useState({ Name: '', Email: '', isPersonal: false })
    const [AddressFormData, setAddressFormData] = useState({ Address: '', Landmark: '' , PinCode: '', isAddress: false})
    const [WorkerFormData, setWorkerFormData] = useState({ WorkerObjectID: "", ShopName: '', ShopDescription: '', ShopAddress: '', ShopCategory: 'Electrician', Area: ['Civil Lines'], City: 'Prayagraj', FullName: '', ShopEmail: '', ShopPhoneNumber: '', AadharFront: null, AadharBack: null, ShopPhoto1: null ,ShopPhoto2: null, ShopPhoto3: null, isWorker: false  })
    const [ServiceFormData, setServiceFormData] = useState({
  Category: '', // example: "Beautician", "Electrician"
  Services: [], // dynamic array of all services with nested structure
  isService: false
});

    const [CategoryCount, setCategoryCount] = useState({ TotalBeautician: 0, TotalCarpenter: 0, TotalElectrician: 0, TotalHousehelp: 0, TotalPainter: 0, TotalPlumber: 0, TotalPriest: 0, TotalTutor: 0 })
    const [MyBooking, setMyBooking] = useState('')
    const [MyWork, setMyWork] = useState('') 
    const [MyBank, setMyBank] = useState('')
    const [WorkerWidthrawal, setWorkerWidthrawal] = useState('')
    const [WorkerBalance, setWorkerBalance] = useState('')

    const [OneWorker, setOneWorker] = useState(null)
    const [OneWorkerService, setOneWorkerService] = useState(null)

    const [EditPersonalDetails, setEditPersonalDetails] = useState(false)
    const [EditAddressDetails, setEditAddressDetails] = useState(false)
    const [EditWorkerDetails, setEditWorkerDetails] = useState(false)

    const [SelectedService, setSelectedService] = useState(null); // used in booking service and final card


    const [SessionID, setSessionID, removeSessionID] = useCookies(['SessionID'])
    const [ServiceCategory, setServiceCategory, removeServiceCategory] = useCookies(['ServiceCategory'])
    
   
    const contextValue = {

        error, setErrors,
        loadingState, setLoadingState,

        SendOTP, setSendOTP,
        OTP_ID, setOTP_ID,
        PhoneNumber, setPhoneNumber,


        UserData ,setUserData,
        PersonalFormData, setPersonalFormData,
        AddressFormData, setAddressFormData,
        WorkerFormData, setWorkerFormData,
        ServiceFormData, setServiceFormData,
        CategoryCount, setCategoryCount,
        MyBooking, setMyBooking,
        MyWork, setMyWork,
        MyBank, setMyBank,
        WorkerWidthrawal, setWorkerWidthrawal,
        WorkerBalance, setWorkerBalance,

        OneWorker, setOneWorker,
        OneWorkerService, setOneWorkerService,

        EditPersonalDetails, setEditPersonalDetails,
        EditAddressDetails, setEditAddressDetails,
        EditWorkerDetails, setEditWorkerDetails,

        
        SelectedService, setSelectedService,

        SessionID, setSessionID, removeSessionID,
        ServiceCategory, setServiceCategory, removeServiceCategory,
    }

    return(
        <MyContext.Provider value={contextValue}>
            {props.children}
        </MyContext.Provider>
    )
}
export default MyContextProvider;

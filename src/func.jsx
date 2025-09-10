import toast from "react-hot-toast";
import close from './Assets/close.png'

export const FRONTEND_URL = import.meta.env.VITE_FRONTEND_URL;
export const URL = import.meta.env.VITE_URL;



// Success Message
export function toastSuccess(message){
  const toastMessage = typeof message === 'string' ? message : JSON.stringify(message);
  toast.custom((message) => (
    <div className={`${message.visible ? 'unhide' : 'hide'} max-w-md w-full bg-[#D1E7DD] shadow-lg rounded-lg pointer-events-auto pl-4 flex justify-between items-center ring-1 ring-black ring-opacity-5 text-[#243622] border border-green-300`}>
      <h4>{toastMessage}</h4>
      <div className="flex border-l border-gray-200">
        <button onClick={() => toast.dismiss(message.id)} className="w-full border border-transparent rounded-none rounded-r-lg p-4 flex items-center justify-center text-sm font-medium text-[#243622] hover:text-[#243622]">
          <img src={close} className='h-5 cursor-pointer hover:scale-125' alt="Close" />
        </button>
      </div>
    </div>
  ));
}

// Error Message
export function toastFailure(message) {
  const toastMessage = typeof message === 'string' ? message : JSON.stringify(message);
  toast.custom((message) => (
    <div className={`${message.visible ? 'unhide' : 'hide'} max-w-md w-full bg-[#F8D7DA] shadow-lg rounded-lg pointer-events-auto pl-4 flex justify-between items-center ring-1 ring-black ring-opacity-5 text-[#581528] border border-red-300`}>
      <h4>{toastMessage}</h4>
      <div className="flex border-l border-gray-200">
        <button onClick={() => toast.dismiss(message.id)} className="w-full border border-transparent rounded-none rounded-r-lg p-4 flex items-center justify-center text-sm font-medium text-[#581528] hover:text-[#581528]">
          <img src={close} className='h-5 cursor-pointer hover:scale-125' alt="Close" />
        </button>
      </div>
    </div>
  ));
}
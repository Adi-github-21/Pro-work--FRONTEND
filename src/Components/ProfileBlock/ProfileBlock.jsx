import next_icon from '../../Assets/next_W.png'

function ProfileBlock(props) {
  return (
    <div className='flex bg-[#33806b] items-center justify-between h-24 w-60 shadow-md hover:shadow-lg hover:shadow-[#33806b] shadow-[#33806b] rounded-3xl px-7 py-6 cursor-pointer m-4'>
        <div>
            <h2 className='text-lg text-white'>{props.heading1}</h2>
            <h5 className='text-xs text-white mt-1'>{props.heading2}</h5>
        </div>
                        
        <img className='h-6' src={next_icon} alt="" />
    </div>
  )
}

export default ProfileBlock
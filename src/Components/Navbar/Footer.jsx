import { Link } from 'react-router-dom'

import googlePlay from '../../Assets/Footer/googlePlay.png'
import insta48 from '../../Assets/Footer/instagram48.png'
import linked48 from '../../Assets/Footer/linkedin48.png'
import facebook48 from '../../Assets/Footer/facebook48.png'
import youtube48 from '../../Assets/Footer/youtube48.png'

function Footer() {

  const scrollTop0 = () => window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <footer className='w-screen bg-[#f5f7fa] text-gray-800'> {/* bg-[#fce957] */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 border-b border-gray-300">
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {/* Company */}
          <div>
            <h3 className='text-xl text-[#33806b] font-semibold mb-4'>Company</h3>
            <ul className='space-y-2 text-sm'>
              <li><Link to='/about-us' onClick={scrollTop0} className='hover:text-green-600'>About Us</Link></li>
              <li><Link to='/terms-of-service' onClick={scrollTop0} className='hover:text-green-600'>Terms of Service</Link></li>
              <li><Link to='/privacy-policy' onClick={scrollTop0} className='hover:text-green-600'>Privacy Policy</Link></li>
            </ul>
          </div>

          {/* Customers */}
          <div>
            <h3 className='text-xl text-[#33806b] font-semibold mb-4'>Customers</h3>
            <ul className='space-y-2 text-sm'>
              <li><Link to='/services' onClick={scrollTop0} className='hover:text-green-600'>Services Near You</Link></li>
              <li><Link to='/feedback' onClick={scrollTop0} className='hover:text-green-600'>Feedback</Link></li>
              <li><Link to='/contact-us' onClick={scrollTop0} className='hover:text-green-600'>Contact Us</Link></li>
            </ul>
          </div>

          {/* Workers */}
          <div>
            <h3 className='text-xl text-[#33806b] font-semibold mb-4'>Workers</h3>
            <ul className='space-y-2 text-sm'>
              <li><Link to='/register-with-us' onClick={scrollTop0} className='hover:text-green-600'>Register for Work</Link></li>
            </ul>
          </div>

          {/* Social Media */}
          <div className='flex flex-wrap'>
            <h3 className='text-xl w-full text-[#33806b] font-semibold mb-4'>Follow Us</h3>
            <div className='flex xxs:space-x-4 flex-wrap xxs:flex-nowrap'>
              <a href="https://www.instagram.com/prowork24x7/" target="_blank" rel="noopener noreferrer">
                <img className='h-10 hover:scale-110 transition-transform' src={insta48} alt="Instagram" />
              </a>
              <a href="https://www.linkedin.com/company/pro-work-in/?viewAsMember=true" target="_blank" rel="noopener noreferrer">
                <img className='h-10 hover:scale-110 transition-transform' src={linked48} alt="LinkedIn" />
              </a>
              <a href="https://www.facebook.com/profile.php?id=61574792888087" target="_blank" rel="noopener noreferrer">
                <img className='h-10 hover:scale-110 transition-transform' src={facebook48} alt="Facebook" />
              </a>
              <a href="https://www.youtube.com/channel/UCk5C8Ja6fP4vd6AGIxRM0tw" target="_blank" rel="noopener noreferrer">
                <img className='h-10 hover:scale-110 transition-transform' src={youtube48} alt="Facebook" />
              </a>
            </div>
          </div>
        </div>

        {/* App Promotion */}
        <div className="mt-10 flex flex-col lg:flex-row justify-between items-center">
          <h2 className="text-xl sm:text-2xl md:text-3xl font-semibold text-center lg:text-left mb-4 lg:mb-0">
            Get the <span className="text-[#33806b]">'ProWork'</span> App on your device
          </h2>
          <div className="flex items-center space-x-3">
            <img className='h-12 md:h-14' src={googlePlay} alt="Download from Google Play" />
            <div className="text-sm md:text-base">
              <span>Download from <br /><span className="font-semibold">Google Play</span></span>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Info */}
      <div className="bg-[#33806b] py-4 text-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center space-y-2 md:space-y-0">
          <div className="text-center md:text-left text-[#f2da1d]">
            25/51 MG Marg, Civil Lines Prayagraj
          </div>
          <div className="text-center text-[#f2da1d]">+91-8400732040</div>
          <div className="text-center text-[#f2da1d]">prowork24.7customercare@gmail.com</div>
        </div>
        <div className="text-center mt-2 text-xs text-white">
          &copy; 2025 ProWork. All Rights Reserved.
        </div>
      </div>
    </footer>
  )
}

export default Footer;


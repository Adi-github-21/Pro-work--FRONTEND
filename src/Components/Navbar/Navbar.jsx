// Packages
import { useState, useEffect, useContext, useRef } from 'react'
import { Link } from 'react-router-dom'

// Styles
import './Navbar.css'

// Components
import AlgoSearch from '../AlgoSearch/AlgoSearch'

// Functions
import { showSignUpForm } from '../SignUpForm/signUp'
import { MyContext } from '../../ContextAPI'

// Assets
import Menu_Y from '../../Assets/equal_Y.png'
import Menu_G from '../../Assets/equal_G.png'

import Close_Y from '../../Assets/close_Y.png';
import Close_G from '../../Assets/close_G.png';
import User from '../../Assets/nav_user.png'
import User_Y from '../../Assets/user_Y.png'
import User_G from '../../Assets/user_G.png'
import SearchIcon_Y from "../../Assets/nav_search_Y.png";
import SearchIcon_G from "../../Assets/nav_search_G.png";
import ProworkLogo from '../../Assets/ProworkLogo.png';

function Navbar() {
    const { UserData, SessionID } = useContext(MyContext);
    const [isScrolled, setIsScrolled] = useState(false);
    const [isHamOpen, setIsHamOpen] = useState(false); 
    const phoneListRef = useRef(null);

    const [isUserHovered, setIsUserHovered] = useState(false);
    const [isSearchHovered, setIsSearchHovered] = useState(false);
    const [isHamHovered, setIsHamHovered] = useState(false);

    const handleEnterUser = () => setIsUserHovered(true);
    const handleLeaveUser = () => setIsUserHovered(false);

    const handleEnterSearch = () => setIsSearchHovered(true);
    const handleLeaveSearch = () => setIsSearchHovered(false);

    const handleEnterHam = () => setIsHamHovered(true);
    const handleLeaveHam = () => setIsHamHovered(false);

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 10) { setIsScrolled(true) }
            else { setIsScrolled(false) }
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const scrollTop0 = () => window.scrollTo({ top: 0, behavior: "smooth" });

    function toggleNavbarMenu() {
        if (phoneListRef.current) {
            phoneListRef.current.classList.toggle('nav-phone-list-moveDown', !isHamOpen);
            phoneListRef.current.classList.toggle('nav-phone-list-moveUp', isHamOpen);
            setIsHamOpen(prevState => !prevState);
        }
    }

    function ShowSmallSearch(){
        const SmallSearch = document.getElementById('SmallSearch')
        SmallSearch.classList.add('displayFlex')
        SmallSearch.classList.remove('displayNone')
    }

    return (
        <div className={`fixed top-0 left-0 right-0 flex justify-center h-20 w-full z-40 transition-all duration-300 ${isScrolled ? 'bg-white shadow-md' : 'bg-transparent'} ${isHamOpen ? 'bg-white shadow-md' : 'bg-transparent'}`} id='Navbar'>
            <div className="flex justify-between items-center h-full w-full max-w-[1250px] mx-auto px-4 xl:px-0">

            {/* Brand Logo */}
            <Link to='/'> <img src={ProworkLogo} alt="" className='h-[4.5rem]' /> </Link>

            <AlgoSearch isScrolled={isScrolled} />

            {/* Phone Navbar */}
            <div className='flex sm:hidden justify-between items-center'>
                <div className='flex justify-between items-center w-full'>
                    <label htmlFor="searchInput" className="md:hidden justify-center items-center" onClick={ShowSmallSearch}>
                        <img  className="h-10 cursor-pointer" 
                    src={
    isScrolled
      ? (isSearchHovered ? SearchIcon_Y : SearchIcon_G) // When scrolled, hover shows User_Y, otherwise User_G
      : (isSearchHovered ? SearchIcon_G : SearchIcon_Y) // When not scrolled, hover shows User_G, otherwise User_Y
  }
  alt="search" 
  onMouseEnter={handleEnterSearch}
  onMouseLeave={handleLeaveSearch} />
                    </label>
                    <button onClick={toggleNavbarMenu} className="relative">
                        <img className={`cursor-pointer ${isHamOpen ? "h-6 px-2" : "h-10"}`} 
                        src={isHamOpen ? 
                            isScrolled
      ? (isHamHovered ? Close_Y : Close_G) // When scrolled, hover shows User_Y, otherwise User_G
      : (isHamHovered ? Close_G : Close_Y) // When not scrolled, hover shows User_G, otherwise User_Y
                        
                            :
                        isScrolled
      ? (isHamHovered ? Menu_Y : Menu_G) // When scrolled, hover shows User_Y, otherwise User_G
      : (isHamHovered ? Menu_G : Menu_Y) // When not scrolled, hover shows User_G, otherwise User_Y
                        } 
                        alt={isHamOpen ? "close" : "menu"} 
                        
  onMouseEnter={handleEnterHam}
  onMouseLeave={handleLeaveHam}
                        />
                    </button>

                {SessionID.SessionID ? 
                    (<Link to={`/my-profile/${UserData.UserObjectID}`}>
                        <img
  className="h-10 transition duration-200"
  src={
    isScrolled
      ? (isUserHovered ? User_Y : User_G) // When scrolled, hover shows User_Y, otherwise User_G
      : (isUserHovered ? User_G : User_Y) // When not scrolled, hover shows User_G, otherwise User_Y
  }
  alt="user"
  onMouseEnter={handleEnterUser}
  onMouseLeave={handleLeaveUser}
/>
                        </Link>) 
                    : 
                    (<button className="bg-[#f2da1d] text-[#33806b] text-xs font-bold px-4 py-[0.5rem] rounded-full shadow hover:opacity-90 transition duration-300" onClick={showSignUpForm}>Sign Up</button>)
                }
                </div>
            </div>

            {/* Mobile Menu */}
            <div id='PhoneList' ref={phoneListRef} className={`fixed top-20 left-0 w-full h-[calc(100vh-5rem)] bg-white text-black transition-transform duration-300 ease-in-out ${isHamOpen ? 'nav-phone-list-moveDown' : 'nav-phone-list-moveUp'}`}>
                <div className="flex flex-col p-8 space-y-6">
                    <Link className="text-2xl text-[#33806b] hover:text-[#f2da1d] transition-colors" onClick={ () => { toggleNavbarMenu(),  scrollTop0() }} to="/">HOME</Link>
                    <Link className="text-2xl text-[#33806b] hover:text-[#f2da1d] transition-colors" onClick={ () => { toggleNavbarMenu(),  scrollTop0() }} to="/services">SERVICES</Link>
                    <Link className="text-2xl text-[#33806b] hover:text-[#f2da1d] transition-colors" onClick={ () => { toggleNavbarMenu(),  scrollTop0() }} to='/explore'>EXPLORE</Link>
                    <Link className="text-2xl text-[#33806b] hover:text-[#f2da1d] transition-colors" onClick={ () => { toggleNavbarMenu(),  scrollTop0() }} to="/about-us">ABOUT US</Link>
                </div>
            </div>

            {/* Desktop Navbar */}
            <div className='hidden sm:flex justify-evenly items-center sm:w-[65%] md:w-[55%] lg:w-[40%]'>
                <label htmlFor="searchInput" className="md:hidden justify-center items-center" onClick={ShowSmallSearch}>
                    <img  className="h-9 cursor-pointer" 
                    src={
    isScrolled
      ? (isSearchHovered ? SearchIcon_Y : SearchIcon_G) // When scrolled, hover shows User_Y, otherwise User_G
      : (isSearchHovered ? SearchIcon_G : SearchIcon_Y) // When not scrolled, hover shows User_G, otherwise User_Y
  }
  alt="search" 
  onMouseEnter={handleEnterSearch}
  onMouseLeave={handleLeaveSearch} />
                </label>
                <Link to='/services'><span className={`text-sm lg:text-base ${isScrolled ? 'text-[#33806B]' : 'text-[#f2da1d]'} ${isScrolled ? 'hover:text-[#f2da1d]' : 'hover:text-[#33806B]'} transition-colors`} onClick={scrollTop0}>SERVICES</span></Link>
                <Link to='/explore'><span className={`text-sm lg:text-base ${isScrolled ? 'text-[#33806B]' : 'text-[#f2da1d]'} ${isScrolled ? 'hover:text-[#f2da1d]' : 'hover:text-[#33806B]'} transition-colors`} onClick={scrollTop0}>EXPLORE</span></Link>
                <Link to='/about-us'><span className={`text-sm lg:text-base ${isScrolled ? 'text-[#33806B]' : 'text-[#f2da1d]'} ${isScrolled ? 'hover:text-[#f2da1d]' : 'hover:text-[#33806B]'} transition-colors`} onClick={scrollTop0}>ABOUT US</span></Link>

                {SessionID.SessionID ?
                    (<Link to={`/my-profile/${UserData.UserObjectID}`}>
                        <img
  className="h-10 transition duration-200"
  src={
    isScrolled
      ? (isUserHovered ? User_Y : User_G) // When scrolled, hover shows User_Y, otherwise User_G
      : (isUserHovered ? User_G : User_Y) // When not scrolled, hover shows User_G, otherwise User_Y
  }
  alt="user"
  onMouseEnter={handleEnterUser}
  onMouseLeave={handleLeaveUser}
/>

                    </Link>) 
                    : 
                    (<button className="bg-[#f2da1d] text-[#33806b] font-bold px-6 py-3 rounded-full shadow hover:opacity-90 transition duration-300" onClick={showSignUpForm}>Sign Up</button>)
                }
            </div>
        </div>
    </div>
  )
}

export default Navbar
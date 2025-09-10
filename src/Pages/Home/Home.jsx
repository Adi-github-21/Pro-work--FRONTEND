// Package
import { Link } from "react-router-dom";

// Styles
import "./Home.css";

// Components
import FAQ from "../Home/FAQ";

// Assets
import Category_Labourer from "../../Assets/Home Page/Category_Labourer.jpg";
import Category_Priest from "../../Assets/Home Page/Category_Priest.jpg";
import Category_Mechanic from "../../Assets/Home Page/Category_Mechanic.jpg";
import Category_Tutor from "../../Assets/Home Page/Category_Tutor.jpg";
import websiteproject from "../../Assets/Home Page/websiteproject.svg";

function Home() {
  return (
    <div className="w-full overflow-x-hidden">
      <main>

        <header id="HeroHeader" className="relative bg-HeroImgSmall bg-cover bg-center min-h-screen flex flex-col justify-center px-6 md:px-10 py-20 text-white overflow-hidden">
          <div className="absolute inset-0 bg-black/60 z-0" />
  
          {/* Main Text Content */}
          <div className="relative z-10 max-w-4xl space-y-6 sm:pt-0 pt-16">
            <h1 className="text-4xl sm:text-6xl font-extrabold leading-tight text-white">
              Find Trusted <br />
              Professionals <br />
              <span className="text-[#f2da1d]">For All Your Needs</span>
            </h1>
            <p className="text-lg sm:text-xl max-w-2xl text-white">
              From plumbing to electrical work, connect with skilled
              professionals who deliver quality service you can rely on.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 pt-4">
              <Link to="/register-with-us" className="w-full sm:w-auto text-center px-6 py-3 text-white bg-[#33806b] font-semibold rounded-md shadow-md hover:bg-[#276a55] transition">
                Register as Worker
              </Link>
              <Link to="/services" className="w-full sm:w-auto text-center px-6 py-3 text-[#33806b] bg-white font-semibold border-2 border-[#33806b] rounded-md hover:bg-[#f9f9f9] transition">
                View Services
              </Link>
            </div>
          </div>

          {/* Stats */}
          <div className="relative z-10 mt-10 mb-18 flex gap-10 text-white font-semibold text-lg">
            <div>
              <span className="text-3xl text-[#f2da1d] font-bold block">250+</span>
              Skilled Workers
            </div>
            <div>
              <span className="text-3xl text-[#f2da1d] font-bold block">95%</span>
              Satisfaction Rate
            </div>
            <div className="hidden md:block">
              <span className="text-3xl text-[#f2da1d] font-bold block">24/7</span>
              Support Available
            </div>
          </div>

          {/* Brand Tagline (moved up) */}
          <div className="lg:absolute mt-4 lg:mt-0 bottom-12 right-4 sm:right-10 z-10 select-none text-right leading-none" style={{ lineHeight: '1.1' }}>
            <div className="text-white text-[2.6rem] sm:text-5xl md:text-6xl font-extrabold tracking-tight">
              YOUR TRUSTED
            </div>
            <div className="text-white text-[2.6rem] sm:text-5xl md:text-6xl font-extrabold tracking-tight">
              SERVICE
            </div>
            <div className="text-[#f2da1d] text-[3.2rem] sm:text-6xl md:text-7xl font-extrabold tracking-tight">
              PARTNER
            </div>
          </div>
  
        </header>

        {/* Body */}
        <div className="flex justify-center flex-wrap w-full">
          <div className="flex justify-center flex-wrap w-full lg:mt-10">

            {/* 4 service block */}
            <div className="w-full max-w-7xl px-4 py-10 mx-auto">

              {/* Responsive Grid for Large Screens */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

                {/* Left: Text Block */}
                <div className="text-center lg:text-left lg:flex lg:items-center lg:justify-center">
                  <div className="max-w-xl w-full space-y-4">
                    <h2 className="text-4xl font-extrabold text-[#33806b]">Explore Services by Category</h2>
                    <p className="text-gray-600">Find trusted professionals tailored to your needs — whether it’s a mechanic, a tutor, or a priest.</p>
                  </div>
                </div>

                {/* Right: 2x2 Image Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
      
                  {/* Card: Labourer */}
                  <div className="group relative overflow-hidden rounded-2xl shadow-lg transition-transform duration-300 hover:scale-105 border border-[#33806b]/20">
                    <img className="w-full h-60 object-cover"src={Category_Labourer} alt="Labourer Services"/>
                    <div className="absolute inset-0 bg-black bg-opacity-40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center text-center px-4">
                      <h3 className="text-white text-xl font-bold mb-1">Labourer</h3>
                      <p className="text-sm text-white/80">Skilled daily wage help for any task</p>
                    </div>
                  </div>

                  {/* Card: Mechanic */}
                  <div className="group relative overflow-hidden rounded-2xl shadow-lg transition-transform duration-300 hover:scale-105 border border-[#33806b]/20">
                    <img className="w-full h-60 object-cover object-top" src={Category_Mechanic} alt="Mechanic Services" />
                    <div className="absolute inset-0 bg-black bg-opacity-40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center text-center px-4">
                      <h3 className="text-white text-xl font-bold mb-1">Mechanic</h3>
                      <p className="text-sm text-white/80">Reliable repair services at your door</p>
                    </div>
                  </div>

                  {/* Card: Tutor */}
                  <div className="group relative overflow-hidden rounded-2xl shadow-lg transition-transform duration-300 hover:scale-105 border border-[#33806b]/20">
                    <img className="w-full h-60 object-cover" src={Category_Tutor} alt="Tutor Services" />
                    <div className="absolute inset-0 bg-black bg-opacity-40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center text-center px-4">
                      <h3 className="text-white text-xl font-bold mb-1">Tutor</h3>
                      <p className="text-sm text-white/80">Learn at home with verified educators</p>
                    </div>
                  </div>

                  {/* Card: Priest */}
                  <div className="group relative overflow-hidden rounded-2xl shadow-lg transition-transform duration-300 hover:scale-105 border border-[#33806b]/20">
                    <img className="w-full h-60 object-cover" src={Category_Priest} alt="Priest Services" />
                    <div className="absolute inset-0 bg-black bg-opacity-40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center text-center px-4">
                      <h3 className="text-white text-xl font-bold mb-1">Priest</h3>
                      <p className="text-sm text-white/80">Perform rituals with experienced priests</p>
                    </div>
                  </div>

                </div>
              </div>
            </div>
            
            {/* google pay app */}
            <div className="bg-white py-10 px-4 sm:px-10 max-w-7xl mx-auto">

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

                {/* Right on lg (order 2), but first on small/medium (order 1) */}
                <div className="order-1 lg:order-2 text-center lg:text-left lg:flex lg:flex-col lg:justify-center max-w-xl mx-auto lg:mx-0 space-y-6">
                  <h2 className="text-4xl md:text-5xl font-extrabold text-[#33806b]">Get the Prowork App</h2>
                  <p className="text-gray-600 text-base">Discover and book reliable doorstep services anytime, anywhere — all from the Prowork mobile app.</p>
                  <a href="https://play.google.com/store/apps/details?id=com.prowork.app" target="_blank" rel="noopener noreferrer" className="inline-block">
                    <button className="flex items-center gap-3 bg-[#f2da1d] text-[#33806b] font-semibold px-6 py-3 rounded-full shadow-md hover:opacity-90 transition duration-300">
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M3.89 1.81a.75.75 0 0 1 .84-.09l13.5 7.5a.75.75 0 0 1 0 1.34l-13.5 7.5a.75.75 0 0 1-1.11-.67V2.47a.75.75 0 0 1 .27-.56ZM5 4.2v15.6l11.27-5.8L5 4.2Z" />
                      </svg>
                      Download on Play Store
                    </button>
                  </a>
                </div>

                {/* Left on lg (order 1), but second on small/medium (order 2) */}
                <div className="order-2 lg:order-1 relative w-full max-w-5xl mx-auto rounded-3xl overflow-hidden shadow-lg border border-[#33806b]/20">
                  <img src={websiteproject} alt="Prowork App Preview" className="w-full object-cover"/>
                </div>
              </div>
            </div>

            {/* Need a Helping Hand */}
            <div className="bg-white py-16 px-6 sm:px-10 max-w-6xl mx-auto space-y-16">

              {/* Hero Section */}
              <section className="text-center space-y-6">
                <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900">Need a Helping Hand?</h1>
                <p className="text-lg text-gray-600 max-w-xl mx-auto">From priests to mechanics and tutors to laborers, we offer trustworthy doorstep services with simple booking.</p>
                <div className="inline-flex gap-4 mt-4">
                  <Link to="/services">
                    <button className="bg-[#f2da1d] text-[#33806b] font-bold px-8 py-3 rounded-full shadow hover:opacity-90 transition duration-300">Electrician</button>
                  </Link>
                  <Link to="/services">
                    <button className="border border-[#33806b] text-[#33806b] font-semibold px-6 py-3 rounded-full hover:bg-[#33806b]/10 transition">Beautician</button>
                  </Link>
                </div>
              </section>

              {/* Promo / Booking Card */}
              <section className="bg-[#33806b] text-white rounded-3xl p-10 shadow-lg flex flex-col md:flex-row items-center justify-between gap-8">
                <div className="text-center md:text-left space-y-4">
                  <h2 className="text-2xl font-bold">Quick & Easy Booking</h2>
                  <p className="text-white/90">Book a trusted professional in minutes. No stress, no hassle — just services that show up.</p>
                </div>
                <Link to="/services">
                  <button className="bg-[#f2da1d] text-[#33806b] font-bold px-8 py-3 rounded-full shadow-md hover:opacity-90 transition duration-300">Book Now</button>
                </Link>
              </section>

              {/* Features Grid */}
              <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
  
                <div className="bg-white border border-[#33806b]/30 rounded-xl p-6 shadow hover:shadow-md transition">
                  <div className="w-12 h-12 bg-[#33806b] text-white rounded-full flex items-center justify-center text-xl font-bold mb-4">✓</div>
                  <h3 className="text-lg font-semibold text-gray-800">Expert Professionals</h3>
                  <p className="text-sm text-gray-600 mt-2">Verified & skilled service providers at your doorstep.</p>
                </div>

                <div className="bg-white border border-[#33806b]/30 rounded-xl p-6 shadow hover:shadow-md transition">
                  <div className="w-12 h-12 bg-[#33806b] text-white rounded-full flex items-center justify-center text-xl font-bold mb-4">₹</div>
                  <h3 className="text-lg font-semibold text-gray-800">Transparent Pricing</h3>
                  <p className="text-sm text-gray-600 mt-2">No hidden charges. Know what you’re paying for.</p>
                </div>

                <div className="bg-white border border-[#33806b]/30 rounded-xl p-6 shadow hover:shadow-md transition">
                  <div className="w-12 h-12 bg-[#33806b] text-white rounded-full flex items-center justify-center text-xl font-bold mb-4">⚡</div>
                  <h3 className="text-lg font-semibold text-gray-800">Easy Scheduling</h3>
                  <p className="text-sm text-gray-600 mt-2">Book anytime, anywhere with a few simple taps.</p>
                </div>

              </section>
            </div>
          </div>

          <FAQ />
        </div>
      </main>
    </div>
  );
}

export default Home;

import React from 'react'
import { Helmet } from 'react-helmet'
import Harshika from '../../Assets/About_Harshika1.jpg'
import Ayush from '../../Assets/About_Ayush1.jpg'
import Sachin from '../../Assets/sachin.jpg'
import Praveen from '../../Assets/praveen.jpg'
// import Shashank from '../../Assets/shashank.jpg'
import Tanu from '../../Assets/tanu.jpg'
import Arsh from '../../Assets/arsh.jpg'
import insta from '../../Assets/instagram.png'


function About() {
  return (
    <div className='flex flex-col pt-20 w-full min-h-screen mt-8'>
      <Helmet>
        <title>Pro Work - About Us</title>
        <meta name="description" content="Learn about ProWork – Prayagraj’s trusted platform to book professional services like electricians, plumbers, beauticians, priests and more."/>
        <link rel="canonical" href="https://prowork.org.in/about-us" />
      </Helmet>

      <div className="w-full max-w-[1250px] mx-auto px-4 xl:px-0 mb-4"> {/* Changed from fixed width to responsive */}
        <div className="mb-8">
          <h1 className='text-3xl md:text-4xl lg:text-5xl mb-4 text-[#33806b]'>About Us</h1>
          <p className='text-sm md:text-base lg:text-lg text-gray-700 text-justify'>ProWork - This name stands for our strength, wisdom and belief to do great. ProWork is the brainchild of two passionate young entrepreneurs — Harshika Yadav, our CEO, and Ayush Jaiswal, our CTO. Built with the vision of empowering local professionals and simplifying access to household services, ProWork is committed to transforming how daily service needs are met in India’s growing Tier 2 cities.</p>
        </div>

        <div className="font-[sans-serif] bg-gray-50 p-4 pb-12 rounded-lg">
          <div className="mx-auto">
            <h2 className=" text-[#f2da1d] text-3xl md:text-4xl font-extrabold text-center">Meet Our Team</h2>

            {/* Founder Team */}
            <h3 className="text-[#33806b] text-2xl md:text-3xl font-semibold text-center mt-6">Founders</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 md:gap-8 text-center mt-12">

              {/* Harshika Card */}
              <div className="bg-white py-6 px-4 shadow-xl rounded-lg hover:scale-105 transition-all duration-500">
                <img src={Harshika} className="w-36 h-36 rounded-full inline-block border-4 border-[#33806b] shadow-md" />

                <div className="mt-6">
                  <h4 className="text-[#33806b] text-xl font-semibold">Harshika Yadav</h4>
                  <p className="text-[#f2da1d] text-sm mt-1">CEO - Operations and Management</p>

                  <div className="space-x-6 mt-4 flex items-center justify-center">
                    <a href="https://www.instagram.com/harshika2418/" target='_blank'>
                      <button type="button" className="w-12 h-12 inline-flex items-center justify-center rounded-full border-none outline-none bg-[#f2da1d] hover:bg-[#f2da1d] shadow-md transition-all duration-300">
                        <img src={insta} alt="" className='h-7'/>
                      </button>
                    </a>
                    <a href="https://www.linkedin.com/in/harshika-yadav25/" target="_blank">
                      <button type="button" class="w-12 h-12 inline-flex items-center justify-center rounded-full border-none outline-none bg-[#33806b] hover:bg-[#33806b] shadow-md transition-all duration-300">
                        <svg xmlns="http://www.w3.org/2000/svg" width="18px" class="fill-white w-6 h-6" viewBox="0 0 24 24">
                          <path d="M23.994 24v-.001H24v-8.802c0-4.306-.927-7.623-5.961-7.623-2.42 0-4.044 1.328-4.707 2.587h-.07V7.976H8.489v16.023h4.97v-7.934c0-2.089.396-4.109 2.983-4.109 2.549 0 2.587 2.384 2.587 4.243V24zM.396 7.977h4.976V24H.396zM2.882 0C1.291 0 0 1.291 0 2.882s1.291 2.909 2.882 2.909 2.882-1.318 2.882-2.909A2.884 2.884 0 0 0 2.882 0z" fill="#f2da1d" />
                        </svg>
                      </button>
                    </a>
                  </div>
                  <p className="text-[#33806b] text-xs mt-2 px-4 text-justify leading-relaxed">
                    Harshika leads ProWork with clarity, empathy, and strategic foresight. As the CEO, she ensures the company stays aligned with its mission to provide trust, reliability, and empowerment to both users and professionals. Her dedication to building scalable, people-first solutions drives the business forward with purpose and vision.
                  </p>
                </div>
              </div>

              {/* Ayush Card  */}
              <div className="bg-white py-6 px-4 shadow-xl rounded-lg hover:scale-105 transition-all duration-500">
                <img src={Ayush} className="w-36 h-36 rounded-full inline-block border-4 border-[#33806b] shadow-md" />

                <div className="mt-6">
                  <h4 className="text-[#33806b] text-xl font-semibold">Ayush Jaiswal</h4>
                  <p className="text-[#f2da1d] text-sm mt-1">CTO - MERN Developer</p>


                  <div className="space-x-6 mt-4 flex items-center justify-center">
                    <a href="https://instagram.com/_25_aj/" target='_blank'>
                      <button type="button" className="w-12 h-12 inline-flex items-center justify-center rounded-full border-none outline-none bg-[#f2da1d] hover:bg-[#f2da1d] shadow-md transition-all duration-300">
                        <img src={insta} alt="" className='h-7'/>
                      </button>
                    </a>

                    <a href="https://www.linkedin.com/in/ayush-jaiswal25/" target="_blank">
                      <button type="button" class="w-12 h-12 inline-flex items-center justify-center rounded-full border-none outline-none bg-[#33806b] hover:bg-[#33806b] shadow-md transition-all duration-300">
                        <svg xmlns="http://www.w3.org/2000/svg" width="18px" class="fill-white w-6 h-6" viewBox="0 0 24 24">
                          <path d="M23.994 24v-.001H24v-8.802c0-4.306-.927-7.623-5.961-7.623-2.42 0-4.044 1.328-4.707 2.587h-.07V7.976H8.489v16.023h4.97v-7.934c0-2.089.396-4.109 2.983-4.109 2.549 0 2.587 2.384 2.587 4.243V24zM.396 7.977h4.976V24H.396zM2.882 0C1.291 0 0 1.291 0 2.882s1.291 2.909 2.882 2.909 2.882-1.318 2.882-2.909A2.884 2.884 0 0 0 2.882 0z" fill="#f2da1d" />
                        </svg>
                      </button>
                    </a>  
                  </div>
                  
                  <p className="text-[#33806b] text-xs mt-2 px-4 text-justify leading-relaxed">
                    Ayush is the technical backbone of ProWork, driving innovation and ensuring seamless user experiences. As the CTO, he leads the development team with a focus on building robust, scalable solutions that empower both service providers and users. His expertise in MERN stack development is key to ProWork’s technological advancements.
                  </p>
                </div>
              </div>

            </div>

            {/* Sales and Marketing */}
            <h3 className="text-[#f2da1d] text-2xl font-semibold text-center mt-12">Sales & Marketing</h3>            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">

              {/* Member 1 */}
              <div className="bg-white py-6 px-4 shadow-xl rounded-lg hover:scale-105 transition-all duration-300">
                <img src={Praveen} alt="Member 1" className="w-36 h-36 rounded-full mx-auto border-4 border-[#33806b] shadow-md" />
                {/* <h1 className="w-36 h-36 rounded-full mx-auto border-4 flex justify-center items-center border-[#33806b] shadow-md">PG</h1> */}
                <div className="text-center mt-4">
                  <h4 className="text-[#33806b] text-lg font-semibold">Praveen Giri</h4>
                  <p className="text-[#f2da1d] text-sm mt-1">Sales Manager</p>

                  <div className="space-x-6 mt-4 flex items-center justify-center">
                    <a href="https://www.instagram.com/praveen_brahman_315" target='_blank'>
                      <button type="button" className="w-12 h-12 inline-flex items-center justify-center rounded-full border-none outline-none bg-[#f2da1d] hover:bg-[#f2da1d] shadow-md transition-all duration-300">
                        <img src={insta} alt="" className='h-7'/>
                      </button>
                    </a>

                    <a href="https://www.linkedin.com/in/ayush-jaiswal25/" target="_blank">
                      <button type="button" class="w-12 h-12 inline-flex items-center justify-center rounded-full border-none outline-none bg-[#33806b] hover:bg-[#33806b] shadow-md transition-all duration-300">
                        <svg xmlns="http://www.w3.org/2000/svg" width="18px" class="fill-white w-6 h-6" viewBox="0 0 24 24">
                          <path d="M23.994 24v-.001H24v-8.802c0-4.306-.927-7.623-5.961-7.623-2.42 0-4.044 1.328-4.707 2.587h-.07V7.976H8.489v16.023h4.97v-7.934c0-2.089.396-4.109 2.983-4.109 2.549 0 2.587 2.384 2.587 4.243V24zM.396 7.977h4.976V24H.396zM2.882 0C1.291 0 0 1.291 0 2.882s1.291 2.909 2.882 2.909 2.882-1.318 2.882-2.909A2.884 2.884 0 0 0 2.882 0z" fill="#f2da1d" />
                        </svg>
                      </button>
                    </a>  
                  </div>

                </div>
              </div>

              {/* Member 2 */}
              <div className="bg-white py-6 px-4 shadow-xl rounded-lg hover:scale-105 transition-all duration-300">
                <img src={Sachin} alt="Member 2" className="w-36 h-36 rounded-full mx-auto border-4 border-[#33806b] shadow-md" />
                {/* <h1 className="w-36 h-36 rounded-full mx-auto border-4 flex justify-center items-center border-[#33806b] shadow-md">SP</h1> */}
                <div className="text-center mt-4">
                  <h4 className="text-[#33806b] text-lg font-semibold">Sachin Puri</h4>
                  <p className="text-[#f2da1d] text-sm mt-1">Sales & Marketing Assistant</p>

                  <div className="space-x-6 mt-4 flex items-center justify-center">
                    <a href="https://www.instagram.com/sachin__goswami_0974" target='_blank'>
                      <button type="button" className="w-12 h-12 inline-flex items-center justify-center rounded-full border-none outline-none bg-[#f2da1d] hover:bg-[#f2da1d] shadow-md transition-all duration-300">
                        <img src={insta} alt="" className='h-7'/>
                      </button>
                    </a>

                    <a href="https://www.linkedin.com/in/ayush-jaiswal25/" target="_blank">
                      <button type="button" class="w-12 h-12 inline-flex items-center justify-center rounded-full border-none outline-none bg-[#33806b] hover:bg-[#33806b] shadow-md transition-all duration-300">
                        <svg xmlns="http://www.w3.org/2000/svg" width="18px" class="fill-white w-6 h-6" viewBox="0 0 24 24">
                          <path d="M23.994 24v-.001H24v-8.802c0-4.306-.927-7.623-5.961-7.623-2.42 0-4.044 1.328-4.707 2.587h-.07V7.976H8.489v16.023h4.97v-7.934c0-2.089.396-4.109 2.983-4.109 2.549 0 2.587 2.384 2.587 4.243V24zM.396 7.977h4.976V24H.396zM2.882 0C1.291 0 0 1.291 0 2.882s1.291 2.909 2.882 2.909 2.882-1.318 2.882-2.909A2.884 2.884 0 0 0 2.882 0z" fill="#f2da1d" />
                        </svg>
                      </button>
                    </a>  
                  </div>
                </div>
              </div>

              {/* Member 3 */}
              <div className="bg-white py-6 px-4 shadow-xl rounded-lg hover:scale-105 transition-all duration-300">
                <h1 className="w-36 h-36 rounded-full mx-auto border-4 flex justify-center items-center border-[#33806b] shadow-md">SK</h1>
                {/* <img src="https://randomuser.me/api/portraits/men/14.jpg" alt="Member 3" className="w-36 h-36 rounded-full mx-auto border-4 border-[#33806b] shadow-md" /> */}
                <div className="text-center mt-4">
                  <h4 className="text-[#33806b] text-lg font-semibold">Shashank Kumar</h4>
                  <p className="text-[#f2da1d] text-sm mt-1">Sales & Marketing Assistant</p>

                  <div className="space-x-6 mt-4 flex items-center justify-center">
                    <a href="https://instagram.com/_25_aj/" target='_blank'>
                      <button type="button" className="w-12 h-12 inline-flex items-center justify-center rounded-full border-none outline-none bg-[#f2da1d] hover:bg-[#f2da1d] shadow-md transition-all duration-300">
                        <img src={insta} alt="" className='h-7'/>
                      </button>
                    </a>

                    <a href="https://www.linkedin.com/in/ayush-jaiswal25/" target="_blank">
                      <button type="button" class="w-12 h-12 inline-flex items-center justify-center rounded-full border-none outline-none bg-[#33806b] hover:bg-[#33806b] shadow-md transition-all duration-300">
                        <svg xmlns="http://www.w3.org/2000/svg" width="18px" class="fill-white w-6 h-6" viewBox="0 0 24 24">
                          <path d="M23.994 24v-.001H24v-8.802c0-4.306-.927-7.623-5.961-7.623-2.42 0-4.044 1.328-4.707 2.587h-.07V7.976H8.489v16.023h4.97v-7.934c0-2.089.396-4.109 2.983-4.109 2.549 0 2.587 2.384 2.587 4.243V24zM.396 7.977h4.976V24H.396zM2.882 0C1.291 0 0 1.291 0 2.882s1.291 2.909 2.882 2.909 2.882-1.318 2.882-2.909A2.884 2.884 0 0 0 2.882 0z" fill="#f2da1d" />
                        </svg>
                      </button>
                    </a>    
                  </div>
                </div>
              </div>
            </div>



            {/* Social Media */}
            <h3 className="text-[#f2da1d] text-2xl font-semibold mt-12 text-center">Social Media</h3>
            <div className="mx-auto max-w-4xl mt-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 md:gap-8">
    
                {/* Member 1 */}
                <div className="bg-white py-6 px-4 shadow-xl rounded-lg hover:scale-105 transition-all duration-300">
                  <img src={Tanu} alt="Member 1" className="w-36 h-36 rounded-full mx-auto border-4 border-[#33806b] shadow-md" />
                  {/* <h1 className="w-36 h-36 rounded-full mx-auto border-4 flex justify-center items-center border-[#33806b] shadow-md">TS</h1> */}
                  <div className="text-center mt-4">
                    <h4 className="text-[#33806b] text-lg font-semibold">Tanu Sharma</h4>
                    <p className="text-[#f2da1d] text-sm mt-1">Social Media Manager</p>

                    <div className="space-x-6 mt-4 flex items-center justify-center">
                      <a href="https://www.instagram.com/with.tanuuuu" target='_blank'>
                        <button type="button" className="w-12 h-12 inline-flex items-center justify-center rounded-full border-none outline-none bg-[#f2da1d] hover:bg-[#f2da1d] shadow-md transition-all duration-300">
                          <img src={insta} alt="" className='h-7'/>
                        </button>
                      </a>

                      <a href="https://www.linkedin.com/in/ayush-jaiswal25/" target="_blank">
                        <button type="button" class="w-12 h-12 inline-flex items-center justify-center rounded-full border-none outline-none bg-[#33806b] hover:bg-[#33806b] shadow-md transition-all duration-300">
                          <svg xmlns="http://www.w3.org/2000/svg" width="18px" class="fill-white w-6 h-6" viewBox="0 0 24 24">
                            <path d="M23.994 24v-.001H24v-8.802c0-4.306-.927-7.623-5.961-7.623-2.42 0-4.044 1.328-4.707 2.587h-.07V7.976H8.489v16.023h4.97v-7.934c0-2.089.396-4.109 2.983-4.109 2.549 0 2.587 2.384 2.587 4.243V24zM.396 7.977h4.976V24H.396zM2.882 0C1.291 0 0 1.291 0 2.882s1.291 2.909 2.882 2.909 2.882-1.318 2.882-2.909A2.884 2.884 0 0 0 2.882 0z" fill="#f2da1d" />
                          </svg>
                        </button>
                      </a>  
                    </div>

                  </div>
                </div>

                {/* Member 2 */}
                <div className="bg-white py-6 px-4 shadow-xl rounded-lg hover:scale-105 transition-all duration-300">
                  <img src={Arsh} alt="Member 2" className="w-36 h-36 rounded-full mx-auto border-4 border-[#33806b] shadow-md" />
                  {/* <h1 className="w-36 h-36 rounded-full mx-auto border-4 flex justify-center items-center border-[#33806b] shadow-md">AS</h1> */}
                  <div className="text-center mt-4">
                    <h4 className="text-[#33806b] text-lg font-semibold">Arsh Srivastava</h4>
                    <p className="text-[#f2da1d] text-sm mt-1">Content Strategist</p>

                    <div className="space-x-6 mt-4 flex items-center justify-center">
                      <a href="https://www.instagram.com/arsh_h26/" target='_blank'>
                        <button type="button" className="w-12 h-12 inline-flex items-center justify-center rounded-full border-none outline-none bg-[#f2da1d] hover:bg-[#f2da1d] shadow-md transition-all duration-300">
                          <img src={insta} alt="" className='h-7'/>
                        </button>
                      </a>

                      <a href="https://www.linkedin.com/in/ayush-jaiswal25/" target="_blank">
                        <button type="button" class="w-12 h-12 inline-flex items-center justify-center rounded-full border-none outline-none bg-[#33806b] hover:bg-[#33806b] shadow-md transition-all duration-300">
                          <svg xmlns="http://www.w3.org/2000/svg" width="18px" class="fill-white w-6 h-6" viewBox="0 0 24 24">
                            <path d="M23.994 24v-.001H24v-8.802c0-4.306-.927-7.623-5.961-7.623-2.42 0-4.044 1.328-4.707 2.587h-.07V7.976H8.489v16.023h4.97v-7.934c0-2.089.396-4.109 2.983-4.109 2.549 0 2.587 2.384 2.587 4.243V24zM.396 7.977h4.976V24H.396zM2.882 0C1.291 0 0 1.291 0 2.882s1.291 2.909 2.882 2.909 2.882-1.318 2.882-2.909A2.884 2.884 0 0 0 2.882 0z" fill="#f2da1d" />
                          </svg>
                        </button>
                      </a>  
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* <p className='text-sm mt-16 md:text-base lg:text-lg text-gray-700 text-justify'>Together, Harshika and Ayush are on a mission to bridge the gap between households and skilled professionals — from electricians and plumbers to housemaids and priests. Their complementary strengths, combined with an unshakable belief in grassroots innovation, are laying the foundation for India’s next big service-tech revolution.</p> */}
          </div>
        </div>
      </div>
    </div>
  )
}

export default About
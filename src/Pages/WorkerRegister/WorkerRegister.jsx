// Package
import React, { useContext, useEffect } from 'react'

// Utils
import WorkerInfo from '../../Utils/WorkerInfo'

// Components
import WorkerForm from '../../Components/WorkerForm/WorkerForm'
import ServiceForm from '../../Components/WorkerForm/ServiceForm'
import { showSignUpForm } from '../../Components/SignUpForm/signUp'

// Assets
import NoFees from '../../Assets/Register Page/no-fee_G.png'
import Customer from '../../Assets/Register Page/customer_G.png'
import Work from '../../Assets/Register Page/work_G.png'

// Functions
import { toggleServiceForm, toggleWorkerForm } from '../../Components/WorkerForm/funcWorkerForm'
import { toastFailure } from '../../func'
import { MyContext } from '../../ContextAPI'

function WorkerRegister() {
  const { SessionID, WorkerFormData, ServiceFormData } = useContext(MyContext);
   

  return (
    <div className="bg-white overflow-x-hidden">
      {WorkerFormData.isWorker ? 
        <div>{ServiceFormData.isService ? "" : <ServiceForm />}</div> 
        :
        <WorkerForm /> 
      }

      {/* Hero Section */}
      <section className="relative isolate flex flex-col justify-center items-center text-center px-6 lg:px-28 py-20 bg-gradient-to-br from-[#e0f7f2] to-white">



        <div className="absolute inset-x-0 top-[calc(50%-30rem)] -z-10 transform-gpu blur-3xl">
          <div className="relative left-[calc(50%-11rem)] w-[36rem] aspect-[1155/678] bg-gradient-to-tr from-[#5aeaa2] to-[#89fcb3] opacity-30 rotate-30"></div>
        </div>
        <h1 className="text-4xl sm:text-6xl font-extrabold text-[#33806b] mb-6 mt-6">Register with Pro Work<br/>  Grow Your Business Online</h1>
        <p className="text-lg sm:text-xl text-gray-600 mb-10 max-w-2xl">No commission for new shops—reach thousands of customers daily with ease.</p>

        <div className="flex flex-col sm:flex-row gap-4">
          <button 
            onClick={() =>
              SessionID.SessionID == undefined
                ? 
                      setTimeout(() => {  showSignUpForm() }, 800)
                      
                :
             WorkerFormData.isWorker ? toggleServiceForm(true) : toggleWorkerForm(true)} className="px-6 py-3 bg-[#f2da1d] text-[#33806b] font-bold rounded-full shadow-lg hover:bg-yellow-300 transition">
            Register Shop
          </button>
          <button onClick={() => window.scrollTo({ top: 500, behavior: "smooth" })} className="px-6 py-3 text-gray-700 font-medium hover:underline transition">
            Learn More →
          </button>
        </div>

        <div className="absolute inset-x-0 bottom-[calc(100%-20rem)] -z-10 transform-gpu blur-3xl">
          <div className="left-[calc(50%+3rem)] w-[36rem] aspect-[1155/678] bg-gradient-to-tr from-[#48dcd7] to-[#9089fc] opacity-30 -translate-x-1/2"></div>
        </div>
      </section>

      {/* Why Choose Us */}

      <section className="py-16 px-6 lg:px-20 bg-white">
  <div className="text-center max-w-3xl mx-auto mb-16">
    <h2 className="text-4xl font-extrabold text-[#33806b] mb-4">
      Why Choose <span className="text-[#f2da1d]">Pro Work?</span>
    </h2>
    <p className="text-gray-600 text-lg">
      Pro Work empowers local professionals to grow their presence, gain consistent work, build trust, and thrive in a digital-first world — all without complex tools.
    </p>
  </div>

  <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
    {[
      {
        img: Customer,
        title: "More New Customers",
        desc: "We connects workers with more local customers daily, helping them increase visibility and grow their income consistently."
      },
      {
        img: NoFees,
        title: "20% Commission Only",
        desc: "We charge only a 20% commission, allowing workers to keep 80% of their earnings while gaining access to more customers and consistent work."
      },
      {
        img: Work,
        title: "Work Flexibility",
        desc: "We offers full work flexibility, professionals choose when, where, and how much they want to work, ensuring freedom and better work."
      },
    ].map((item, idx) => (
      <div
        key={idx}
        className="group bg-[#f9fafb] rounded-3xl p-8 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 border border-[#33806b]/10"
      >
        {/* Icon */}
        <div className="mb-6 w-16 h-16 flex items-center justify-center rounded-xl border-4 border-[#f2da1d] bg-[#33806b]/10 group-hover:bg-[#33806b]/20 transition">
          <img src={item.img} alt={item.title} className="w-12 h-12" />
        </div>

        {/* Title */}
        <h4 className="text-xl font-bold text-[#33806b] mb-3 group-hover:text-[#245c4f] transition">
          {item.title}
        </h4>

        {/* Description */}
        <p className="text-gray-600 text-sm leading-relaxed">
          {item.desc}
        </p>
      </div>
    ))}
  </div>
</section>



  {/* Optional: Add Testimonials, Stats, FAQ, CTA */}

  

{/* <section className="bg-white py-16 px-6 lg:px-20">
  <div className="text-center max-w-3xl mx-auto mb-12">
    <h2 className="text-3xl font-bold text-[#33806b] mb-4">Our Impact</h2>
    <p className="text-gray-600">Helping professionals grow across India.</p>
  </div>
  <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
    {[
      { label: "Professionals", value: "25,000+" },
      { label: "Bookings Completed", value: "120K+" },
      { label: "Cities Served", value: "50+" },
      { label: "Avg Rating", value: "4.8/5" },
    ].map((stat, idx) => (
      <div key={idx}>
        <h3 className="text-3xl font-extrabold text-[#f2da1d]">{stat.value}</h3>
        <p className="text-gray-600 font-medium mt-1">{stat.label}</p>
      </div>
    ))}
  </div>
</section> */}


{/* <section className="bg-[#f9fafb] py-16 px-6 lg:px-20">
  <div className="text-center max-w-3xl mx-auto mb-12">
    <h2 className="text-3xl font-bold text-[#33806b] mb-4">Frequently Asked Questions</h2>
  </div>
  <div className="max-w-4xl mx-auto space-y-6">
    {[
      {
        question: "How much does it cost to join Pro Work?",
        answer: "Creating an account is free. We charge a flat 20% commission per booking — no hidden fees.",
      },
      {
        question: "How do I get customers?",
        answer: "Once you register, your shop is listed online. Customers can find and book you directly.",
      },
      {
        question: "Can I set my own schedule?",
        answer: "Absolutely. You control your availability, services, and pricing — full flexibility.",
      },
    ].map((faq, idx) => (
      <div key={idx} className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
        <h4 className="text-lg font-semibold text-[#33806b] mb-2">{faq.question}</h4>
        <p className="text-gray-600">{faq.answer}</p>
      </div>
    ))}
  </div>
</section> */}


{/* <section className="bg-[#33806b] py-16 px-6 lg:px-20 text-white text-center">
  <h2 className="text-3xl sm:text-4xl font-bold mb-4">Ready to Grow Your Business?</h2>
  <p className="text-lg mb-8">Join thousands of local professionals using Pro Work to find new customers and earn more.</p>
  <button
    onClick={() => {}}
    className="bg-[#f2da1d] text-[#33806b] font-bold px-6 py-3 rounded-full shadow-md hover:bg-yellow-400 transition"
  >
    Get Started Now
  </button>
</section> */}


</div>
        


    )
}

export default WorkerRegister
import React from "react";

import { Helmet } from 'react-helmet'
const testimonials = [
  {
    name: "Anjali Verma",
    role: "Home Cleaning Service Customer",
    feedback:
      "ProWork made it so easy to book a cleaning service. The staff was punctual, polite, and did a fantastic job!",
  },
  {
    name: "Ravi Sharma",
    role: "Electrician Service Customer",
    feedback:
      "I booked an electrician through ProWork and was amazed by the speed and quality of service. Highly recommend it!",
  },
  {
    name: "Sana Sheikh",
    role: "Salon at Home Customer",
    feedback:
      "The beautician arrived on time and followed hygiene practices perfectly. ProWork really understands what customers want!",
  },
];

export default function Feedback() {
  return (
    <div className='flex flex-col pt-20 w-screen mt-8'>
        <Helmet><title>Pro Work - Feedback</title></Helmet>
      <div className="max-w-5xl mx-auto">
        <h1 className="text-4xl font-bold text-green-900 text-center mb-8">What Our Customers Say</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl p-6 shadow-md border border-green-200 hover:shadow-lg transition-all"
            >
              <p className="text-green-800 italic mb-4">"{testimonial.feedback}"</p>
              <h3 className="text-green-900 font-semibold text-lg">{testimonial.name}</h3>
              <p className="text-green-700 text-sm">{testimonial.role}</p>
            </div>
          ))}
        </div>
      </div>

        {/* <section className="bg-[#f9fafb] py-20 px-6 lg:px-20">
  <div className="text-center max-w-3xl mx-auto mb-16">
    <h2 className="text-4xl font-extrabold text-[#33806b] mb-4">
      What Our <span className="text-[#f2da1d]">Users Say</span>
    </h2>
    <p className="text-gray-600 text-lg">
      Honest feedback from customers and professionals using Pro Work every day.
    </p>
  </div>

  <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3 max-w-6xl mx-auto">
    {[
      {
        name: "Ravi Kumar",
        role: "Electrician",
        feedback: "Pro Work helped me find clients in my area within days. It’s easy to use and highly effective.",
      },
      {
        name: "Anjali Sharma",
        role: "Beautician",
        feedback: "I was skeptical, but now I have regular bookings through Pro Work. Highly recommended!",
      },
      {
        name: "Mohammed Irfan",
        role: "Plumber",
        feedback: "This platform changed my income completely. No tech skills needed, just real work.",
      },
      {
        name: "Priya Nair",
        role: "Home Cleaner",
        feedback: "I love the flexibility. I choose when I work, and get paid on time. It’s a game changer!",
      },
      {
        name: "Vikas Mehta",
        role: "AC Repair Technician",
        feedback: "From zero to 10+ customers in my first week. Pro Work makes business easy.",
      },
      {
        name: "Sana Qureshi",
        role: "Makeup Artist",
        feedback: "The best platform I’ve used. Transparent commission, good support, and lots of customers.",
      },
    ].map((t, idx) => (
      <div
        key={idx}
        className="bg-white p-8 rounded-3xl border border-[#33806b]/10 shadow hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
      >
        <p className="text-[#33806b] italic mb-6 leading-relaxed">“{t.feedback}”</p>
        <hr className="border-t border-[#f2da1d] w-12 mb-4" />
        <h4 className="text-[#33806b] font-semibold text-lg">{t.name}</h4>
        <p className="text-sm text-gray-500">{t.role}</p>
      </div>
    ))}
  </div>
</section> */}


<section className="bg-[#f9fafb] py-16 px-6 lg:px-20">
  <div className="text-center max-w-3xl mx-auto mb-12">
    <h2 className="text-3xl font-bold text-[#33806b] mb-4">What Our Worker Say</h2>
    <p className="text-gray-600">Real feedback from professionals growing their business with Pro Work.</p>
  </div>
  <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
    {[
      {
        name: "Ravi Kumar",
        role: "Electrician",
        feedback: "Pro Work helped me find clients in my area within days. It’s easy to use and highly effective.",
      },
      {
        name: "Anjali Sharma",
        role: "Beautician",
        feedback: "I was skeptical, but now I have regular bookings through Pro Work. Highly recommended!",
      },
      {
        name: "Mohammed Irfan",
        role: "Plumber",
        feedback: "This platform changed my income completely. No tech skills needed, just real work.",
      },
    ].map((t, idx) => (
      <div key={idx} className="bg-white p-6 rounded-2xl shadow-md border border-[#33806b]/10">
        <p className="text-gray-700 mb-4 italic">“{t.feedback}”</p>
        <h4 className="text-[#33806b] font-bold">{t.name}</h4>
        <span className="text-sm text-gray-500">{t.role}</span>
      </div>
    ))}
  </div>
</section>
    </div>
  );
}

import React, { useState } from 'react'
import { Helmet } from 'react-helmet'
import './Contact.css'
import { toastSuccess, toastFailure } from '../../func';


import gmail from '../../Assets/gmail.png'
import mobile from '../../Assets/mobile.png'
import whatsapp from '../../Assets/whatsapp.png'

const Contact = () => {
  const supportEmail = "prowork24.7customercare@gmail.com";
  const phoneNumber = "+919450066558";

  // Contact Form State
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
  e.preventDefault();
  
  try {
    const response = await fetch('http://localhost:5000/api/contact', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });

    if (response.ok) {
      // The request was successful
      toastSuccess('Message sent successfully!');
      setFormData({ name: '', email: '', message: '' }); // Clear the form
    } else {
      // The server returned an error
      const errorData = await response.json();
      toastFailure(`Failed to send message: ${errorData.message}`);
    }
  } catch (error) {
    // A network or other error occurred
    console.error('There was an error sending the message:', error);
    toastFailure('An error occurred. Please try again later.');
  }
};

  function redirectToWhatsApp() {
    const number = 918400732040;
    const message = encodeURIComponent("Hello! I would like to inquire about your services on ProWork.");
    const url = `https://wa.me/${number}?text=${message}`;
    window.open(url, "_blank"); // Opens in a new tab
  }

  return (
    <div className='flex flex-col pt-20 w-full min-h-screen mt-8'>
      <Helmet>
        <title>Pro Work - Contact Us</title>
        <meta
          name="description"
          content="Need help? Contact ProWork support team for queries, bookings, complaints or partnerships. We’re here to help you in Prayagraj."
        />
        <link rel="canonical" href="https://prowork.org.in/contact-us" />
      </Helmet>
      <img src={whatsapp} alt="Whats App logo" className='fixed h-12 right-4 bottom-4 z-50 cursor-pointer' onClick={redirectToWhatsApp} />
      <div className="w-full max-w-[1250px] mx-auto px-4 xl:px-0 mb-8">
        <div className="mb-8">
          <h1 className='text-3xl md:text-4xl lg:text-5xl mb-4 text-[#33806b]'>Contact Us</h1>
          <p className='text-sm md:text-base lg:text-lg text-gray-700 text-justify'>We’d love to hear from you! Whether you have a question or need support, we’re here to help.</p>
        </div>

       
        <div className="w-full mt-8 lg:mt-0 flex flex-wrap bg-white shadow-lg rounded-lg border border-gray-200">
          <div className='w-full md:w-1/2 p-4 lg:p-8'>
            <h2 className="text-3xl font-bold mb-6">Send Us a Message</h2>

            <form onSubmit={handleSubmit} className="space-y-4 w-full">
              <input
                type="text"
                name="name"
                placeholder="Your Name"
                value={formData.name}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3A9D8A] transition duration-300"
                required
              />
              <input
                type="email"
                name="email"
                placeholder="Your Email"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3A9D8A] transition duration-300"
                required
              />
              <textarea
                name="message"
                placeholder="Your Message"
                value={formData.message}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3A9D8A] transition duration-300"
                rows="5"
                required
              />
              <button type="submit" className="w-full bg-[#3A9D8A] text-white py-3 px-6 rounded-lg font-semibold hover:bg-[#2f8a77] transition duration-300">Send Message</button>
            </form>           
          </div>

          <div className="w-full md:w-1/2 py-6 md:py-0 flex flex-wrap justify-center items-center">
            <div className='mt-2 shadow-2xl sm:h-48 sm:w-96 m-4 sm:m-0 p-4 rounded-xl border-gray-700 flex flex-wrap'>
              <h2 className='w-full text-2xl'>Need help? Reach us here.</h2>
              <a className="flex justify-center items-center  py-3 pr-4 rounded-lg font-semibold transition duration-300 "
                href={`https://mail.google.com/mail/?view=cm&fs=1&to=${supportEmail}`}
                target="_blank" rel="noopener noreferrer"
              >
                <img src={gmail} alt="" className='h-20 g h gmail' />
              </a>

              <a className="flex justify-center items-center  py-3 pl-4 rounded-lg font-semibold transition duration-300" href={`tel:${phoneNumber}`}>
                <img src={mobile} alt="" className=' g h link' />
              </a>
            </div>

            <div className='mt-2 shadow-2xl sm:h-48 sm:w-96 m-4 sm:m-0 p-4 rounded-xl border-gray-700 flex flex-wrap'>
              <h2 className='w-full text-2xl'>Any other issue?.</h2>
              <h2 className='w-full text-base text text-gray-500'>We truly understands your concern and is committed to resolving your issues with utmost care. Contact us here!</h2>            
            </div>
          </div>

          
        </div>
      </div>
    </div>
  );
};

export default Contact;


//backend
// Define a schema for your contact messages
// const contactSchema = new mongoose.Schema({
//   name: { type: String, required: true },
//   email: { type: String, required: true },
//   message: { type: String, required: true },
//   date: { type: Date, default: Date.now }
// });

// const Contact = mongoose.model('Contact', contactSchema);

// // API Endpoint
// app.post('/api/contact', async (req, res) => {
//   try {
//     const { name, email, message } = req.body;
//     const newContact = new Contact({ name, email, message });
//     await newContact.save();
//     res.status(201).json({ message: 'Message saved successfully!' });
//   } catch (error) {
//     res.status(500).json({ message: 'Server error', error: error.message });
//   }
// });
import React from 'react';
// Importing icons for visual interest
import { Mail, Phone, MessageCircle, HeartHandshake } from 'lucide-react'; 

export default function Contact() {
  return (
    <section className="mt-8 p-8 rounded-xl shadow-2xl bg-white/90 text-gray-900 fade-in">
      <div className="flex items-center mb-6 border-b pb-4">
        <HeartHandshake className="w-8 h-8 mr-3 text-indigo-600" />
        <h2 className="text-3xl font-bold text-indigo-700">Contact & Support</h2>
      </div>
      
      {/* Attractive Saying 1 */}
      <p className="text-xl font-medium mb-2 text-indigo-900 flex items-center">
        <MessageCircle className="w-5 h-5 mr-2 text-pink-500" /> 
        We're here to ensure your concert experience is flawless!
      </p>
      
      {/* Existing Message (Slightly improved) */}
      <p className="text-lg mb-8 text-gray-700">
        Have a question about your registration, tickets, or payment? Our dedicated support team is ready to help.
      </p>

      {/* Contact Details */}
      <div className="space-y-6">
        
        {/* Email Support Section */}
        <div className="p-4 bg-indigo-50 rounded-lg border-l-4 border-indigo-500">
          <p className="font-semibold text-lg text-indigo-800 flex items-center">
            <Mail className="w-5 h-5 mr-3" /> Dedicated Email Support:
          </p>
          {/* Attractive Saying 2 */}
          <p className="text-sm text-gray-600 ml-8 mb-2">
            **Your inquiry is our priority.** Expect a response within 24 hours!
          </p>
          <a 
            href="mailto:support@danconcerts.com" 
            className="text-pink-600 font-bold hover:text-pink-800 transition ml-8"
          >
            support@danconcerts.com
          </a>
        </div>
         
        {/* Phone Support Section */}
        <div className="p-4 bg-pink-50 rounded-lg border-l-4 border-pink-500">
          <p className="font-semibold text-lg text-pink-800 flex items-center">
            <Phone className="w-5 h-5 mr-3" /> Call Our Hotline:
          </p>
          {/* Attractive Saying 3 */}
          <p className="text-sm text-gray-600 ml-8 mb-2">
            Need immediate assistance? Give us a call during business hours.
          </p>
          <p className="font-bold text-gray-800 ml-8">
            (123) 456-7890 
            <span className="text-sm text-gray-500 ml-3">(Mon-Fri, 9am-5pm PST)</span>
          </p>
        </div>
        
      </div>
    </section>
  );
}
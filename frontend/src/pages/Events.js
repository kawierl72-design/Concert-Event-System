import React from 'react';
// 🛑 FIX: Import the required icons from 'lucide-react'
import { Megaphone, MapPin, Calendar, Users } from 'lucide-react';

export default function Events() {
  return (
    <section className="mt-8 p-8 rounded-xl shadow-2xl bg-white/90 text-gray-900 fade-in">
      <h2 className="text-4xl font-extrabold text-indigo-700 mb-6 border-b pb-2">Upcoming Events 📅</h2>
      
      <p className="text-lg mb-8 text-gray-700">
        Here you can find details for all concerts hosted by DAN LIVE CONCERTS, including what each show is about and where it will be held.
      </p>

      {/* Event Listing Container */}
      <div className="space-y-8">
        
        {/* --- EVENT 1: KAPOKAW VLOGS CONCERT --- */}
        <div className="p-6 bg-white border border-indigo-200 rounded-lg shadow-md hover:shadow-xl transition duration-300">
          <h3 className="text-2xl font-bold text-indigo-600 mb-3 flex items-center">
            <Megaphone className="w-6 h-6 mr-3 text-pink-500" /> 
            KAPOKAW VLOGS CONCERT
          </h3>
          
          <div className="space-y-2 text-gray-700 ml-9">
            <p className="font-semibold text-lg text-gray-800">What It's All About:</p>
            <p>
              Experience a night of fun, laughter, and high energy as the popular **Kapokaw Vlogs** crew takes the stage! This concert blends live music performances with hilarious skit comedy, fan interaction, and the premiere of exclusive vlog content. Expect special guest appearances and a memorable show that goes beyond a typical concert.
            </p>
            
            <div className="flex items-center pt-2">
              <MapPin className="w-5 h-5 mr-3 text-indigo-500 flex-shrink-0" />
              <span className="font-semibold">Venue:</span> 
              <span className="ml-2">Star Arena, Quezon City</span>
            </div>
            <div className="flex items-center">
              <Calendar className="w-5 h-5 mr-3 text-indigo-500 flex-shrink-0" />
              <span className="font-semibold">Date:</span> 
              <span className="ml-2">December 12, 2025</span>
            </div>
          </div>
        </div>

        {/* --- EVENT 2: MARK IVAN CONCERT DIVA --- */}
        <div className="p-6 bg-white border border-pink-200 rounded-lg shadow-md hover:shadow-xl transition duration-300">
          <h3 className="text-2xl font-bold text-pink-600 mb-3 flex items-center">
            <Users className="w-6 h-6 mr-3 text-indigo-500" /> 
            MARK IVAN CONCERT DIVA
          </h3>
          
          <div className="space-y-2 text-gray-700 ml-9">
            <p className="font-semibold text-lg text-gray-800">What It's All About:</p>
            <p>
              Join **Mark Ivan**, the viral sensation, for his spectacular "Concert Diva." This show is a dazzling celebration of pop music, featuring powerful vocal performances, elaborate costume changes, and choreography that pays tribute to legendary divas. A guaranteed night of glamour and hit songs that will keep you dancing.
            </p>
            
            <div className="flex items-center pt-2">
              <MapPin className="w-5 h-5 mr-3 text-pink-500 flex-shrink-0" />
              <span className="font-semibold">Venue:</span> 
              <span className="ml-2">The Grand Ballroom, Manila</span>
            </div>
            <div className="flex items-center">
              <Calendar className="w-5 h-5 mr-3 text-pink-500 flex-shrink-0" />
              <span className="font-semibold">Date:</span> 
              <span className="ml-2">January 10, 2026</span>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
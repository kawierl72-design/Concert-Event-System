import React from 'react';
import { Ticket, Zap, ShieldCheck, ArrowRight } from 'lucide-react';

export default function Home() {
  return (
    <div
      className="text-white min-h-screen bg-cover bg-center bg-fixed bg-no-repeat relative"
      style={{ backgroundImage: "url('/picture2.jpg')" }}
    >
      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/50"></div>

      {/* Page Content */}
      <div className="relative z-10">

        {/* ========================================= */}
        {/* 1. HERO SECTION */}
        {/* ========================================= */}
        <section className="mt-8 fade-in">
          <div className="p-10 rounded-3xl shadow-2xl bg-white/10 backdrop-blur-md border border-white/20 mx-auto max-w-5xl">
            <div className="flex flex-col md:flex-row gap-12 items-center">

              {/* Main CTA Section */}
              <div className="flex-1">
                <h1 className="text-5xl font-extrabold text-white leading-tight">
                  DAN LIVE CONCERTS — Get Your Tickets Now
                </h1>
                <p className="mt-4 text-lg text-indigo-100">
                  Experience the energy! Register securely, pay instantly, and receive your digital e-ticket (QR + PDF) by email.
                </p>
                <div className="mt-8">
                  <a 
                    href="/register"
                    className="btn-raise inline-flex items-center px-8 py-3 text-xl font-bold rounded-full 
                               bg-gradient-to-r from-indigo-500 to-pink-500 hover:from-indigo-600 hover:to-pink-600 
                               transition-all duration-300 shadow-xl shadow-indigo-500/40"
                  >
                    <Ticket className="w-6 h-6 mr-3" />
                    Register Now
                  </a>
                </div>
              </div>

              {/* Next Events Block */}
              <div className="w-full md:w-80 flex-shrink-0">
                <div className="bg-white rounded-xl p-6 shadow-xl text-gray-800">
                  <h3 className="text-xl font-bold flex items-center mb-4 text-indigo-700">
                    Next Events
                  </h3>

                  <ol className="space-y-4 text-base">

                    {/* Rock Night */}
                    <li className="p-3 bg-gray-50 rounded-lg shadow-sm border-l-4 border-indigo-500">
                      <div className="flex justify-between items-center">
                        <span className="font-semibold">Rock Night</span>
                        <span className="text-sm text-gray-600">Dec 12, 2025</span>
                      </div>
                      <p className="text-indigo-700 text-sm mt-1 font-semibold">
                        Ticket Price: ₱1,200
                      </p>
                    </li>

                    {/* Pop Fiesta */}
                    <li className="p-3 bg-gray-50 rounded-lg shadow-sm border-l-4 border-pink-500">
                      <div className="flex justify-between items-center">
                        <span className="font-semibold">Pop Fiesta</span>
                        <span className="text-sm text-gray-600">Jan 10, 2026</span>
                      </div>
                      <p className="text-pink-700 text-sm mt-1 font-semibold">
                        Ticket Price: ₱900
                      </p>
                    </li>

                  </ol>
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* ========================================= */}
        {/* 2. Why Choose Us (Features) */}
        {/* ========================================= */}
        <section className="mt-20 px-4">
          <h2 className="text-4xl font-extrabold text-center text-white mb-12">
            Why Book With DAN LIVE?
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            
            {/* Feature Card 1 */}
            <div className="p-6 bg-white/10 rounded-xl border border-white/20 text-center shadow-lg hover:shadow-2xl transition duration-300">
              <Zap className="w-10 h-10 mx-auto text-pink-400 mb-4" />
              <h3 className="text-xl font-semibold mb-2">Instant Delivery</h3>
              <p className="text-indigo-100 text-sm">
                Your e-ticket (QR/PDF) is sent to your email immediately after payment verification.
              </p>
            </div>

            {/* Feature Card 2 */}
            <div className="p-6 bg-white/10 rounded-xl border border-white/20 text-center shadow-lg hover:shadow-2xl transition duration-300">
              <ShieldCheck className="w-10 h-10 mx-auto text-green-400 mb-4" />
              <h3 className="text-xl font-semibold mb-2">Secure Transactions</h3>
              <p className="text-indigo-100 text-sm">
                We use industry-leading encryption to keep your payment details safe.
              </p>
            </div>

            {/* Feature Card 3 */}
            <div className="p-6 bg-white/10 rounded-xl border border-white/20 text-center shadow-lg hover:shadow-2xl transition duration-300">
              <Ticket className="w-10 h-10 mx-auto text-yellow-300 mb-4" />
              <h3 className="text-xl font-semibold mb-2">Priority Ticketing</h3>
              <p className="text-indigo-100 text-sm">
                Secure your concert seat instantly with priority ticketing.
              </p>
            </div>

          </div>
        </section>

        {/* ========================================= */}
        {/* GCASH PAYMENT SECTION */}
        {/* ========================================= */}
        <section className="mt-20 px-4">
          <div className="max-w-3xl mx-auto bg-white/10 backdrop-blur-md border border-white/20 p-10 rounded-3xl shadow-xl">

            <h2 className="text-3xl font-extrabold text-center mb-6 text-white">
              GCash Payment Information
            </h2>

            <p className="text-center text-indigo-100 text-lg mb-6">
              You may pay using our official GCash number or scan the QR code below.
            </p>

            {/* GCash Number */}
            <div className="text-center mb-10">
              <p className="text-xl font-bold text-pink-300">GCash Number:</p>
              <p className="text-3xl font-extrabold mt-2 text-white tracking-widest">
                0956 362 6553
              </p>
            </div>

            {/* QR Code */}
            <div className="flex justify-center">
              <img 
                src="/picture1.png"
                alt="GCash QR Code"
                className="w-60 h-60 rounded-xl shadow-lg border border-white/20"
              />
            </div>

            <p className="text-center text-indigo-200 mt-6 text-sm">
              After payment, upload your screenshot on the registration form.
            </p>

          </div>
        </section>

        {/* ========================================= */}
        {/* 3. SECONDARY CTA */}
        {/* ========================================= */}
        <section className="mt-20 mb-10 p-12 bg-indigo-900/40 rounded-xl max-w-4xl mx-auto shadow-2xl border border-indigo-700">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-white mb-4">
              Ready to Attend?
            </h2>
            <p className="text-lg text-indigo-200 mb-8">
              Browse our full list of events or contact support for assistance.
            </p>
            <div className="flex justify-center space-x-4">
              <a 
                href="/events"
                className="px-6 py-3 text-lg font-semibold rounded-full bg-pink-500 hover:bg-pink-600 transition duration-300 shadow-md flex items-center"
              >
                View All Events
              </a>
              <a 
                href="/contact"
                className="px-6 py-3 text-lg font-semibold rounded-full bg-white text-indigo-800 hover:bg-gray-200 transition duration-300 flex items-center"
              >
                Contact Support 
                <ArrowRight className="w-4 h-4 ml-2" />
              </a>
            </div>
          </div>
        </section>

      </div>
    </div>
  );
}

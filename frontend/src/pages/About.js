import React from "react";
import {
  Zap,
  ShieldCheck,
  Clock,
  Layers,
  Gauge,
  Barcode,
} from "lucide-react";

export default function About() {
  return (
    <section
      className="
        mt-12 p-10 rounded-2xl shadow-2xl 
        bg-white/90 text-gray-900 
        backdrop-blur-sm 
        animate-fade-slide
      "
    >
      {/* Title */}
      <h2 className="text-4xl font-extrabold text-indigo-700 mb-8 border-b pb-3">
        Behind the Scenes: The DAN LIVE System
      </h2>

      {/* Attractive Line 1 */}
      <div className="bg-pink-50 p-5 rounded-xl mb-8 flex items-center shadow-md border border-pink-100">
        <Zap className="w-7 h-7 mr-4 text-pink-600 flex-shrink-0" />
        <p className="text-xl font-semibold text-pink-900">
          Lightning-Fast Registration — Get your tickets in **seconds**.
        </p>
      </div>

      {/* Main description */}
      <p className="text-lg mb-6 text-gray-700 leading-relaxed">
        Our system is built using the modern **MERN stack**, designed to deliver
        a seamless, secure, and incredibly fast concert registration experience.
        Everything runs smoothly behind the scenes — so you can focus on the
        music, not the wait time.
      </p>

      {/* Attractive Line 2 */}
      <p className="text-lg font-bold text-indigo-800 flex items-center mb-8">
        <Layers className="w-5 h-5 mr-3 text-indigo-500" />
        Built with technology you can trust — engineered for reliability.
      </p>

      {/* FEATURE GRID */}
      <div className="grid md:grid-cols-2 gap-8 mt-4">
        {/* SECURITY CARD */}
        <div className="bg-white/95 p-6 rounded-xl border border-indigo-200 shadow-md">
          <h3 className="text-xl font-bold text-indigo-700 mb-4 flex items-center">
            <ShieldCheck className="w-7 h-7 mr-2 text-green-500" /> Security &
            Protection
          </h3>

          <ul className="space-y-3 text-gray-700">
            <li className="flex items-start">
              <span className="text-green-500 mr-2 mt-1">✓</span>
              <span>
                <strong>Secure Payment Processing:</strong> All payment data is
                encrypted and protected end-to-end.
              </span>
            </li>

            <li className="flex items-start">
              <span className="text-green-500 mr-2 mt-1">✓</span>
              <span>
                <strong>Instant E-Ticket Delivery:</strong> Get your unique QR +
                PDF ticket instantly via email.
              </span>
            </li>
          </ul>
        </div>

        {/* ADMIN CARD */}
        <div className="bg-white/95 p-6 rounded-xl border border-pink-200 shadow-md">
          <h3 className="text-xl font-bold text-pink-700 mb-4 flex items-center">
            <Gauge className="w-7 h-7 mr-2 text-pink-500" /> Administrative Power
          </h3>

          <ul className="space-y-3 text-gray-700">
            <li className="flex items-start">
              <span className="text-pink-500 mr-2 mt-1">✓</span>
              <span>
                <strong>Real-time Capacity Tracking:</strong> Always know how
                many tickets are left.
              </span>
            </li>

            <li className="flex items-start">
              <span className="text-pink-500 mr-2 mt-1">✓</span>
              <span>
                <strong>Full Admin Dashboard:</strong> Manage events, monitor
                sales, and control everything with ease.
              </span>
            </li>
          </ul>
        </div>
      </div>

      {/* FINAL LINE */}
      <p className="text-2xl text-center mt-12 pt-6 border-t border-gray-200 font-semibold text-gray-800 flex justify-center items-center">
        <Barcode className="w-7 h-7 mr-3 text-indigo-600" />
        Your ticket to the show is only a click away!
      </p>
    </section>
  );
}

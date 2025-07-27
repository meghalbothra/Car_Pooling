import React from 'react';
import { MapPin, Clock, Users, Leaf } from 'lucide-react';

export function Hero() {
  return (
    <div className="bg-gradient-to-r from-blue-200 via-blue-300 to-green-200 rounded-2xl p-8 mb-8 text-gray-800 shadow-lg">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-bold mb-4 text-center">
          Share the Journey, Share the Savings
        </h1>
        <p className="text-xl text-gray-700 text-center mb-8 max-w-2xl mx-auto">
          Connect with fellow commuters, reduce costs, and help the environment. 
          Every ride shared is a step towards a greener future.
        </p>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          <div className="bg-white/40 backdrop-blur-sm rounded-xl p-4 text-center">
            <MapPin className="h-8 w-8 mx-auto mb-2 text-blue-600" />
            <div className="font-semibold text-lg">Smart Routes</div>
            <div className="text-sm text-gray-600">Optimized paths for efficiency</div>
          </div>
          <div className="bg-white/40 backdrop-blur-sm rounded-xl p-4 text-center">
            <Clock className="h-8 w-8 mx-auto mb-2 text-green-600" />
            <div className="font-semibold text-lg">Flexible Times</div>
            <div className="text-sm text-gray-600">Find rides that fit your schedule</div>
          </div>
          <div className="bg-white/40 backdrop-blur-sm rounded-xl p-4 text-center">
            <Users className="h-8 w-8 mx-auto mb-2 text-purple-600" />
            <div className="font-semibold text-lg">Safe Community</div>
            <div className="text-sm text-gray-600">Trusted community members</div>
          </div>
          <div className="bg-white/40 backdrop-blur-sm rounded-xl p-4 text-center">
            <Leaf className="h-8 w-8 mx-auto mb-2 text-emerald-600" />
            <div className="font-semibold text-lg">Eco-Friendly</div>
            <div className="text-sm text-gray-600">Reduce your carbon footprint</div>
          </div>
        </div>
      </div>
    </div>
  );
}
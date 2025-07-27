import React, { useState } from 'react';
import { MapPin, Clock, Users, MessageCircle, Award } from 'lucide-react';
import { ContactModal } from './ContactModal';
import type { Ride, User } from '../App';

interface RideCardProps {
  ride: Ride;
  currentUser: User;
}

export function RideCard({ ride, currentUser }: RideCardProps) {
  const [showContact, setShowContact] = useState(false);

  const isOwnRide = ride.driverId === currentUser.id;

  return (
    <>
      <div className="bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden border border-gray-200 hover:border-blue-300">
        <div className="p-6">
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-center space-x-3">
              <img
                src={ride.driverAvatar}
                alt={ride.driverName}
                className="h-12 w-12 rounded-full object-cover ring-2 ring-gray-100 shadow-sm"
              />
              <div>
                <h3 className="font-semibold text-gray-900">{ride.driverName}</h3>
              </div>
            </div>
            {!isOwnRide && (
              <div className="flex items-center space-x-1 bg-green-50 text-green-600 px-2 py-1 rounded-full text-sm font-medium">
                <Award className="h-3 w-3" />
                <span>+25 pts</span>
              </div>
            )}
          </div>
          
          <div className="space-y-3 mb-4">
            <div className="flex items-start space-x-2">
              <MapPin className="h-4 w-4 text-blue-400 mt-0.5 flex-shrink-0" />
              <div className="text-sm">
                <div className="font-medium text-gray-900">{ride.from}</div>
                <div className="text-gray-600">to {ride.to}</div>
              </div>
            </div>
            
            <div className="flex items-center space-x-4 text-sm text-gray-600">
              <div className="flex items-center space-x-1">
                <Clock className="h-4 w-4 text-gray-400" />
                <span>{ride.date} at {ride.time}</span>
              </div>
            </div>
            
            <div className="flex items-center space-x-1 text-gray-600 text-sm">
              <Users className="h-4 w-4 text-gray-400" />
              <span>{ride.availableSeats} seats available</span>
            </div>
          </div>
          
          {ride.description && (
            <p className="text-sm text-gray-600 mb-4 bg-gray-25 p-3 rounded-lg" style={{backgroundColor: '#fafafa'}}>
              {ride.description}
            </p>
          )}
          
          <div className="border-t pt-4">
            <div className="text-xs text-gray-500 mb-3">Route:</div>
            <div className="flex flex-wrap gap-1">
              {ride.route.map((stop, index) => (
                <React.Fragment key={index}>
                  <span className="text-xs bg-gray-50 px-2 py-1 rounded-full text-gray-600">
                    {stop}
                  </span>
                  {index < ride.route.length - 1 && (
                    <span className="text-gray-400 text-xs self-center">→</span>
                  )}
                </React.Fragment>
              ))}
            </div>
          </div>
          
          {!isOwnRide && (
            <button
              onClick={() => setShowContact(true)}
              className="w-full mt-4 bg-gradient-to-r from-blue-400 to-green-400 text-white py-3 px-4 rounded-lg font-medium hover:from-blue-500 hover:to-green-500 transition-all duration-200 flex items-center justify-center space-x-2 shadow-sm hover:shadow-md"
            >
              <MessageCircle className="h-4 w-4" />
              <span>Request to Join</span>
            </button>
          )}
          
          {isOwnRide && (
            <div className="mt-4 bg-gray-50 text-gray-500 py-3 px-4 rounded-lg text-center font-medium">
              Your Ride Offer
            </div>
          )}
        </div>
      </div>
      
      {showContact && (
        <ContactModal
          ride={ride}
          currentUser={currentUser}
          onClose={() => setShowContact(false)}
        />
      )}
    </>
  );
}
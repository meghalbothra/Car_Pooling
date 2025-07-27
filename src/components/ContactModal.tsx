import React, { useState } from 'react';
import { X, MessageCircle, Award } from 'lucide-react';
import type { Ride, User } from '../App';

interface ContactModalProps {
  ride: Ride;
  currentUser: User;
  onClose: () => void;
}

export function ContactModal({ ride, currentUser, onClose }: ContactModalProps) {
  const [message, setMessage] = useState('');
  const [seats, setSeats] = useState(1);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
    setTimeout(() => {
      onClose();
    }, 2000);
  };

  if (isSubmitted) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
        <div className="bg-white rounded-xl p-8 max-w-md w-full text-center">
          <div className="bg-green-50 rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
            <Award className="h-8 w-8 text-green-500" />
          </div>
          <h3 className="text-xl font-bold text-gray-900 mb-2">Request Sent!</h3>
          <p className="text-gray-600 mb-4">
            Your ride request has been sent to {ride.driverName}. You'll receive a notification when they respond.
          </p>
          <div className="bg-green-25 border border-green-200 rounded-lg p-3" style={{backgroundColor: '#f0fdf4'}}>
            <div className="text-green-600 font-medium">+25 Points Earned!</div>
            <div className="text-green-500 text-sm">For making an eco-friendly choice</div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl shadow-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-gray-900">Contact Driver</h2>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <X className="h-5 w-5 text-gray-400" />
            </button>
          </div>
          
          <div className="bg-gray-50 rounded-lg p-4 mb-6">
            <div className="flex items-center space-x-3 mb-3">
              <img
                src={ride.driverAvatar}
                alt={ride.driverName}
                className="h-12 w-12 rounded-full object-cover"
              />
              <div>
                <h3 className="font-semibold text-gray-900">{ride.driverName}</h3>
              </div>
            </div>
            <div className="text-sm text-gray-600">
              <div>{ride.from} → {ride.to}</div>
              <div>{ride.date} at {ride.time}</div>
            </div>
          </div>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Number of seats needed
              </label>
              <select
                value={seats}
                onChange={(e) => setSeats(parseInt(e.target.value))}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-300 focus:border-transparent"
              >
                {Array.from({ length: ride.availableSeats }, (_, i) => i + 1).map(num => (
                  <option key={num} value={num}>{num} seat{num > 1 ? 's' : ''}</option>
                ))}
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Message to driver
              </label>
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Hi! I'd like to join your ride. I'm a punctual and friendly passenger."
                rows={4}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-300 focus:border-transparent"
              />
            </div>
            
            <div className="bg-blue-25 border border-blue-200 rounded-lg p-4" style={{backgroundColor: '#f0f9ff'}}>
              <div className="text-blue-600 font-medium text-sm mb-1">Trip Summary</div>
              <div className="text-blue-500 text-sm">
                Requesting {seats} seat{seats > 1 ? 's' : ''}
              </div>
            </div>
            
            <div className="bg-green-25 border border-green-200 rounded-lg p-4" style={{backgroundColor: '#f0fdf4'}}>
              <div className="flex items-center space-x-2">
                <Award className="h-4 w-4 text-green-500" />
                <span className="text-green-600 font-medium text-sm">Earn 25 points for this eco-friendly choice!</span>
              </div>
            </div>
            
            <div className="flex space-x-3 pt-4">
              <button
                type="button"
                onClick={onClose}
                className="flex-1 px-4 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 font-medium transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="flex-1 px-4 py-3 bg-gradient-to-r from-blue-400 to-green-400 text-white rounded-lg hover:from-blue-500 hover:to-green-500 font-medium transition-all duration-200 flex items-center justify-center space-x-2"
              >
                <MessageCircle className="h-4 w-4" />
                <span>Send Request</span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
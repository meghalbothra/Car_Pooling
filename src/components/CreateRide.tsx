import React, { useState } from 'react';
import { MapPin, Clock, Users, Plus, Award } from 'lucide-react';
import type { Ride } from '../App';

interface CreateRideProps {
  onSubmit: (ride: Omit<Ride, 'id' | 'driverId' | 'driverName' | 'driverAvatar'>) => void;
}

export function CreateRide({ onSubmit }: CreateRideProps) {
  const [formData, setFormData] = useState({
    from: '',
    to: '',
    date: '',
    time: '',
    availableSeats: 1,
    description: ''
  });
  const [route, setRoute] = useState<string[]>(['']);

  const addRouteStop = () => {
    setRoute(prev => [...prev, '']);
  };

  const updateRouteStop = (index: number, value: string) => {
    setRoute(prev => prev.map((stop, i) => i === index ? value : stop));
  };

  const removeRouteStop = (index: number) => {
    if (route.length > 1) {
      setRoute(prev => prev.filter((_, i) => i !== index));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const finalRoute = [formData.from, ...route.filter(stop => stop.trim()), formData.to]
      .filter((stop, index, arr) => arr.indexOf(stop) === index); // Remove duplicates
    
    onSubmit({
      ...formData,
      route: finalRoute
    });
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="bg-white rounded-xl shadow-md p-8 border border-gray-200">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Offer a Ride</h1>
          <p className="text-gray-600">Share your journey and earn points while helping others</p>
          <div className="mt-4 bg-green-25 border border-green-200 rounded-lg p-4" style={{backgroundColor: '#f0fdf4'}}>
            <div className="flex items-center justify-center space-x-2">
              <Award className="h-5 w-5 text-green-500" />
              <span className="text-green-600 font-medium">Earn 50 points for offering a ride!</span>
            </div>
          </div>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <MapPin className="h-4 w-4 inline mr-1" />
                From
              </label>
              <input
                type="text"
                required
                value={formData.from}
                onChange={(e) => setFormData(prev => ({ ...prev, from: e.target.value }))}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-300 focus:border-transparent"
                placeholder="Starting location"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <MapPin className="h-4 w-4 inline mr-1" />
                To
              </label>
              <input
                type="text"
                required
                value={formData.to}
                onChange={(e) => setFormData(prev => ({ ...prev, to: e.target.value }))}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-300 focus:border-transparent"
                placeholder="Destination"
              />
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Route Stops (Optional)
            </label>
            <div className="space-y-2">
              {route.map((stop, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <input
                    type="text"
                    value={stop}
                    onChange={(e) => updateRouteStop(index, e.target.value)}
                    className="flex-1 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-300 focus:border-transparent"
                    placeholder={`Stop ${index + 1}`}
                  />
                  {route.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeRouteStop(index)}
                      className="p-3 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                    >
                      ×
                    </button>
                  )}
                </div>
              ))}
              <button
                type="button"
                onClick={addRouteStop}
                className="flex items-center space-x-2 text-blue-400 hover:text-blue-500 font-medium"
              >
                <Plus className="h-4 w-4" />
                <span>Add stop</span>
              </button>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <Clock className="h-4 w-4 inline mr-1" />
                Date
              </label>
              <input
                type="date"
                required
                value={formData.date}
                onChange={(e) => setFormData(prev => ({ ...prev, date: e.target.value }))}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-300 focus:border-transparent"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <Clock className="h-4 w-4 inline mr-1" />
                Time
              </label>
              <input
                type="time"
                required
                value={formData.time}
                onChange={(e) => setFormData(prev => ({ ...prev, time: e.target.value }))}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-300 focus:border-transparent"
              />
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <Users className="h-4 w-4 inline mr-1" />
              Available Seats
            </label>
            <select
              value={formData.availableSeats}
              onChange={(e) => setFormData(prev => ({ ...prev, availableSeats: parseInt(e.target.value) }))}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-300 focus:border-transparent"
            >
              {[1, 2, 3, 4, 5, 6, 7].map(num => (
                <option key={num} value={num}>{num} seat{num > 1 ? 's' : ''}</option>
              ))}
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Description (Optional)
            </label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
              rows={3}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-300 focus:border-transparent"
              placeholder="Add any additional details about your ride..."
            />
          </div>
          
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-blue-400 to-green-400 text-white py-4 px-6 rounded-lg font-medium hover:from-blue-500 hover:to-green-500 transition-all duration-200 shadow-sm hover:shadow-md"
          >
            Create Ride Offer
          </button>
        </form>
      </div>
    </div>
  );
}
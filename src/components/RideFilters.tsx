import React, { useState, useEffect } from 'react';
import { Search, Calendar } from 'lucide-react';
import type { Ride } from '../App';

interface RideFiltersProps {
  rides: Ride[];
  onFilterChange: (filteredRides: Ride[]) => void;
}

export function RideFilters({ rides, onFilterChange }: RideFiltersProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDate, setSelectedDate] = useState('');

  useEffect(() => {
    let filtered = rides;

    if (searchTerm) {
      filtered = filtered.filter(ride =>
        ride.from.toLowerCase().includes(searchTerm.toLowerCase()) ||
        ride.to.toLowerCase().includes(searchTerm.toLowerCase()) ||
        ride.route.some(stop => stop.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }

    if (selectedDate) {
      filtered = filtered.filter(ride => ride.date === selectedDate);
    }

    onFilterChange(filtered);
  }, [searchTerm, selectedDate, rides, onFilterChange]);

  return (
    <div className="bg-white rounded-xl shadow-sm p-6 mb-6 border border-gray-200">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Filter Rides</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="relative">
          <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search locations..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-300 focus:border-transparent"
          />
        </div>
        
        <div className="relative">
          <Calendar className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
          <input
            type="date"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-300 focus:border-transparent"
          />
        </div>
      </div>
      
      {(searchTerm || selectedDate) && (
        <div className="mt-4 flex items-center justify-between">
          <div className="text-sm text-gray-600">
            Active filters applied
          </div>
          <button
            onClick={() => {
              setSearchTerm('');
              setSelectedDate('');
            }}
            className="text-sm text-blue-400 hover:text-blue-500 font-medium"
          >
            Clear all
          </button>
        </div>
      )}
    </div>
  );
}
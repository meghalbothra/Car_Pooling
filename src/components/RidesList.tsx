import React, { useState } from 'react';
import { RideCard } from './RideCard';
import { RideFilters } from './RideFilters';
import type { Ride, User } from '../App';

interface RidesListProps {
  rides: Ride[];
  currentUser: User;
}

export function RidesList({ rides, currentUser }: RidesListProps) {
  const [filteredRides, setFilteredRides] = useState(rides);

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-900">Available Rides</h2>
        <div className="text-sm text-gray-600">
          {filteredRides.length} rides found
        </div>
      </div>
      
      <RideFilters 
        rides={rides} 
        onFilterChange={setFilteredRides} 
      />
      
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filteredRides.map((ride) => (
          <RideCard key={ride.id} ride={ride} currentUser={currentUser} />
        ))}
      </div>
      
      {filteredRides.length === 0 && (
        <div className="text-center py-12">
          <div className="text-gray-400 text-lg mb-2">No rides found</div>
          <div className="text-gray-500">Try adjusting your filters or check back later</div>
        </div>
      )}
    </div>
  );
}
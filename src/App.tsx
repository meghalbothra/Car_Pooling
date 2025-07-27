import React, { useState } from 'react';
import { Navigation } from './components/Navigation';
import { Hero } from './components/Hero';
import { RidesList } from './components/RidesList';
import { CreateRide } from './components/CreateRide';
import { Profile } from './components/Profile';
import { Leaderboard } from './components/Leaderboard';

export type User = {
  id: string;
  name: string;
  avatar: string;
  level: number;
  points: number;
  badges: string[];
  ridesOffered: number;
  ridesTaken: number;
  carbonSaved: number;
};

export type Ride = {
  id: string;
  driverId: string;
  driverName: string;
  driverAvatar: string;
  from: string;
  to: string;
  date: string;
  time: string;
  availableSeats: number;
  route: string[];
  description?: string;
};

function App() {
  const [currentView, setCurrentView] = useState<'home' | 'create' | 'profile' | 'leaderboard'>('home');
  
  const [currentUser] = useState<User>({
    id: '1',
    name: 'Alex Johnson',
    avatar: 'https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2',
    level: 5,
    points: 2450,
    badges: ['First Ride', 'Eco Warrior', 'Social Butterfly', 'Early Bird'],
    ridesOffered: 23,
    ridesTaken: 18,
    carbonSaved: 156.8
  });

  const [rides, setRides] = useState<Ride[]>([
    {
      id: '1',
      driverId: '2',
      driverName: 'Sarah Chen',
      driverAvatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2',
      from: 'Downtown Seattle',
      to: 'Microsoft Campus, Redmond',
      date: '2025-01-14',
      time: '08:00',
      availableSeats: 3,
      route: ['Downtown Seattle', 'Capitol Hill', 'Bellevue', 'Microsoft Campus'],
      description: 'Daily commute, friendly ride!'
    },
    {
      id: '2',
      driverId: '3',
      driverName: 'Marcus Rodriguez',
      driverAvatar: 'https://images.pexels.com/photos/697509/pexels-photo-697509.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2',
      from: 'University District',
      to: 'Amazon Spheres',
      date: '2025-01-14',
      time: '09:15',
      availableSeats: 2,
      route: ['University District', 'Fremont', 'Queen Anne', 'Amazon Spheres'],
      description: 'Quiet ride, perfect for rest.'
    },
    {
      id: '3',
      driverId: '4',
      driverName: 'Emily Watson',
      driverAvatar: 'https://images.pexels.com/photos/762020/pexels-photo-762020.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2',
      from: 'Ballard',
      to: 'Sea-Tac Airport',
      date: '2025-01-15',
      time: '06:30',
      availableSeats: 4,
      route: ['Ballard', 'Interbay', 'West Seattle', 'Sea-Tac Airport'],
      description: 'Early flight? Let\'s reduce traffic together!'
    }
  ]);

  const addRide = (ride: Omit<Ride, 'id' | 'driverId' | 'driverName' | 'driverAvatar'>) => {
    const newRide: Ride = {
      ...ride,
      id: Date.now().toString(),
      driverId: currentUser.id,
      driverName: currentUser.name,
      driverAvatar: currentUser.avatar
    };
    setRides([newRide, ...rides]);
    setCurrentView('home');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-25 via-white to-green-25" style={{background: 'linear-gradient(to bottom right, #f0f9ff, #ffffff, #f0fdf4)'}}>
      <Navigation 
        currentView={currentView} 
        onViewChange={setCurrentView}
        user={currentUser}
      />
      
      <main className="container mx-auto px-4 py-8">
        {currentView === 'home' && (
          <>
            <Hero />
            <RidesList rides={rides} currentUser={currentUser} />
          </>
        )}
        
        {currentView === 'create' && (
          <CreateRide onSubmit={addRide} />
        )}
        
        {currentView === 'profile' && (
          <Profile user={currentUser} />
        )}
        
        {currentView === 'leaderboard' && (
          <Leaderboard currentUser={currentUser} />
        )}
      </main>
    </div>
  );
}

export default App;
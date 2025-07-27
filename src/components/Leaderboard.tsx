import React, { useState } from 'react';
import { Trophy, Medal, Award, Star, TrendingUp, Users, Car, Leaf } from 'lucide-react';
import type { User } from '../App';

interface LeaderboardProps {
  currentUser: User;
}

export function Leaderboard({ currentUser }: LeaderboardProps) {
  const [activeTab, setActiveTab] = useState<'points' | 'rides' | 'carbon'>('points');

  const leaderboardData = [
    {
      id: '2',
      name: 'Sarah Chen',
      avatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2',
      points: 3250,
      ridesOffered: 45,
      ridesTaken: 32,
      carbonSaved: 234.5,
      level: 8
    },
    {
      id: '1',
      name: currentUser.name,
      avatar: currentUser.avatar,
      points: currentUser.points,
      ridesOffered: currentUser.ridesOffered,
      ridesTaken: currentUser.ridesTaken,
      carbonSaved: currentUser.carbonSaved,
      level: currentUser.level
    },
    {
      id: '3',
      name: 'Marcus Rodriguez',
      avatar: 'https://images.pexels.com/photos/697509/pexels-photo-697509.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2',
      points: 2890,
      ridesOffered: 38,
      ridesTaken: 41,
      carbonSaved: 198.3,
      level: 7
    },
    {
      id: '4',
      name: 'Emily Watson',
      avatar: 'https://images.pexels.com/photos/762020/pexels-photo-762020.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2',
      points: 2650,
      ridesOffered: 29,
      ridesTaken: 35,
      carbonSaved: 187.9,
      level: 6
    },
    {
      id: '5',
      name: 'David Kim',
      avatar: 'https://images.pexels.com/photos/1040880/pexels-photo-1040880.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2',
      points: 2100,
      ridesOffered: 31,
      ridesTaken: 28,
      carbonSaved: 165.7,
      level: 5
    },
    {
      id: '6',
      name: 'Lisa Park',
      avatar: 'https://images.pexels.com/photos/712513/pexels-photo-712513.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2',
      points: 1890,
      ridesOffered: 25,
      ridesTaken: 22,
      carbonSaved: 143.2,
      level: 4
    }
  ];

  const getSortedData = () => {
    return [...leaderboardData].sort((a, b) => {
      switch (activeTab) {
        case 'points':
          return b.points - a.points;
        case 'rides':
          return (b.ridesOffered + b.ridesTaken) - (a.ridesOffered + a.ridesTaken);
        case 'carbon':
          return b.carbonSaved - a.carbonSaved;
        default:
          return b.points - a.points;
      }
    });
  };

  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1:
        return <Trophy className="h-5 w-5 text-yellow-500" />;
      case 2:
        return <Medal className="h-5 w-5 text-gray-400" />;
      case 3:
        return <Award className="h-5 w-5 text-orange-500" />;
      default:
        return <span className="text-gray-500 font-bold">{rank}</span>;
    }
  };

  const getValue = (user: any) => {
    switch (activeTab) {
      case 'points':
        return `${user.points} pts`;
      case 'rides':
        return `${user.ridesOffered + user.ridesTaken} rides`;
      case 'carbon':
        return `${user.carbonSaved} kg CO₂`;
      default:
        return `${user.points} pts`;
    }
  };

  const sortedData = getSortedData();
  const currentUserRank = sortedData.findIndex(user => user.id === currentUser.id) + 1;

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-gradient-to-r from-yellow-200 via-orange-200 to-red-200 rounded-2xl p-8 mb-8 text-gray-800">
        <div className="text-center">
          <Trophy className="h-16 w-16 mx-auto mb-4 text-yellow-600" />
          <h1 className="text-4xl font-bold mb-2">Leaderboard</h1>
          <p className="text-lg text-gray-700">
            Compete with fellow carpoolers and climb the ranks!
          </p>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm p-6 mb-6 border border-gray-200">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-gray-900">Your Ranking</h2>
          <div className="flex items-center space-x-4">
            <div className="text-right">
              <div className="text-2xl font-bold text-blue-500">#{currentUserRank}</div>
              <div className="text-sm text-gray-600">Current Rank</div>
            </div>
            <img
              src={currentUser.avatar}
              alt={currentUser.name}
              className="h-12 w-12 rounded-full object-cover ring-2 ring-blue-300"
            />
          </div>
        </div>
        
        <div className="grid grid-cols-3 gap-4">
          <div className="text-center p-4 bg-blue-25 rounded-lg" style={{backgroundColor: '#f0f9ff'}}>
            <Star className="h-6 w-6 text-blue-500 mx-auto mb-2" />
            <div className="font-bold text-blue-500">{currentUser.points}</div>
            <div className="text-sm text-gray-600">Total Points</div>
          </div>
          <div className="text-center p-4 bg-green-25 rounded-lg" style={{backgroundColor: '#f0fdf4'}}>
            <Car className="h-6 w-6 text-green-500 mx-auto mb-2" />
            <div className="font-bold text-green-500">{currentUser.ridesOffered + currentUser.ridesTaken}</div>
            <div className="text-sm text-gray-600">Total Rides</div>
          </div>
          <div className="text-center p-4 bg-emerald-25 rounded-lg" style={{backgroundColor: '#ecfdf5'}}>
            <Leaf className="h-6 w-6 text-emerald-500 mx-auto mb-2" />
            <div className="font-bold text-emerald-500">{currentUser.carbonSaved}</div>
            <div className="text-sm text-gray-600">CO₂ Saved (kg)</div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-gray-900">Community Rankings</h2>
            <TrendingUp className="h-5 w-5 text-green-500" />
          </div>
          
          <div className="flex space-x-1 bg-gray-50 rounded-lg p-1">
            <button
              onClick={() => setActiveTab('points')}
              className={`flex-1 px-4 py-2 rounded-md font-medium transition-all duration-200 flex items-center justify-center space-x-2 ${
                activeTab === 'points'
                  ? 'bg-white text-blue-500 shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              <Star className="h-4 w-4" />
              <span>Points</span>
            </button>
            <button
              onClick={() => setActiveTab('rides')}
              className={`flex-1 px-4 py-2 rounded-md font-medium transition-all duration-200 flex items-center justify-center space-x-2 ${
                activeTab === 'rides'
                  ? 'bg-white text-green-500 shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              <Users className="h-4 w-4" />
              <span>Rides</span>
            </button>
            <button
              onClick={() => setActiveTab('carbon')}
              className={`flex-1 px-4 py-2 rounded-md font-medium transition-all duration-200 flex items-center justify-center space-x-2 ${
                activeTab === 'carbon'
                  ? 'bg-white text-emerald-500 shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              <Leaf className="h-4 w-4" />
              <span>Carbon</span>
            </button>
          </div>
        </div>
        
        <div className="divide-y divide-gray-200">
          {sortedData.map((user, index) => (
            <div
              key={user.id}
              className={`p-6 flex items-center space-x-4 hover:bg-gray-50 transition-colors ${
                user.id === currentUser.id ? 'bg-blue-25 border-l-4 border-blue-300' : ''
              }`}
              style={user.id === currentUser.id ? {backgroundColor: '#f0f9ff'} : {}}
            >
              <div className="flex items-center justify-center w-8">
                {getRankIcon(index + 1)}
              </div>
              
              <img
                src={user.avatar}
                alt={user.name}
                className="h-12 w-12 rounded-full object-cover"
              />
              
              <div className="flex-1">
                <div className="flex items-center space-x-2">
                  <h3 className="font-semibold text-gray-900">{user.name}</h3>
                  {user.id === currentUser.id && (
                    <span className="px-2 py-1 bg-blue-50 text-blue-600 text-xs rounded-full font-medium">
                      You
                    </span>
                  )}
                </div>
                <div className="text-sm text-gray-600">Level {user.level}</div>
              </div>
              
              <div className="text-right">
                <div className="font-bold text-lg text-gray-900">{getValue(user)}</div>
                {index < 3 && (
                  <div className="text-xs text-gray-500">Top 3</div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
import React from 'react';
import { Car, Plus, User as UserIcon, Trophy, Star } from 'lucide-react';
import type { User } from '../App';

interface NavigationProps {
  currentView: 'home' | 'create' | 'profile' | 'leaderboard';
  onViewChange: (view: 'home' | 'create' | 'profile' | 'leaderboard') => void;
  user: User;
}

export function Navigation({ currentView, onViewChange, user }: NavigationProps) {
  const getLevelName = (level: number) => {
    if (level < 2) return 'Newbie';
    if (level < 5) return 'Commuter';
    if (level < 10) return 'Road Warrior';
    if (level < 20) return 'CarPool Pro';
    return 'CarPool Champion';
  };

  return (
    <nav className="bg-white shadow-sm border-b border-gray-200">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-2">
            <div className="bg-gradient-to-r from-blue-400 to-green-400 p-2 rounded-lg">
              <Car className="h-6 w-6 text-white" />
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-blue-400 to-green-400 bg-clip-text text-transparent">
              RideShare
            </span>
          </div>
          
          <div className="flex items-center space-x-1">
            <button
              onClick={() => onViewChange('home')}
              className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                currentView === 'home'
                  ? 'bg-blue-50 text-blue-600 shadow-sm'
                  : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
              }`}
            >
              Find Rides
            </button>
            <button
              onClick={() => onViewChange('create')}
              className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 flex items-center space-x-2 ${
                currentView === 'create'
                  ? 'bg-green-50 text-green-600 shadow-sm'
                  : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
              }`}
            >
              <Plus className="h-4 w-4" />
              <span>Offer Ride</span>
            </button>
            <button
              onClick={() => onViewChange('leaderboard')}
              className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 flex items-center space-x-2 ${
                currentView === 'leaderboard'
                  ? 'bg-yellow-50 text-yellow-600 shadow-sm'
                  : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
              }`}
            >
              <Trophy className="h-4 w-4" />
              <span>Leaderboard</span>
            </button>
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="text-right hidden sm:block">
              <div className="flex items-center space-x-2">
                <Star className="h-4 w-4 text-yellow-500 fill-current" />
                <span className="text-sm font-semibold text-gray-700">{user.points} pts</span>
              </div>
              <div className="text-xs text-gray-500">
                Level {user.level} • {getLevelName(user.level)}
              </div>
            </div>
            <button
              onClick={() => onViewChange('profile')}
              className={`flex items-center space-x-2 p-2 rounded-lg transition-all duration-200 ${
                currentView === 'profile'
                  ? 'bg-blue-50 shadow-sm'
                  : 'hover:bg-gray-100'
              }`}
            >
              <img
                src={user.avatar}
                alt={user.name}
                className="h-8 w-8 rounded-full object-cover"
              />
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}
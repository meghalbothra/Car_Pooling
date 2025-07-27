import React from 'react';
import { Star, Award, Car, Users, Leaf, Trophy, Target, Calendar } from 'lucide-react';
import type { User } from '../App';

interface ProfileProps {
  user: User;
}

export function Profile({ user }: ProfileProps) {
  const getLevelName = (level: number) => {
    if (level < 2) return 'Newbie';
    if (level < 5) return 'Commuter';
    if (level < 10) return 'Road Warrior';
    if (level < 20) return 'CarPool Pro';
    return 'CarPool Champion';
  };

  const getNextLevelPoints = (level: number) => {
    return level * 500;
  };

  const currentLevelPoints = (user.level - 1) * 500;
  const nextLevelPoints = getNextLevelPoints(user.level + 1);
  const progressPoints = user.points - currentLevelPoints;
  const pointsNeeded = nextLevelPoints - currentLevelPoints;
  const progressPercentage = (progressPoints / pointsNeeded) * 100;

  const badgeColors = {
    'First Ride': 'bg-blue-100 text-blue-700 border-blue-200',
    'Eco Warrior': 'bg-green-100 text-green-700 border-green-200',
    'Social Butterfly': 'bg-purple-100 text-purple-700 border-purple-200',
    'Early Bird': 'bg-yellow-100 text-yellow-700 border-yellow-200',
    'Road Master': 'bg-red-100 text-red-700 border-red-200',
    'Carbon Saver': 'bg-emerald-100 text-emerald-700 border-emerald-200'
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="bg-gradient-to-r from-blue-300 to-green-300 rounded-2xl p-8 text-gray-800">
        <div className="flex items-center space-x-6">
          <img
            src={user.avatar}
            alt={user.name}
            className="h-24 w-24 rounded-full object-cover ring-4 ring-white shadow-md"
          />
          <div className="flex-1">
            <h1 className="text-3xl font-bold mb-2">{user.name}</h1>
            <div className="flex items-center space-x-4 text-gray-700 mb-4">
              <div className="flex items-center space-x-2">
                <Trophy className="h-5 w-5" />
                <span>Level {user.level} • {getLevelName(user.level)}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Star className="h-5 w-5 fill-current text-yellow-300" />
                <span>{user.points} Points</span>
              </div>
            </div>
            <div className="w-full bg-white/30 rounded-full h-3 mb-2">
              <div
                className="bg-white rounded-full h-3 transition-all duration-500"
                style={{ width: `${Math.min(progressPercentage, 100)}%` }}
              ></div>
            </div>
            <div className="text-sm text-gray-600">
              {pointsNeeded - progressPoints} points to Level {user.level + 1}
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
          <div className="flex items-center space-x-3 mb-4">
            <div className="bg-blue-50 p-3 rounded-lg">
              <Car className="h-6 w-6 text-blue-500" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-900">Rides Offered</h3>
              <div className="text-2xl font-bold text-blue-500">{user.ridesOffered}</div>
            </div>
          </div>
          <div className="text-sm text-gray-600">
            You've helped {user.ridesOffered * 2.3} people on average
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
          <div className="flex items-center space-x-3 mb-4">
            <div className="bg-green-50 p-3 rounded-lg">
              <Users className="h-6 w-6 text-green-500" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-900">Rides Taken</h3>
              <div className="text-2xl font-bold text-green-500">{user.ridesTaken}</div>
            </div>
          </div>
          <div className="text-sm text-gray-600">
            Saved approximately ${(user.ridesTaken * 15).toFixed(2)} in gas
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
          <div className="flex items-center space-x-3 mb-4">
            <div className="bg-emerald-50 p-3 rounded-lg">
              <Leaf className="h-6 w-6 text-emerald-500" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-900">CO₂ Saved</h3>
              <div className="text-2xl font-bold text-emerald-500">{user.carbonSaved} kg</div>
            </div>
          </div>
          <div className="text-sm text-gray-600">
            Equivalent to planting {Math.round(user.carbonSaved / 22)} trees
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
        <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center space-x-2">
          <Award className="h-5 w-5" />
          <span>Redeem Points</span>
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between mb-3">
              <div className="bg-blue-50 p-2 rounded-lg">
                <Car className="h-5 w-5 text-blue-400" />
              </div>
              <span className="text-sm font-medium text-blue-400">500 pts</span>
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">Free Gas Voucher</h3>
            <p className="text-sm text-gray-600 mb-3">$10 gas station voucher</p>
            <button 
              className={`w-full py-2 px-3 rounded-lg text-sm font-medium transition-colors ${
                user.points >= 500 
                  ? 'bg-blue-400 text-white hover:bg-blue-500' 
                  : 'bg-gray-100 text-gray-400 cursor-not-allowed'
              }`}
              disabled={user.points < 500}
            >
              {user.points >= 500 ? 'Redeem' : 'Need more points'}
            </button>
          </div>

          <div className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between mb-3">
              <div className="bg-green-50 p-2 rounded-lg">
                <Leaf className="h-5 w-5 text-green-400" />
              </div>
              <span className="text-sm font-medium text-green-400">300 pts</span>
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">Coffee Reward</h3>
            <p className="text-sm text-gray-600 mb-3">Free coffee at partner cafes</p>
            <button 
              className={`w-full py-2 px-3 rounded-lg text-sm font-medium transition-colors ${
                user.points >= 300 
                  ? 'bg-green-400 text-white hover:bg-green-500' 
                  : 'bg-gray-100 text-gray-400 cursor-not-allowed'
              }`}
              disabled={user.points < 300}
            >
              {user.points >= 300 ? 'Redeem' : 'Need more points'}
            </button>
          </div>

          <div className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between mb-3">
              <div className="bg-purple-50 p-2 rounded-lg">
                <Trophy className="h-5 w-5 text-purple-400" />
              </div>
              <span className="text-sm font-medium text-purple-400">1000 pts</span>
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">Premium Badge</h3>
            <p className="text-sm text-gray-600 mb-3">Exclusive premium member badge</p>
            <button 
              className={`w-full py-2 px-3 rounded-lg text-sm font-medium transition-colors ${
                user.points >= 1000 
                  ? 'bg-purple-400 text-white hover:bg-purple-500' 
                  : 'bg-gray-100 text-gray-400 cursor-not-allowed'
              }`}
              disabled={user.points < 1000}
            >
              {user.points >= 1000 ? 'Redeem' : 'Need more points'}
            </button>
          </div>

          <div className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between mb-3">
              <div className="bg-yellow-50 p-2 rounded-lg">
                <Star className="h-5 w-5 text-yellow-400" />
              </div>
              <span className="text-sm font-medium text-yellow-400">750 pts</span>
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">Parking Discount</h3>
            <p className="text-sm text-gray-600 mb-3">50% off parking at partner lots</p>
            <button 
              className={`w-full py-2 px-3 rounded-lg text-sm font-medium transition-colors ${
                user.points >= 750 
                  ? 'bg-yellow-400 text-white hover:bg-yellow-500' 
                  : 'bg-gray-100 text-gray-400 cursor-not-allowed'
              }`}
              disabled={user.points < 750}
            >
              {user.points >= 750 ? 'Redeem' : 'Need more points'}
            </button>
          </div>

          <div className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between mb-3">
              <div className="bg-emerald-50 p-2 rounded-lg">
                <Users className="h-5 w-5 text-emerald-400" />
              </div>
              <span className="text-sm font-medium text-emerald-400">200 pts</span>
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">Priority Matching</h3>
            <p className="text-sm text-gray-600 mb-3">Get matched with rides first</p>
            <button 
              className={`w-full py-2 px-3 rounded-lg text-sm font-medium transition-colors ${
                user.points >= 200 
                  ? 'bg-emerald-400 text-white hover:bg-emerald-500' 
                  : 'bg-gray-100 text-gray-400 cursor-not-allowed'
              }`}
              disabled={user.points < 200}
            >
              {user.points >= 200 ? 'Redeem' : 'Need more points'}
            </button>
          </div>

          <div className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between mb-3">
              <div className="bg-red-50 p-2 rounded-lg">
                <Award className="h-5 w-5 text-red-400" />
              </div>
              <span className="text-sm font-medium text-red-400">1500 pts</span>
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">VIP Status</h3>
            <p className="text-sm text-gray-600 mb-3">Unlock VIP features for 30 days</p>
            <button 
              className={`w-full py-2 px-3 rounded-lg text-sm font-medium transition-colors ${
                user.points >= 1500 
                  ? 'bg-red-400 text-white hover:bg-red-500' 
                  : 'bg-gray-100 text-gray-400 cursor-not-allowed'
              }`}
              disabled={user.points < 1500}
            >
              {user.points >= 1500 ? 'Redeem' : 'Need more points'}
            </button>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
        <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center space-x-2">
          <Award className="h-5 w-5" />
          <span>Achievements</span>
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {user.badges.map((badge, index) => (
            <div
              key={index}
              className={`p-4 rounded-lg border-2 text-center ${
                badgeColors[badge as keyof typeof badgeColors] || 'bg-gray-100 text-gray-700 border-gray-200'
              }`}
            >
              <Award className="h-8 w-8 mx-auto mb-2" />
              <div className="font-medium text-sm">{badge}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center space-x-2">
            <Target className="h-5 w-5" />
            <span>Goals Progress</span>
          </h3>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span>Monthly Rides Goal (8/10)</span>
                <span>80%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-blue-400 h-2 rounded-full" style={{ width: '80%' }}></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span>Carbon Savings Goal (156/200 kg)</span>
                <span>78%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-green-400 h-2 rounded-full" style={{ width: '78%' }}></div>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center space-x-2">
            <Calendar className="h-5 w-5" />
            <span>Recent Activity</span>
          </h3>
          <div className="space-y-3">
            <div className="flex items-center space-x-3 text-sm">
              <div className="bg-green-50 p-2 rounded-full">
                <Car className="h-3 w-3 text-green-500" />
              </div>
              <div>
                <div className="font-medium">Offered ride to Bellevue</div>
                <div className="text-gray-500">2 days ago • +50 points</div>
              </div>
            </div>
            <div className="flex items-center space-x-3 text-sm">
              <div className="bg-blue-50 p-2 rounded-full">
                <Users className="h-3 w-3 text-blue-500" />
              </div>
              <div>
                <div className="font-medium">Joined ride to Airport</div>
                <div className="text-gray-500">5 days ago • +25 points</div>
              </div>
            </div>
            <div className="flex items-center space-x-3 text-sm">
              <div className="bg-yellow-50 p-2 rounded-full">
                <Award className="h-3 w-3 text-yellow-500" />
              </div>
              <div>
                <div className="font-medium">Earned "Early Bird" badge</div>
                <div className="text-gray-500">1 week ago • +100 points</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
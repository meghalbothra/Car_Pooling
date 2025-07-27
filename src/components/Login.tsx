import React, { useState } from 'react';
import { Car, UserPlus, Building2 } from 'lucide-react';

interface LoginProps {
  onLogin: (userData: { id: string; name: string; email: string; avatar: string }) => void;
}

export function Login({ onLogin }: LoginProps) {
  const [isNewEmployee, setIsNewEmployee] = useState(false);
  const [formData, setFormData] = useState({
    emp_id: '',
    emp_name: '',
    gender: '',
    age: '',
    has_a_car: false,
    car_model: '',
    car_number_plate: ''
  });
  const [isLoading, setIsLoading] = useState(false);

  // Mock existing employees for login
  const mockEmployees = [
    {
      id: '1',
      emp_id: 'EMP001',
      name: 'Alex Johnson',
      email: 'alex.johnson@company.com',
      avatar: 'https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2'
    },
    {
      id: '2',
      emp_id: 'EMP002',
      name: 'Sarah Chen',
      email: 'sarah.chen@company.com',
      avatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2'
    }
  ];

  const handleExistingLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate API call for existing employee login
    setTimeout(() => {
      const employee = mockEmployees.find(emp => emp.emp_id === formData.emp_id);
      
      if (employee) {
        onLogin({
          id: employee.id,
          name: employee.name,
          email: employee.email,
          avatar: employee.avatar
        });
      } else {
        alert('Employee ID not found. Please check your ID or register as a new employee.');
      }
      setIsLoading(false);
    }, 1000);
  };

  const handleNewEmployeeSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate API call to create new employee
    setTimeout(() => {
      // In real implementation, this would call your Flask API
      const newEmployee = {
        id: Date.now().toString(),
        name: formData.emp_name,
        email: `${formData.emp_name.toLowerCase().replace(' ', '.')}@company.com`,
        avatar: 'https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2'
      };
      
      onLogin(newEmployee);
      setIsLoading(false);
    }, 1500);
  };

  if (isNewEmployee) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 flex items-center justify-center p-4">
        <div className="max-w-md w-full">
          <div className="bg-white rounded-2xl shadow-sm p-8 border border-gray-200">
            <div className="text-center mb-8">
              <div className="bg-gradient-to-r from-blue-400 to-green-400 p-3 rounded-xl inline-block mb-4">
                <UserPlus className="h-8 w-8 text-white" />
              </div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-green-400 bg-clip-text text-transparent mb-2">
                Employee Registration
              </h1>
              <p className="text-gray-600">Register your details to join the carpool network</p>
            </div>

            <form onSubmit={handleNewEmployeeSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Employee ID *
                </label>
                <input
                  type="text"
                  required
                  value={formData.emp_id}
                  onChange={(e) => setFormData(prev => ({ ...prev, emp_id: e.target.value }))}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-300 focus:border-transparent"
                  placeholder="EMP001"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Full Name *
                </label>
                <input
                  type="text"
                  required
                  value={formData.emp_name}
                  onChange={(e) => setFormData(prev => ({ ...prev, emp_name: e.target.value }))}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-300 focus:border-transparent"
                  placeholder="John Doe"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Gender *
                  </label>
                  <select
                    required
                    value={formData.gender}
                    onChange={(e) => setFormData(prev => ({ ...prev, gender: e.target.value }))}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-300 focus:border-transparent"
                  >
                    <option value="">Select</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Age *
                  </label>
                  <input
                    type="number"
                    required
                    min="18"
                    max="100"
                    value={formData.age}
                    onChange={(e) => setFormData(prev => ({ ...prev, age: e.target.value }))}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-300 focus:border-transparent"
                    placeholder="25"
                  />
                </div>
              </div>

              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <div className="flex items-center space-x-3 mb-3">
                  <input
                    type="checkbox"
                    id="has_car"
                    checked={formData.has_a_car}
                    onChange={(e) => setFormData(prev => ({ ...prev, has_a_car: e.target.checked }))}
                    className="h-4 w-4 text-blue-400 focus:ring-blue-300 border-gray-300 rounded"
                  />
                  <label htmlFor="has_car" className="text-sm font-medium text-gray-700">
                    I have a car and can offer rides
                  </label>
                </div>

                {formData.has_a_car && (
                  <div className="space-y-3">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Car Model
                      </label>
                      <input
                        type="text"
                        value={formData.car_model}
                        onChange={(e) => setFormData(prev => ({ ...prev, car_model: e.target.value }))}
                        className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-300 focus:border-transparent"
                        placeholder="Toyota Camry"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        License Plate Number
                      </label>
                      <input
                        type="text"
                        value={formData.car_number_plate}
                        onChange={(e) => setFormData(prev => ({ ...prev, car_number_plate: e.target.value.toUpperCase() }))}
                        className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-300 focus:border-transparent"
                        placeholder="ABC-1234"
                      />
                    </div>
                  </div>
                )}
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-gradient-to-r from-blue-400 to-green-400 text-white py-3 px-4 rounded-lg font-medium hover:from-blue-500 hover:to-green-500 transition-all duration-200 flex items-center justify-center space-x-2 shadow-sm hover:shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? (
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                ) : (
                  <>
                    <UserPlus className="h-4 w-4" />
                    <span>Register Employee</span>
                  </>
                )}
              </button>
            </form>

            <div className="mt-6 text-center">
              <button
                onClick={() => setIsNewEmployee(false)}
                className="text-blue-400 hover:text-blue-500 font-medium text-sm"
              >
                Already registered? Sign in instead
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        <div className="bg-white rounded-2xl shadow-sm p-8 border border-gray-200">
          <div className="text-center mb-8">
            <div className="bg-gradient-to-r from-blue-400 to-green-400 p-3 rounded-xl inline-block mb-4">
              <Car className="h-8 w-8 text-white" />
            </div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-green-400 bg-clip-text text-transparent mb-2">
              RideShare
            </h1>
            <p className="text-gray-600">Sign in to your employee account</p>
          </div>

          <form onSubmit={handleExistingLogin} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Employee ID
              </label>
              <input
                type="text"
                required
                value={formData.emp_id}
                onChange={(e) => setFormData(prev => ({ ...prev, emp_id: e.target.value }))}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-300 focus:border-transparent"
                placeholder="EMP001"
              />
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-blue-400 to-green-400 text-white py-3 px-4 rounded-lg font-medium hover:from-blue-500 hover:to-green-500 transition-all duration-200 flex items-center justify-center space-x-2 shadow-sm hover:shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
              ) : (
                <>
                  <Car className="h-4 w-4" />
                  <span>Sign In</span>
                </>
              )}
            </button>
          </form>

          <div className="mt-6 text-center">
            <button
              onClick={() => setIsNewEmployee(true)}
              className="text-blue-400 hover:text-blue-500 font-medium text-sm"
            >
              New employee? Register here
            </button>
          </div>

          <div className="mt-8 pt-6 border-t border-gray-200">
            <div className="flex items-center justify-center space-x-2 text-sm text-gray-500">
              <Building2 className="h-4 w-4" />
              <span>Organization Internal Use Only</span>
            </div>
            <p className="text-xs text-gray-400 text-center mt-2">
              Contact HR if you need assistance
            </p>
          </div>

          <div className="mt-6 bg-blue-50 border border-blue-200 rounded-lg p-4">
            <p className="text-sm text-blue-600 font-medium mb-2">Demo Employee IDs:</p>
            <div className="space-y-1 text-xs text-blue-500">
              <div>EMP001 - Alex Johnson</div>
              <div>EMP002 - Sarah Chen</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
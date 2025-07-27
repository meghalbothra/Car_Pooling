import React, { useState } from 'react';
import { Car, UserPlus, Building2 } from 'lucide-react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

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

  const handleExistingLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const res = await fetch(`http://127.0.0.1:5000/api/employees/${formData.emp_id}`);
      if (res.status === 404) {
        toast.warn('Employee not found. Please register.');
        setIsNewEmployee(true);
        return;
      }

      if (!res.ok) throw new Error("Failed to fetch employee");

      const data = await res.json();

      const employee = {
        id: data.id || data.emp_id,
        name: data.emp_name,
        email: `${data.emp_id.toLowerCase()}@company.com`,
        avatar:
          'https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2'
      };

      onLogin(employee);
    } catch (err) {
      console.error("Login error:", err);
      toast.error("Error occurred while logging in. Try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleNewEmployeeSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await fetch('http://127.0.0.1:5000/api/employees/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      if (!response.ok) {
        throw new Error('Failed to register employee');
      }

      const data = await response.json();

      const newEmployee = {
        id: data.generated_id || Date.now().toString(),
        name: data.employee.emp_name || formData.emp_name,
        email: `${formData.emp_name.toLowerCase().replace(' ', '.')}@company.com`,
        avatar:
          'https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2'
      };

      toast.success("Registration successful!");
      onLogin(newEmployee);
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong during registration.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <ToastContainer position="top-center" autoClose={3000} />

      {isNewEmployee ? (
        // Registration UI
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
                  <label className="block text-sm font-medium text-gray-700 mb-2">Employee ID *</label>
                  <input
                    type="text"
                    required
                    value={formData.emp_id}
                    onChange={(e) => setFormData(prev => ({ ...prev, emp_id: e.target.value }))}
                    className="w-full p-3 border border-gray-300 rounded-lg"
                    placeholder="EMP001"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Full Name *</label>
                  <input
                    type="text"
                    required
                    value={formData.emp_name}
                    onChange={(e) => setFormData(prev => ({ ...prev, emp_name: e.target.value }))}
                    className="w-full p-3 border border-gray-300 rounded-lg"
                    placeholder="John Doe"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Gender *</label>
                    <select
                      required
                      value={formData.gender}
                      onChange={(e) => setFormData(prev => ({ ...prev, gender: e.target.value }))}
                      className="w-full p-3 border border-gray-300 rounded-lg"
                    >
                      <option value="">Select</option>
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Age *</label>
                    <input
                      type="number"
                      required
                      min="18"
                      max="100"
                      value={formData.age}
                      onChange={(e) => setFormData(prev => ({ ...prev, age: e.target.value }))}
                      className="w-full p-3 border border-gray-300 rounded-lg"
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
                      className="h-4 w-4 text-blue-400 border-gray-300 rounded"
                    />
                    <label htmlFor="has_car" className="text-sm font-medium text-gray-700">
                      I have a car and can offer rides
                    </label>
                  </div>

                  {formData.has_a_car && (
                    <div className="space-y-3">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Car Model</label>
                        <input
                          type="text"
                          value={formData.car_model}
                          onChange={(e) => setFormData(prev => ({ ...prev, car_model: e.target.value }))}
                          className="w-full p-2 border border-gray-300 rounded-lg"
                          placeholder="Toyota Camry"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">License Plate Number</label>
                        <input
                          type="text"
                          value={formData.car_number_plate}
                          onChange={(e) =>
                            setFormData(prev => ({ ...prev, car_number_plate: e.target.value.toUpperCase() }))
                          }
                          className="w-full p-2 border border-gray-300 rounded-lg"
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
      ) : (
        // Login UI
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
                  <label className="block text-sm font-medium text-gray-700 mb-2">Employee ID</label>
                  <input
                    type="text"
                    required
                    value={formData.emp_id}
                    onChange={(e) => setFormData(prev => ({ ...prev, emp_id: e.target.value }))}
                    className="w-full p-3 border border-gray-300 rounded-lg"
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
            </div>
          </div>
        </div>
      )}
    </>
  );
}

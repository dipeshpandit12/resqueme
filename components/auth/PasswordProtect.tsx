'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { ShieldAlert } from 'lucide-react'; // Using Lucide React icons for the shield
import { Bell, Settings, LogOut } from 'lucide-react';


const DASHBOARD_PASSWORD = 'resqme2024';
const PASSWORD_KEY = 'dashboard_auth';

export default function PasswordProtected({ children }: { children: React.ReactNode }) {
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  useEffect(() => {
    const storedAuth = localStorage.getItem(PASSWORD_KEY);
    if (storedAuth === DASHBOARD_PASSWORD) {
      setIsAuthorized(true);
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/auth', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ password }),
      });

      const data = await response.json();

      if (data.success) {
        localStorage.setItem(PASSWORD_KEY, password);
        setIsAuthorized(true);
        setError('');
      } else {
        setError('Incorrect password');
      }
    } catch (error) {
      setError('An error occurred. Please try again.');
      console.error('Error during authentication:', error);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem(PASSWORD_KEY);
    setIsAuthorized(false);
    router.push('/');
  };

  if (!isAuthorized) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="p-8 bg-white rounded-lg shadow-lg w-full max-w-sm text-center">
          <div className="flex justify-center mb-4">
            <ShieldAlert className="h-10 w-10 text-red-500" />
          </div>
          <h1 className="text-2xl font-bold mb-2">ResQMe Responder</h1>
          <p className="text-gray-600 mb-6">Enter your responder password to access the dashboard</p>
          <form onSubmit={handleSubmit}>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-2 mb-4 border rounded focus:ring-2 focus:ring-red-500 focus:outline-none"
              placeholder="Enter password"
            />
            {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
            <button
              type="submit"
              className="w-full bg-red-500 text-white p-2 rounded hover:bg-red-600 transition-colors"
            >
              Access Dashboard
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="overflow-hidden">
      <div className="bg-white shadow-sm bg-fixed">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <header className="bg-white w-full border-gray-200 shadow-sm">
            <div className="max-w-full mx-auto px-6">
              <div className="flex justify-between items-center h-16">
                <div className="flex items-center">
                  <span className="text-xl font-bold text-[#dc2626]">ResQMe</span>
                  <span className="text-sm font-medium text-gray-600 ml-4 border-l pl-4 border-gray-200">Responder Dashboard</span>
                </div>
                <div className="flex items-center space-x-2">
                  <button className="p-2 rounded-full text-gray-500 hover:text-[#dc2626] hover:bg-gray-100 transition-colors">
                    <Bell size={20} />
                  </button>
                  <button className="p-2 rounded-full text-gray-500 hover:text-[#dc2626] hover:bg-gray-100 transition-colors">
                    <Settings size={20} />
                  </button>
                  <button 
                    onClick={handleLogout}
                    className="p-2 rounded-full text-gray-500 hover:text-[#dc2626] hover:bg-gray-100 transition-colors"
                  >
                    <LogOut size={18} className="mr-2" />
                  </button>
                </div>
              </div>
            </div>
          </header>
        </div>
      </div>
      <div className="overflow-hidden">
        {children}
      </div>
    </div>
  );
}
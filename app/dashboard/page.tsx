'use client';

import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import PasswordProtect from '@/components/auth/PasswordProtect';
import EmergencyList from '@/components/EmergencyList/EmergencyList';
import EmergencyDetail from '@/components/EmergencyDetail/EmergencyDetail';
import { emergencyData } from '@/data/emergency-data';
import { Emergency } from '@/types/emergency';

// Dynamic import Map with ssr: false
const Map = dynamic(() => import('@/components/Map/Map'), {
  ssr: false,
  loading: () => (
    <div className="h-full w-full bg-gray-100 animate-pulse rounded-lg"></div>
  ),
});

export default function DashboardPage() {
  const [emergencies, setEmergencies] = useState<Emergency[]>([]);
  const [selectedEmergency, setSelectedEmergency] = useState<Emergency | null>(null);
  const [activeTab, setActiveTab] = useState<'map' | 'list' | 'details'>('map');

  useEffect(() => {
    setEmergencies(emergencyData);
    // Auto-select the first emergency if available
    if (emergencyData.length > 0 && !selectedEmergency) {
      setSelectedEmergency(emergencyData[0]);
    }
  }, []);

  const handleSendHelp = (emergency: Emergency) => {
    console.log('Sending help for emergency:', emergency);
    // Here you would implement the actual logic to send help
  };

  // Mobile tab navigation component
  const TabNav = () => (
    <div className="flex border-b border-gray-200 bg-white md:hidden">
      <button 
        className={`flex-1 py-3 text-sm font-medium ${activeTab === 'map' ? 'text-[#dc2626] border-b-2 border-[#dc2626]' : 'text-gray-500'}`}
        onClick={() => setActiveTab('map')}
      >
        Map
      </button>
      <button 
        className={`flex-1 py-3 text-sm font-medium ${activeTab === 'list' ? 'text-[#dc2626] border-b-2 border-[#dc2626]' : 'text-gray-500'}`}
        onClick={() => setActiveTab('list')}
      >
        List
      </button>
      <button 
        className={`flex-1 py-3 text-sm font-medium ${activeTab === 'details' ? 'text-[#dc2626] border-b-2 border-[#dc2626]' : 'text-gray-500'}`}
        onClick={() => setActiveTab('details')}
      >
        Details
      </button>
    </div>
  );

  return (
    <PasswordProtect>
      <div className="min-h-screen bg-gray-50 flex flex-col">
        {/* Mobile Tab Navigation */}
        <TabNav />

        {/* Main Content */}
        <div className="flex-1 flex flex-col overflow-hidden">
          <main className="flex-1 overflow-x-hidden overflow-y-auto p-2 sm:p-4">
            <div className="mx-auto h-[calc(100vh-5rem)] md:h-[calc(100vh-4rem)]">
              {/* Mobile view - Show active tab content */}
              <div className="md:hidden">
                {activeTab === 'map' && (
                  <div className="bg-white rounded-lg shadow-md overflow-hidden h-[calc(100vh-8rem)]">
                    <div className="p-3 border-b border-gray-200 flex justify-between items-center">
                      <h2 className="text-base font-semibold text-gray-800">Austin Emergency Map</h2>
                      <div className="text-xs text-gray-500">
                        {emergencies.length} Active Emergencies
                      </div>
                    </div>
                    <div className="h-[calc(100%-3rem)]">
                      <Map
                        emergencies={emergencies.map((e) => ({
                          id: e.id,
                          coordinates: e.location.coordinates,
                          type: e.type,
                          description: e.description,
                          requesterName: e.requester.name,
                        }))}
                        onMarkerClick={(markerEmergency) => {
                          const fullEmergency = emergencies.find((e) => e.id === markerEmergency.id) || null;
                          setSelectedEmergency(fullEmergency);
                          // Automatically switch to details on mobile when marker is clicked
                          setActiveTab('details');
                        }}
                      />
                    </div>
                  </div>
                )}
                
                {activeTab === 'list' && (
                  <div className="bg-white rounded-lg shadow-md overflow-hidden h-[calc(100vh-8rem)]">
                    <EmergencyList
                      emergencies={emergencies}
                      onSelectEmergency={(emergency) => {
                        setSelectedEmergency(emergency);
                        // Automatically switch to details on mobile when selecting from list
                        setActiveTab('details');
                      }}
                      selectedEmergency={selectedEmergency}
                    />
                  </div>
                )}
                
                {activeTab === 'details' && (
                  <div className="h-[calc(100vh-8rem)] overflow-hidden">
                    <EmergencyDetail
                      emergency={selectedEmergency}
                      onSendHelp={handleSendHelp}
                    />
                  </div>
                )}
              </div>

              {/* Desktop view - Show all content in grid */}
              <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-[1fr_400px] gap-4 h-full">
                <div className="flex flex-col gap-4">
                  {/* Emergency Map */}
                  <div className="bg-white rounded-lg shadow-md overflow-hidden h-[45%]">
                    <div className="p-4 border-b border-gray-200 flex justify-between items-center">
                      <h2 className="text-lg font-semibold text-gray-800">Austin Emergency Map</h2>
                      <div className="text-sm text-gray-500">
                        {emergencies.length} Active Emergencies
                      </div>
                    </div>
                    <div className="h-[calc(100%-3.5rem)]">
                      <Map
                        emergencies={emergencies.map((e) => ({
                          id: e.id,
                          coordinates: e.location.coordinates,
                          type: e.type,
                          description: e.description,
                          requesterName: e.requester.name,
                        }))}
                        onMarkerClick={(markerEmergency) => {
                          const fullEmergency = emergencies.find((e) => e.id === markerEmergency.id) || null;
                          setSelectedEmergency(fullEmergency);
                        }}
                      />
                    </div>
                  </div>

                  {/* Emergency List */}
                  <div className="bg-white rounded-lg shadow-md flex-1 overflow-hidden">
                    <div className="h-full overflow-y-auto">
                      <EmergencyList
                        emergencies={emergencies}
                        onSelectEmergency={setSelectedEmergency}
                        selectedEmergency={selectedEmergency}
                      />
                    </div>
                  </div>
                </div>

                {/* Emergency Details */}
                <div className="h-full overflow-hidden">
                  <EmergencyDetail
                    emergency={selectedEmergency}
                    onSendHelp={handleSendHelp}
                  />
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
    </PasswordProtect>
  );
}
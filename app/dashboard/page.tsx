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

 return (
    <PasswordProtect>
      <div className="min-h-screen bg-gray-50 flex flex-col">
        {/* Desktop Navbar */}

        {/* Main Content */}
        <div className="flex-1 flex flex-col overflow-hidden">
          <main className="flex-1 overflow-x-hidden overflow-y-auto p-4">
            <div className="max-w-[1800px] mx-auto grid grid-cols-[1fr_400px] gap-4 h-[calc(100vh-5rem)]">
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
          </main>
        </div>
      </div>
    </PasswordProtect>
  );
}
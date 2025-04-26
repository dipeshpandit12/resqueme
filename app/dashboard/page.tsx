'use client';

import { useState, useEffect } from 'react';
import PasswordProtect from '@/components/auth/PasswordProtect';
import EmergencyList from '@/components/EmergencyList/EmergencyList';
import EmergencyDetail from '@/components/EmergencyDetail/EmergencyDetail';
import Map from '@/components/Map/Map';
import { emergencyData } from '@/data/emergency-data';
import { Emergency } from '@/types/emergency';

export default function DashboardPage() {
  const [emergencies, setEmergencies] = useState<Emergency[]>([]);
  const [selectedEmergency, setSelectedEmergency] = useState<Emergency | null>(null);

  useEffect(() => {
    setEmergencies(emergencyData);
  }, []);

  const handleSendHelp = (emergency: Emergency) => {
    console.log('Sending help for emergency:', emergency);
    // Here you could trigger backend dispatch logic
  };

  return (
    <PasswordProtect>
      <div className="min-h-screen bg-gray-100 p-4">
        <div className="max-w-[1800px] mx-auto grid grid-cols-[1fr_400px] gap-4">
          
          {/* Left side: Map + Emergency List */}
          <div className="flex flex-col gap-4">
            
            {/* Emergency Map */}
            <div className="h-[400px] bg-white rounded-lg shadow p-2">
              <h2 className="text-lg font-semibold mb-2">Austin Emergency Map</h2>
              <div className="h-full">
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

            {/* Emergency Request List */}
            <EmergencyList
              emergencies={emergencies}
              onSelectEmergency={setSelectedEmergency}
              selectedEmergency={selectedEmergency}
            />
          </div>

          {/* Right side: Emergency Detail View */}
          <div className="h-[calc(100vh-2rem)]">
            <EmergencyDetail
              emergency={selectedEmergency}
              onSendHelp={handleSendHelp}
            />
          </div>

        </div>
      </div>
    </PasswordProtect>
  );
}

'use client';

import PasswordProtect from '@/components/auth/PasswordProtect';
import EmergencyList from '@/components/EmergencyList/EmergencyList';
import EmergencyDetail from '@/components/EmergencyDetail/EmergencyDetail';
import { Emergency } from '@/types';
import dynamic from 'next/dynamic';
import { useEffect, useState } from 'react';

// Dynamically import Map component to avoid SSR issues with Leaflet
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
    fetch('/api/emergencies')
      .then(res => res.json())
      .then(data => setEmergencies(data));
  }, []);

  const handleSendHelp = (emergency: Emergency) => {
    // Implement help dispatch logic here
    console.log('Sending help for emergency:', emergency);
  };

  return (
    <PasswordProtect>
      <div className="min-h-screen bg-gray-100 p-6">
        <div className="grid grid-cols-[1fr_400px] gap-6 max-w-[1800px] mx-auto">
          <div className="space-y-6">
            <div className="h-[400px]">
              <Map 
                emergencies={emergencies}
                onMarkerClick={(markerEmergency) => {
                  const fullEmergency = emergencies.find(e => e.id === markerEmergency.id) || null;
                  setSelectedEmergency(fullEmergency);
                }}
              />
            </div>
            <EmergencyList 
              emergencies={emergencies}
              onSelectEmergency={setSelectedEmergency}
              selectedEmergency={selectedEmergency}
            />
          </div>
          <div className="h-[calc(100vh-3rem)]">
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
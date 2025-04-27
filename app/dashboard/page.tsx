'use client';

import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import PasswordProtect from '@/components/auth/PasswordProtect';
import EmergencyList from '@/components/EmergencyList/EmergencyList';
import EmergencyDetail from '@/components/EmergencyDetail/EmergencyDetail';
import { emergencyData } from '@/data/emergency-data';
import { Emergency } from '@/types/emergency';
import { useSocket } from '@/hooks/useSocket';

// ⚡ Dynamic import Map with ssr: false
const Map = dynamic(() => import('@/components/Map/Map'), {
  ssr: false,
  loading: () => (
    <div className="h-full w-full bg-gray-100 animate-pulse rounded-lg"></div>
  ),
});

export default function DashboardPage() {
  const [emergencies, setEmergencies] = useState<Emergency[]>([]);
  const [selectedEmergency, setSelectedEmergency] = useState<Emergency | null>(null);
  const { socket, isConnected } = useSocket('http://localhost:3001');

  // Load initial data
  useEffect(() => {
    // Start with data from emergency-data.ts
    setEmergencies(emergencyData);
    
    // Then fetch the latest from the API
    fetch('/api/emergencies')
      .then(res => res.json())
      .then(data => {
        setEmergencies(data);
      })
      .catch(err => console.error('Failed to fetch emergencies:', err));
  }, []);

  // Listen for socket events
  useEffect(() => {
    if (!socket) return;
    
    // Handle new emergency
    socket.on('newEmergency', (newEmergency: Emergency) => {
      console.log('New emergency received:', newEmergency);
      setEmergencies(prevEmergencies => [...prevEmergencies, newEmergency]);
    });
    
    // Handle emergency updates
    socket.on('updateEmergency', (updatedEmergency: Emergency) => {
      console.log('Emergency update received:', updatedEmergency);
      setEmergencies(prevEmergencies => 
        prevEmergencies.map(emergency => 
          emergency.id === updatedEmergency.id ? updatedEmergency : emergency
        )
      );
      
      // If the updated emergency is currently selected, update it
      if (selectedEmergency?.id === updatedEmergency.id) {
        setSelectedEmergency(updatedEmergency);
      }
    });
    
    // Handle emergency deletion
    socket.on('deleteEmergency', ({ id }: { id: string }) => {
      console.log('Emergency deletion received for ID:', id);
      setEmergencies(prevEmergencies => 
        prevEmergencies.filter(emergency => emergency.id !== id)
      );
      
      // If the deleted emergency is currently selected, clear selection
      if (selectedEmergency?.id === id) {
        setSelectedEmergency(null);
      }
    });
    
    return () => {
      socket.off('newEmergency');
      socket.off('updateEmergency');
      socket.off('deleteEmergency');
    };
  }, [socket, selectedEmergency]);

  const handleSendHelp = (emergency: Emergency) => {
    console.log('Sending help for emergency:', emergency);
    
    // Update emergency status and emit the change
    const updatedEmergency: Emergency = {
      ...emergency,
      status: 'In Progress',
      updatedAt: new Date().toISOString(),
    };
    
    // Update local state
    setEmergencies(prevEmergencies =>
      prevEmergencies.map(e => 
        e.id === emergency.id ? updatedEmergency : e
      )
    );
    
    // Update selected emergency if this is the one
    if (selectedEmergency?.id === emergency.id) {
      setSelectedEmergency(updatedEmergency);
    }
    
    // Emit via socket if connected
    if (socket && isConnected) {
      socket.emit('updateEmergency', updatedEmergency);
    }
    
    // Also update via API for clients that might not be connected to socket
    fetch(`/api/emergencies/${emergency.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updatedEmergency)
    }).catch(err => console.error('Error updating emergency:', err));
  };

  return (
    <PasswordProtect>
      <div className="min-h-screen bg-gray-100 p-4">
        {isConnected && (
          <div className="fixed top-4 right-4 bg-green-100 text-green-800 px-3 py-1 rounded-full text-xs font-medium">
            Live Updates Active
          </div>
        )}
        <div className="max-w-[1800px] mx-auto grid grid-cols-[1fr_400px] gap-4">
          
          <div className="flex flex-col gap-4">
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

            <EmergencyList
              emergencies={emergencies}
              onSelectEmergency={setSelectedEmergency}
              selectedEmergency={selectedEmergency}
            />
          </div>

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
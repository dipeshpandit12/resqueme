'use client';

import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
// import { useEffect } from 'react';

interface MapProps {
  emergencies: Array<{
    id: number;
    coordinates: { lat: number; lng: number };
    type: string;
    description: string;
  }>;
  onMarkerClick?: (emergency: { id: number; coordinates: { lat: number; lng: number }; type: string; description: string }) => void;
}

// Create a simple colored circle icon dynamically
const createDotIcon = (color: string) =>
  L.divIcon({
    className: '',
    html: `<div style="
      background-color: ${color};
      width: 16px;
      height: 16px;
      border-radius: 50%;
      border: 2px solid white;
      box-shadow: 0 0 2px rgba(0,0,0,0.6);
    "></div>`,
    iconSize: [16, 16],
    iconAnchor: [8, 8],
  });

// Get marker color by emergency type
const getMarkerColorByType = (type: string) => {
  const colorMap: Record<string, string> = {
    Medical: "#EF4444", // red-500
    Fire: "#F97316",    // orange-500
    Police: "#3B82F6",  // blue-500
    Accident: "#EAB308", // yellow-500
    "Natural Disaster": "#8B5CF6", // violet-500
  };
  return colorMap[type] || "#6B7280"; // gray-500 default
};

export default function Map({ emergencies, onMarkerClick }: MapProps) {
  const AUSTIN_CENTER = { lat: 30.2672, lng: -97.7431 };

  return (
    <MapContainer
      center={AUSTIN_CENTER}
      zoom={12}
      style={{ height: '100%', width: '100%', borderRadius: '0.5rem' }}
    >
      <TileLayer
        attribution='&copy; OpenStreetMap contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {emergencies.map((emergency) => (
        <Marker
          key={emergency.id}
          position={[emergency.coordinates.lat, emergency.coordinates.lng]}
          eventHandlers={{
            click: () => onMarkerClick && onMarkerClick(emergency),
          }}
          icon={createDotIcon(getMarkerColorByType(emergency.type))}
        >
          <Popup>
            <div>
              <h3 className="font-bold">{emergency.type}</h3>
              <p>{emergency.description}</p>
            </div>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}

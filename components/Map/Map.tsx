'use client';

import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

interface MapProps {
  emergencies: Array<{
    id: number;
    coordinates: { lat: number; lng: number };
    type: string;
    description: string;
  }>;
  onMarkerClick?: (emergency: { id: number; coordinates: { lat: number; lng: number }; type: string; description: string }) => void;
}

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
        >
          <Popup>
            <div>
              <h3 className="font-bold">{emergency.type}</h3>
              <p className="text-gray-600">{emergency.description}</p>
            </div>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}

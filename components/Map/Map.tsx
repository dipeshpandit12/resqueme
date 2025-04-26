'use client';

import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

interface MapProps {
  emergencies: Array<{
    id: string;
    coordinates: { lat: number; lng: number };
    type: string;
    description: string;
    requesterName: string;
  }>;
  onMarkerClick?: (emergency: {
    id: string;
    coordinates: { lat: number; lng: number };
    type: string;
    description: string;
    requesterName: string;
  }) => void;
}

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

const getMarkerColorByType = (type: string) => {
  const colorMap: Record<string, string> = {
    Medical: "#EF4444",
    Fire: "#F97316",
    Police: "#3B82F6",
    Accident: "#EAB308",
    "Natural Disaster": "#8B5CF6",
  };
  return colorMap[type] || "#6B7280";
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
            click: () => onMarkerClick?.(emergency),
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

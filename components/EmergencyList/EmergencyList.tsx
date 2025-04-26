import { Emergency } from '@/types';

interface EmergencyListProps {
  emergencies: Emergency[];
  onSelectEmergency: (emergency: Emergency) => void;
  selectedEmergency?: Emergency | null;
}

export default function EmergencyList({
  emergencies,
  onSelectEmergency,
  selectedEmergency,
}: EmergencyListProps) {
  return (
    <div className="bg-white rounded-lg shadow-md p-4 h-[calc(100vh-500px)] overflow-hidden">
      <h2 className="text-xl font-bold mb-4">Emergency Requests</h2>
      <div className="overflow-y-auto h-[calc(100%-3rem)]">
        {emergencies.map((emergency) => (
          <div
            key={emergency.id}
            onClick={() => onSelectEmergency(emergency)}
            className={`p-4 mb-2 rounded cursor-pointer transition-colors ${
              selectedEmergency?.id === emergency.id ? 'ring-2 ring-blue-500' : ''
            } ${
              emergency.type === 'medical' ? 'bg-red-100 hover:bg-red-200' :
              emergency.type === 'fire' ? 'bg-orange-100 hover:bg-orange-200' :
              'bg-blue-100 hover:bg-blue-200'
            }`}
          >
            <h3 className="font-bold">{emergency.type}</h3>
            <p className="text-sm text-gray-600">{emergency.location}</p>
            <p className="text-xs text-gray-500">
              {new Date(emergency.timestamp).toLocaleString()}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}